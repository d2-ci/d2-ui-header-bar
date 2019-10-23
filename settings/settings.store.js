'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.setGrid = setGrid;

var _Observable = require('rxjs/Observable');

var _d2UiCore = require('@dhis2/d2-ui-core');

var _menuSources = require('../utils/menu-sources');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var headerBarSettingsStore = _d2UiCore.Store.create();

function setGrid(grid) {
    headerBarSettingsStore.setState((0, _assign2.default)({}, headerBarSettingsStore.getState() || {}, {
        grid: grid
    }));
}

setGrid({ x: 3, y: 3 });

exports.default = _Observable.Observable.combineLatest(_menuSources.appsMenuSource$, headerBarSettingsStore, function (appItems, headerBarSettings) {
    return (0, _extends3.default)({}, headerBarSettings, {
        gridOptions: [{ x: 3, y: 3 }, { x: 5, y: 4 }, { x: 8, y: 3 }].concat(appItems ? [{ x: Math.ceil(appItems.length / 4), y: 4 }] : [])
    });
});