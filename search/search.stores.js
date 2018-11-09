import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _extends from 'babel-runtime/helpers/extends';
import { Observable } from 'rxjs/Observable';
import log from 'loglevel';
import uniqBy from 'lodash/fp/uniqBy';
import curry from 'lodash/fp/curry';
import get from 'lodash/fp/get';
import { Action } from '@dhis2/d2-ui-core';
import { Store } from '@dhis2/d2-ui-core';
import addDeepLinksForMaintenance from './sources/maintenance-app';
import addDeepLinksForSettings from './sources/settings-app';
import headerBarStore$ from '../headerBar.store';
import { appsMenuItems$ } from '../headerBar.store';

var identity = function identity(v) {
    return v;
};

var searchResultBoxStateStore$ = Store.create({
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

var getParentApp = get('parentApp');
var hasParentApp = function hasParentApp(item) {
    return !!getParentApp(item);
};
var uniqueByName = uniqBy(function (item) {
    return item.name;
});
var filterByValue = curry(function (searchTerms, item) {
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
var hasAvailableFullApp = curry(function (fullApps, item) {
    return fullApps.some(function (app) {
        return app.name === item.parentApp;
    });
});

export function setSearchValue(searchValue) {
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

        searchResultBoxStateStore$.setState(_extends({}, searchResultBoxStateStore$.getState(), {
            searchResults: allSearchResults,
            searchValue: searchValue
        }));
    });
}

export function setHovering(isHoveringOverResults) {
    searchResultBoxStateStore$.setState(_extends({}, searchResultBoxStateStore$.getState(), {
        isHoveringOverResults: isHoveringOverResults
    }));
}

export function setSearchFieldFocusTo(value) {
    searchResultBoxStateStore$.setState(_extends({}, searchResultBoxStateStore$.getState(), {
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

    searchResultBoxStateStore$.setState(_extends({}, searchResultBoxStateStore$.getState(), {
        selected: searchResultBoxStateStore$.getState().selected + selected
    }));
}

export function hideWhenNotHovering() {
    if (searchResultBoxStateStore$.getState() && !searchResultBoxStateStore$.getState().isHoveringOverResults) {
        setSearchFieldFocusTo(false);
    }
}

export var search = Action.create('Search Apps');
search.map(function (action) {
    return action.data || '';
}).subscribe(setSearchValue);

var searchSourceStore$ = headerBarStore$.map(function (headerBarState) {
    return [].concat(headerBarState.appItems, headerBarState.profileItems);
}).flatMap(addDeepLinksForMaintenance).flatMap(addDeepLinksForSettings);

export var searchStore$ = Observable.combineLatest(searchResultBoxStateStore$, appsMenuItems$, function (searchResult, appsMenuItems) {
    if (!searchResult.searchValue) {
        return _extends({}, searchResult, {
            searchResults: appsMenuItems
        });
    }

    return searchResult;
}).map(function (resultState) {
    return _extends({}, resultState, {
        searchResults: resultState.searchResults.map(function (item, index) {
            return _Object$assign({}, item, { selected: resultState.selected === index });
        }),
        open: Boolean(resultState.isSearchFieldFocused)
    });
});

export var handleKeyPress = Action.create();
var keyPress$ = handleKeyPress.map(function (action) {
    return action.data;
});

// Handle an enter key press to go the location of the first item
keyPress$.filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
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
}, log.error);

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
    var _ref4 = _slicedToArray(_ref3, 2),
        event = _ref4[0],
        itemsOnRow = _ref4[1];

    return event.keyCode === 38 || event.key === 'ArrowUp';
}).subscribe(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        _ = _ref6[0],
        itemsOnRow = _ref6[1];

    return setSelectedIndex(-itemsOnRow);
});

// When the left arrow is pressed move the selected item to the previous row
keyPress$.filter(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        event = _ref8[0],
        itemsOnRow = _ref8[1];

    return event.keyCode === 40 || event.key === 'ArrowDown';
}).subscribe(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
        _ = _ref10[0],
        itemsOnRow = _ref10[1];

    return setSelectedIndex(itemsOnRow);
});