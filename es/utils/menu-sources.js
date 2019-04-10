import _extends from 'babel-runtime/helpers/extends';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import log from 'loglevel';
import { getInstance, config } from 'd2';
import { Observable } from 'rxjs/Observable';

import getBaseUrlFromD2ApiUrl from '../utils/getBaseUrlFromD2ApiUrl';

// Profile menu
config.i18n.strings.add('settings');
config.i18n.strings.add('profile');
config.i18n.strings.add('account');
config.i18n.strings.add('help');
config.i18n.strings.add('log_out');
config.i18n.strings.add('about_dhis2');

var profileMenuData = [{
    name: 'settings',
    namespace: '/dhis-web-user-profile',
    defaultAction: '/dhis-web-user-profile/#/settings',
    icon: '/icons/usersettings.png',
    description: ''
}, {
    name: 'profile',
    namespace: '/dhis-web-user-profile',
    defaultAction: '/dhis-web-user-profile/#/profile',
    icon: '/icons/function-profile.png',
    description: ''
}, {
    name: 'account',
    namespace: '/dhis-web-user-profile',
    defaultAction: '/dhis-web-user-profile/#/account',
    icon: '/icons/function-account.png',
    description: ''
}, {
    name: 'help',
    namespace: '/dhis-web-commons-about',
    defaultAction: 'https://docs.dhis2.org/master/en/user/html/dhis2_user_manual_en.html',
    icon: '/icons/function-account.png',
    description: ''
}, {
    name: 'about_dhis2',
    namespace: '/dhis-web-commons-about',
    defaultAction: '/dhis-web-commons-about/about.action',
    icon: '/icons/function-about-dhis2.png',
    description: ''
}];

var addHelpLinkToProfileData = function addHelpLinkToProfileData() {
    return getInstance().then(function (d2) {
        return d2.system.settings.get('helpPageLink');
    })
    // When the request for the system setting fails we return false to not set the help link
    .catch(function () {
        return false;
    }).then(function (helpPageLink) {
        return profileMenuData.map(function (profileMenuItem) {
            // Override the defaultAction with the helpPageLink when one was found.
            if (helpPageLink && profileMenuItem.name === 'help') {
                return _Object$assign({}, profileMenuItem, { defaultAction: helpPageLink });
            }

            return profileMenuItem;
        });
    });
};

// TODO: Remove this when we have proper support for `displayName` from the getModules.action.
var getTranslationsForMenuItems = function getTranslationsForMenuItems(_ref) {
    var modules = _ref.modules;
    return getInstance().then(function (d2) {
        var api = d2.Api.getApi();

        var moduleNames = modules.map(function (module) {
            return module.name;
        });

        return api.post('i18n', moduleNames);
    }).then(function (translations) {
        var translatedModules = modules.map(function (module) {
            return _Object$assign(_extends({}, module), { displayName: translations[module.name] || module.name });
        });

        return { modules: translatedModules };
    }).catch(function () {
        log.warn('Could not load translations for modules, defaulting back to English');

        return { modules: modules };
    });
};

/**
 * Module management is available though the More Apps button. We therefore do not display it in the menu as a separate item.
 *
 * @param modules
 * @returns {{modules: [module]}}
 */
var removeMenuManagementModule = function removeMenuManagementModule(_ref2) {
    var modules = _ref2.modules;
    return {
        modules: modules.filter(function (module) {
            return module.name !== 'dhis-web-menu-management';
        })
    };
};

var loadMenuItems = function loadMenuItems() {
    return getInstance().then(function (d2) {
        var api = d2.Api.getApi();
        var baseUrl = getBaseUrlFromD2ApiUrl(d2);

        // This path is only correct when the manifest has '..' as the baseUrl and a versioned api endpoint is used
        // TODO: This should have a proper API endpoint
        return api.get(baseUrl + '/dhis-web-commons/menu/getModules.action?_=' + new Date().getTime());
    }).then(getTranslationsForMenuItems).then(removeMenuManagementModule).then(function (_ref3) {
        var modules = _ref3.modules;
        return modules;
    });
};

var loadNotifications = function loadNotifications() {
    return getInstance().then(function (d2) {
        var api = d2.Api.getApi();
        return api.get('me/dashboard');
    });
};

export var profileSource$ = Observable.fromPromise(addHelpLinkToProfileData(profileMenuData));

export var appsMenuSource$ = Observable.fromPromise(loadMenuItems()).catch(Observable.of([]));

export var notifications$ = Observable.fromPromise(loadNotifications()).catch(Observable.of({
    unreadInterpretations: 0,
    unreadMessageConversations: 0
}));