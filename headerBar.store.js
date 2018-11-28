import _Object$assign from 'babel-runtime/core-js/object/assign';
import { getInstance } from 'd2';
import compose from 'lodash/fp/compose';
import map from 'lodash/fp/map';
import curry from 'lodash/fp/curry';
import pick from 'lodash/fp/pick';
import pluck from 'lodash/fp/get';
import { Observable } from 'rxjs/Observable';
import headerBarSettingsStore$ from './settings/settings.store';
import { profileSource$, appsMenuSource$, notifications$ } from './utils/menu-sources';
import getBaseUrlFromD2ApiUrl from './utils/getBaseUrlFromD2ApiUrl';

var translate = curry(function (d2, key) {
    return d2.i18n.getTranslation(key);
});

var d2Offline = { currentUser: { userSettings: {} } };

var d2$ = Observable.fromPromise(getInstance()).catch(Observable.of(d2Offline));
var currentUser$ = d2$.map(pluck('currentUser'));

export var translate$ = Observable.combineLatest(d2$, Observable.of(translate), function (d2, translateFn) {
    return translateFn(d2);
});

export function translateMenuItemNames(trans, items) {
    return items.map(function (item) {
        return _Object$assign({}, item, { name: trans(item.name) });
    });
}

var removePrefix = function removePrefix(word) {
    return word.replace(/^\.\./, '');
};
var isAbsoluteUrl = function isAbsoluteUrl(url) {
    return (/^(?:https?:)?\/\//.test(url)
    );
};
export var getBaseUrlFromD2 = getBaseUrlFromD2ApiUrl;

var addBaseUrlWhenNotAnAbsoluteUrl = curry(function (baseUrl, url) {
    return isAbsoluteUrl(url) ? url : baseUrl + removePrefix(url);
});
var getIconUrl = function getIconUrl(item) {
    return item.icon || '/icons/program.png';
};
var adjustIconUrl = curry(function (baseUrl, item) {
    return _Object$assign({}, item, { icon: addBaseUrlWhenNotAnAbsoluteUrl(baseUrl, getIconUrl(item)) });
});
var adjustDefaultActionUrl = curry(function (baseUrl, item) {
    return _Object$assign({}, item, { action: addBaseUrlWhenNotAnAbsoluteUrl(baseUrl, item.defaultAction) });
});
var adjustMenuItemsUrls = function adjustMenuItemsUrls(baseUrl) {
    return compose(adjustIconUrl(baseUrl), adjustDefaultActionUrl(baseUrl));
};
var getLabelFromName = function getLabelFromName(item) {
    return _Object$assign({}, item, { label: item.displayName || item.name });
};
var extractMenuProps = pick(['action', 'icon', 'description', 'label', 'name', 'parentApp']);
var prepareMenuItem = function prepareMenuItem(baseUrl) {
    return compose(extractMenuProps, adjustMenuItemsUrls(baseUrl), getLabelFromName);
};
export var prepareMenuItems = function prepareMenuItems(baseUrl, items) {
    return map(prepareMenuItem(baseUrl), items);
};

var profileMenuItems$ = Observable.combineLatest(translate$, profileSource$, translateMenuItemNames).combineLatest(d2$, function (items, d2) {
    return { items: items, d2: d2 };
}).map(function (_ref) {
    var items = _ref.items,
        d2 = _ref.d2;
    return prepareMenuItems(getBaseUrlFromD2(d2), items);
}).catch(Observable.of([]));

export var appsMenuItems$ = appsMenuSource$.combineLatest(d2$, function (items, d2) {
    return { items: items, d2: d2 };
}).map(function (_ref2) {
    var items = _ref2.items,
        d2 = _ref2.d2;
    return prepareMenuItems(getBaseUrlFromD2(d2), items);
}).catch(Observable.of([]));

var headerBarStore$ = Observable.combineLatest(appsMenuItems$, profileMenuItems$, notifications$, currentUser$, headerBarSettingsStore$, function (appItems, profileItems, notifications, currentUser, settings) {
    return { appItems: appItems, profileItems: profileItems, notifications: notifications, currentUser: currentUser, settings: settings };
});

export default headerBarStore$;