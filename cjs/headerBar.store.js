'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.appsMenuItems$ = exports.prepareMenuItems = exports.getBaseUrlFromD2 = exports.translate$ = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.translateMenuItemNames = translateMenuItemNames;

var _d = require('d2');

var _compose = require('lodash/fp/compose');

var _compose2 = _interopRequireDefault(_compose);

var _map = require('lodash/fp/map');

var _map2 = _interopRequireDefault(_map);

var _curry = require('lodash/fp/curry');

var _curry2 = _interopRequireDefault(_curry);

var _pick = require('lodash/fp/pick');

var _pick2 = _interopRequireDefault(_pick);

var _get = require('lodash/fp/get');

var _get2 = _interopRequireDefault(_get);

var _Observable = require('rxjs/Observable');

var _settings = require('./settings/settings.store');

var _settings2 = _interopRequireDefault(_settings);

var _menuSources = require('./utils/menu-sources');

var _getBaseUrlFromD2ApiUrl = require('./utils/getBaseUrlFromD2ApiUrl');

var _getBaseUrlFromD2ApiUrl2 = _interopRequireDefault(_getBaseUrlFromD2ApiUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var translate = (0, _curry2.default)(function (d2, key) {
    return d2.i18n.getTranslation(key);
});

var d2Offline = { currentUser: { userSettings: {} } };

var d2$ = _Observable.Observable.fromPromise((0, _d.getInstance)()).catch(_Observable.Observable.of(d2Offline));
var currentUser$ = d2$.map((0, _get2.default)('currentUser'));

var translate$ = exports.translate$ = _Observable.Observable.combineLatest(d2$, _Observable.Observable.of(translate), function (d2, translateFn) {
    return translateFn(d2);
});

function translateMenuItemNames(trans, items) {
    return items.map(function (item) {
        return (0, _assign2.default)({}, item, { name: trans(item.name) });
    });
}

var removePrefix = function removePrefix(word) {
    return word.replace(/^\.\./, '');
};
var isAbsoluteUrl = function isAbsoluteUrl(url) {
    return (/^(?:https?:)?\/\//.test(url)
    );
};
var getBaseUrlFromD2 = exports.getBaseUrlFromD2 = _getBaseUrlFromD2ApiUrl2.default;

var addBaseUrlWhenNotAnAbsoluteUrl = (0, _curry2.default)(function (baseUrl, url) {
    return isAbsoluteUrl(url) ? url : baseUrl + removePrefix(url);
});
var getIconUrl = function getIconUrl(item) {
    return item.icon || '/icons/program.png';
};
var adjustIconUrl = (0, _curry2.default)(function (baseUrl, item) {
    return (0, _assign2.default)({}, item, { icon: addBaseUrlWhenNotAnAbsoluteUrl(baseUrl, getIconUrl(item)) });
});
var adjustDefaultActionUrl = (0, _curry2.default)(function (baseUrl, item) {
    return (0, _assign2.default)({}, item, { action: addBaseUrlWhenNotAnAbsoluteUrl(baseUrl, item.defaultAction) });
});
var adjustMenuItemsUrls = function adjustMenuItemsUrls(baseUrl) {
    return (0, _compose2.default)(adjustIconUrl(baseUrl), adjustDefaultActionUrl(baseUrl));
};
var getLabelFromName = function getLabelFromName(item) {
    return (0, _assign2.default)({}, item, { label: item.displayName || item.name });
};
var extractMenuProps = (0, _pick2.default)(['action', 'icon', 'description', 'label', 'name', 'parentApp']);
var prepareMenuItem = function prepareMenuItem(baseUrl) {
    return (0, _compose2.default)(extractMenuProps, adjustMenuItemsUrls(baseUrl), getLabelFromName);
};
var prepareMenuItems = exports.prepareMenuItems = function prepareMenuItems(baseUrl, items) {
    return (0, _map2.default)(prepareMenuItem(baseUrl), items);
};

var profileMenuItems$ = _Observable.Observable.combineLatest(translate$, _menuSources.profileSource$, translateMenuItemNames).combineLatest(d2$, function (items, d2) {
    return { items: items, d2: d2 };
}).map(function (_ref) {
    var items = _ref.items,
        d2 = _ref.d2;
    return prepareMenuItems(getBaseUrlFromD2(d2), items);
}).catch(_Observable.Observable.of([]));

var appsMenuItems$ = exports.appsMenuItems$ = _menuSources.appsMenuSource$.combineLatest(d2$, function (items, d2) {
    return { items: items, d2: d2 };
}).map(function (_ref2) {
    var items = _ref2.items,
        d2 = _ref2.d2;
    return prepareMenuItems(getBaseUrlFromD2(d2), items);
}).catch(_Observable.Observable.of([]));

var headerBarStore$ = _Observable.Observable.combineLatest(appsMenuItems$, profileMenuItems$, _menuSources.notifications$, currentUser$, _settings2.default, function (appItems, profileItems, notifications, currentUser, settings) {
    return { appItems: appItems, profileItems: profileItems, notifications: notifications, currentUser: currentUser, settings: settings };
});

exports.default = headerBarStore$;