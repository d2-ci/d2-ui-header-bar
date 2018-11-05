import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import map from 'lodash/fp/map';
import curry from 'lodash/fp/curry';
import compose from 'lodash/fp/compose';
import { Observable } from 'rxjs/Observable';
import flatten from 'lodash/fp/flatten';
import filter from 'lodash/fp/filter';
import mapValues from 'lodash/fp/mapValues';
import { config, getInstance } from 'd2';
import camelCaseToUnderscores from 'd2-utilizr/lib/camelCaseToUnderscores';
import { prepareMenuItems, translate$, translateMenuItemNames, getBaseUrlFromD2 } from '../../headerBar.store';

// This file is copied from the maintenance app
// https://github.com/dhis2/maintenance-app/blob/master/src/config/maintenance-models.js
import { getSideBarConfig } from './maintenance-app/maintenance-models';

var maintenanceSections = getSideBarConfig();

function addToTranslationConfig(modelName) {
    config.i18n.strings.add(modelName);
}

map(addToTranslationConfig, map(camelCaseToUnderscores, flatten(map('items', maintenanceSections))));

var getMenuItemsFromModelName = curry(function (section, modelName) {
    return {
        name: camelCaseToUnderscores(modelName),
        defaultAction: '/dhis-web-maintenance/#/list/' + section + '/' + modelName,
        icon: '/icons/dhis-web-maintenance.png',
        description: '',
        parentApp: 'dhis-web-maintenance'
    };
});

var toKeyValueArray = function toKeyValueArray(obj) {
    return _Object$keys(obj).map(function (key) {
        return [key, obj[key]];
    });
};

var filterOutEmptyValueLists = function filterOutEmptyValueLists(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return value.length;
};
var getMapOfModelsPerSection = mapValues('items', maintenanceSections);
var sectionsWithModels = filter(filterOutEmptyValueLists, toKeyValueArray(getMapOfModelsPerSection));
var getMenuItemConfigsForSection = function getMenuItemConfigsForSection(_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        section = _ref4[0],
        models = _ref4[1];

    return map(getMenuItemsFromModelName(section), models);
};
var createAppsListForMenu = compose(flatten, map(getMenuItemConfigsForSection));

// Replace this with a proper source for there values
export default function addDeepLinksForMaintenance(apps) {
    var maintenanceDeepLinks$ = Observable.of(createAppsListForMenu(sectionsWithModels));

    return Observable.combineLatest(translate$, maintenanceDeepLinks$, translateMenuItemNames).flatMap(function (items) {
        return Observable.fromPromise(getInstance().then(function (d2) {
            return prepareMenuItems(getBaseUrlFromD2(d2), items);
        }));
    }).map(function (maintenanceItems) {
        return [].concat(apps, maintenanceItems);
    });
}