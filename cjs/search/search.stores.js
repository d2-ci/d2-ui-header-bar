'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleKeyPress = exports.searchStore$ = exports.search = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.setSearchValue = setSearchValue;
exports.setHovering = setHovering;
exports.setSearchFieldFocusTo = setSearchFieldFocusTo;
exports.hideWhenNotHovering = hideWhenNotHovering;

var _Observable = require('rxjs/Observable');

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _uniqBy = require('lodash/fp/uniqBy');

var _uniqBy2 = _interopRequireDefault(_uniqBy);

var _curry = require('lodash/fp/curry');

var _curry2 = _interopRequireDefault(_curry);

var _get = require('lodash/fp/get');

var _get2 = _interopRequireDefault(_get);

var _d2UiCore = require('@dhis2/d2-ui-core');

var _maintenanceApp = require('./sources/maintenance-app');

var _maintenanceApp2 = _interopRequireDefault(_maintenanceApp);

var _settingsApp = require('./sources/settings-app');

var _settingsApp2 = _interopRequireDefault(_settingsApp);

var _headerBar = require('../headerBar.store');

var _headerBar2 = _interopRequireDefault(_headerBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var identity = function identity(v) {
    return v;
};

var searchResultBoxStateStore$ = _d2UiCore.Store.create({
    getInitialState: function getInitialState() {
        return {
            isSearchFieldFocused: false,
            open: false,
            searchValue: '',
            selected: 0,
            searchResults: []
        };
    }
});

var getParentApp = (0, _get2.default)('parentApp');
var hasParentApp = function hasParentApp(item) {
    return !!getParentApp(item);
};
var uniqueByName = (0, _uniqBy2.default)(function (item) {
    return item.name;
});
var filterByValue = (0, _curry2.default)(function (searchTerms, item) {
    return searchTerms.every(function (term) {
        return item.label.toLowerCase().includes(term);
    });
});
var isFullApp = function isFullApp(item) {
    return !hasParentApp(item);
};
var isNotAFullApp = function isNotAFullApp(item) {
    return !isFullApp(item);
};
// Only allow deep links for apps for which the user has access to the parentApp
var hasAvailableFullApp = (0, _curry2.default)(function (fullApps, item) {
    return fullApps.some(function (app) {
        return app.name === item.parentApp;
    });
});

function setSearchValue(searchValue) {
    var matchesSearchValue = filterByValue(searchValue.trim().toLowerCase().split(/\s+/));

    searchSourceStore$.take(1).subscribe(function (searchResults) {
        var fullApps = searchResults.filter(isFullApp);
        var fullAppsThatMatchSearchString = fullApps.filter(matchesSearchValue);
        var deepLinksThatMatchSearchString = searchResults.filter(matchesSearchValue).filter(isNotAFullApp).filter(hasAvailableFullApp(fullApps));

        // Determine which parent apps we need to show at the end of the list.
        // When we have deep links in the search results we should also shown their parent app.
        var parentAppsForMatchedItems = fullApps.filter(function (item) {
            return deepLinksThatMatchSearchString.map(getParentApp).some(function (parentApp) {
                return parentApp === item.name;
            });
        });

        // Combine all results
        // - Full applications that match the search string
        // - Deep links that match the search string
        // - Full apps for deep links that match the search string
        // As it might be possible that Full apps are in the results twice we only show the first one
        // by running the result list through unique by name.
        var allSearchResults = uniqueByName([].concat(fullAppsThatMatchSearchString, deepLinksThatMatchSearchString, parentAppsForMatchedItems));

        searchResultBoxStateStore$.setState((0, _extends3.default)({}, searchResultBoxStateStore$.getState(), {
            searchResults: allSearchResults,
            searchValue: searchValue
        }));
    });
}

function setHovering(isHoveringOverResults) {
    searchResultBoxStateStore$.setState((0, _extends3.default)({}, searchResultBoxStateStore$.getState(), {
        isHoveringOverResults: isHoveringOverResults
    }));
}

function setSearchFieldFocusTo(value) {
    searchResultBoxStateStore$.setState((0, _extends3.default)({}, searchResultBoxStateStore$.getState(), {
        isSearchFieldFocused: value
    }));
}

function setSelectedIndex(selected) {
    var numberOfItems = searchResultBoxStateStore$.getState().searchResults.length;

    if (searchResultBoxStateStore$.getState().selected + selected >= numberOfItems) {
        return;
    }

    if (searchResultBoxStateStore$.getState().selected + selected < 0) {
        return;
    }

    searchResultBoxStateStore$.setState((0, _extends3.default)({}, searchResultBoxStateStore$.getState(), {
        selected: searchResultBoxStateStore$.getState().selected + selected
    }));
}

function hideWhenNotHovering() {
    if (searchResultBoxStateStore$.getState() && !searchResultBoxStateStore$.getState().isHoveringOverResults) {
        setSearchFieldFocusTo(false);
    }
}

var search = exports.search = _d2UiCore.Action.create('Search Apps');
search.map(function (action) {
    return action.data || '';
}).subscribe(setSearchValue);

var searchSourceStore$ = _headerBar2.default.map(function (headerBarState) {
    return [].concat(headerBarState.appItems, headerBarState.profileItems);
}).flatMap(_maintenanceApp2.default).flatMap(_settingsApp2.default);

var searchStore$ = exports.searchStore$ = _Observable.Observable.combineLatest(searchResultBoxStateStore$, _headerBar.appsMenuItems$, function (searchResult, appsMenuItems) {
    if (!searchResult.searchValue) {
        return (0, _extends3.default)({}, searchResult, {
            searchResults: appsMenuItems
        });
    }

    return searchResult;
}).map(function (resultState) {
    return (0, _extends3.default)({}, resultState, {
        searchResults: resultState.searchResults.map(function (item, index) {
            return (0, _assign2.default)({}, item, { selected: resultState.selected === index });
        }),
        open: Boolean(resultState.isSearchFieldFocused)
    });
});

var handleKeyPress = exports.handleKeyPress = _d2UiCore.Action.create();
var keyPress$ = handleKeyPress.map(function (action) {
    return action.data;
});

// Handle an enter key press to go the location of the first item
keyPress$.filter(function (_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 1),
        event = _ref2[0];

    return event.keyCode === 13 || event.key === 'Enter';
}).flatMap(function () {
    return searchResultBoxStateStore$.take(1);
})
// Find the selected menu item in the search results list by the `selected` index
.map(function (state) {
    return state.searchResults.find(function (item, index) {
        return index === state.selected;
    });
}).filter(identity).subscribe(function (itemToGoTo) {
    return window.location = itemToGoTo.action;
}, _loglevel2.default.error);

// When the right arrow is pressed move the selected item to the next one
keyPress$.map(function (actionData) {
    return actionData[0];
}).filter(function (event) {
    return event.keyCode === 39 || event.key === 'ArrowRight';
}).subscribe(function () {
    return setSelectedIndex(1);
});

// When the left arrow is pressed move the selected item to the next one
keyPress$.map(function (actionData) {
    return actionData[0];
}).filter(function (event) {
    return event.keyCode === 37 || event.key === 'ArrowLeft';
}).subscribe(function () {
    return setSelectedIndex(-1);
});

// When the left arrow is pressed move the selected item to the next row
keyPress$.filter(function (_ref3) {
    var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
        event = _ref4[0],
        itemsOnRow = _ref4[1];

    return event.keyCode === 38 || event.key === 'ArrowUp';
}).subscribe(function (_ref5) {
    var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
        _ = _ref6[0],
        itemsOnRow = _ref6[1];

    return setSelectedIndex(-itemsOnRow);
});

// When the left arrow is pressed move the selected item to the previous row
keyPress$.filter(function (_ref7) {
    var _ref8 = (0, _slicedToArray3.default)(_ref7, 2),
        event = _ref8[0],
        itemsOnRow = _ref8[1];

    return event.keyCode === 40 || event.key === 'ArrowDown';
}).subscribe(function (_ref9) {
    var _ref10 = (0, _slicedToArray3.default)(_ref9, 2),
        _ = _ref10[0],
        itemsOnRow = _ref10[1];

    return setSelectedIndex(itemsOnRow);
});