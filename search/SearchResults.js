import _Object$assign from 'babel-runtime/core-js/object/assign';
import _extends from 'babel-runtime/helpers/extends';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { config } from 'd2';
import SearchResultsList from './SearchResultsList';
import HeaderMenuItem from '../menus/HeaderMenuItem';
import { withStateFrom } from '@dhis2/d2-ui-core';
import { addD2Context } from '@dhis2/d2-ui-core';
import { searchStore$, setHovering } from './search.stores';
import styles, { getSearchResultsHeight } from '../header-bar-styles';
import NoResults from './NoResults';
import getBaseUrlFromD2ApiUrl from '../utils/getBaseUrlFromD2ApiUrl';

// App menu strings to be translated
config.i18n.strings.add('manage_my_apps');

var getBaseUrl = getBaseUrlFromD2ApiUrl;

function SearchResults(props, _ref) {
    var d2 = _ref.d2;

    var menuItems = (props.searchResults || []).map(function (item) {
        return React.createElement(HeaderMenuItem, _extends({ key: item.name }, item));
    });

    var moreAppsButton = React.createElement(
        Button,
        {
            style: styles.moreAppsButton,
            href: getBaseUrl(d2) + '/dhis-web-menu-management'
        },
        d2.i18n.getTranslation('manage_my_apps')
    );

    var searchResultBoxContent = menuItems.length ? React.createElement(
        SearchResultsList,
        null,
        menuItems
    ) : React.createElement(NoResults, null);

    var searchResultsWrap = _Object$assign({}, styles.searchResults, {
        display: 'flex',
        flexDirection: 'column',
        height: props.open ? getSearchResultsHeight() : 0,
        overflow: props.open ? undefined : 'hidden'
    });

    return React.createElement(
        Paper,
        { style: searchResultsWrap, onMouseEnter: function onMouseEnter() {
                return setHovering(true);
            }, onMouseLeave: function onMouseLeave() {
                return setHovering(false);
            } },
        React.createElement(
            'div',
            { style: { flex: 1, overflow: 'auto', padding: '1rem' } },
            searchResultBoxContent
        ),
        React.createElement(
            'div',
            { style: styles.moreAppsButtonWrap },
            moreAppsButton
        )
    );
}

// Connect the store to the SearchResults component
// TODO: This means we can only have one search results at all times (Perhaps make this more dynamic?)
var SearchResultsWithState = withStateFrom(searchStore$, addD2Context(SearchResults));

export default SearchResultsWithState;