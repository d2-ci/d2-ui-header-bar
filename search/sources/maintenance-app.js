'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = addDeepLinksForMaintenance;

var _map = require('lodash/fp/map');

var _map2 = _interopRequireDefault(_map);

var _curry = require('lodash/fp/curry');

var _curry2 = _interopRequireDefault(_curry);

var _compose = require('lodash/fp/compose');

var _compose2 = _interopRequireDefault(_compose);

var _Observable = require('rxjs/Observable');

var _flatten = require('lodash/fp/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _filter = require('lodash/fp/filter');

var _filter2 = _interopRequireDefault(_filter);

var _mapValues = require('lodash/fp/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _d = require('d2');

var _camelCaseToUnderscores = require('d2-utilizr/lib/camelCaseToUnderscores');

var _camelCaseToUnderscores2 = _interopRequireDefault(_camelCaseToUnderscores);

var _headerBar = require('../../headerBar.store');

var _maintenanceModels = require('./maintenance-app/maintenance-models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var maintenanceSections = (0, _maintenanceModels.getSideBarConfig)();

// This file is copied from the maintenance app
// https://github.com/dhis2/maintenance-app/blob/master/src/config/maintenance-models.js


function addToTranslationConfig(modelName) {
    _d.config.i18n.strings.add(modelName);
}

(0, _map2.default)(addToTranslationConfig, (0, _map2.default)(_camelCaseToUnderscores2.default, (0, _flatten2.default)((0, _map2.default)('items', maintenanceSections))));

var getMenuItemsFromModelName = (0, _curry2.default)(function (section, modelName) {
    return {
        name: (0, _camelCaseToUnderscores2.default)(modelName),
        defaultAction: '/dhis-web-maintenance/#/list/' + section + '/' + modelName,
        icon: '/icons/dhis-web-maintenance.png',
        description: '',
        parentApp: 'dhis-web-maintenance'
    };
});

var toKeyValueArray = function toKeyValueArray(obj) {
    return (0, _keys2.default)(obj).map(function (key) {
        return [key, obj[key]];
    });
};

var filterOutEmptyValueLists = function filterOutEmptyValueLists(_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return value.length;
};
var getMapOfModelsPerSection = (0, _mapValues2.default)('items', maintenanceSections);
var sectionsWithModels = (0, _filter2.default)(filterOutEmptyValueLists, toKeyValueArray(getMapOfModelsPerSection));
var getMenuItemConfigsForSection = function getMenuItemConfigsForSection(_ref3) {
    var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
        section = _ref4[0],
        models = _ref4[1];

    return (0, _map2.default)(getMenuItemsFromModelName(section), models);
};
var createAppsListForMenu = (0, _compose2.default)(_flatten2.default, (0, _map2.default)(getMenuItemConfigsForSection));

// Replace this with a proper source for there values
function addDeepLinksForMaintenance(apps) {
    var maintenanceDeepLinks$ = _Observable.Observable.of(createAppsListForMenu(sectionsWithModels));

    return _Observable.Observable.combineLatest(_headerBar.translate$, maintenanceDeepLinks$, _headerBar.translateMenuItemNames).flatMap(function (items) {
        return _Observable.Observable.fromPromise((0, _d.getInstance)().then(function (d2) {
            return (0, _headerBar.prepareMenuItems)((0, _headerBar.getBaseUrlFromD2)(d2), items);
        }));
    }).map(function (maintenanceItems) {
        return [].concat(apps, maintenanceItems);
    });
}