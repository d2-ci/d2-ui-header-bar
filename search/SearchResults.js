'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _d = require('d2');

var _SearchResultsList = require('./SearchResultsList');

var _SearchResultsList2 = _interopRequireDefault(_SearchResultsList);

var _HeaderMenuItem = require('../menus/HeaderMenuItem');

var _HeaderMenuItem2 = _interopRequireDefault(_HeaderMenuItem);

var _d2UiCore = require('@dhis2/d2-ui-core');

var _search = require('./search.stores');

var _headerBarStyles = require('../header-bar-styles');

var _headerBarStyles2 = _interopRequireDefault(_headerBarStyles);

var _NoResults = require('./NoResults');

var _NoResults2 = _interopRequireDefault(_NoResults);

var _getBaseUrlFromD2ApiUrl = require('../utils/getBaseUrlFromD2ApiUrl');

var _getBaseUrlFromD2ApiUrl2 = _interopRequireDefault(_getBaseUrlFromD2ApiUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// App menu strings to be translated
_d.config.i18n.strings.add('manage_my_apps');

var getBaseUrl = _getBaseUrlFromD2ApiUrl2.default;

function SearchResults(props, _ref) {
    var d2 = _ref.d2;

    var menuItems = (props.searchResults || []).map(function (item) {
        return _react2.default.createElement(_HeaderMenuItem2.default, (0, _extends3.default)({ key: item.name }, item));
    });

    var moreAppsButton = _react2.default.createElement(
        _Button2.default,
        {
            style: _headerBarStyles2.default.moreAppsButton,
            href: getBaseUrl(d2) + '/dhis-web-menu-management'
        },
        d2.i18n.getTranslation('manage_my_apps')
    );

    var searchResultBoxContent = menuItems.length ? _react2.default.createElement(
        _SearchResultsList2.default,
        null,
        menuItems
    ) : _react2.default.createElement(_NoResults2.default, null);

    var searchResultsWrap = (0, _assign2.default)({}, _headerBarStyles2.default.searchResults, {
        display: 'flex',
        flexDirection: 'column',
        height: props.open ? (0, _headerBarStyles.getSearchResultsHeight)() : 0,
        overflow: props.open ? undefined : 'hidden'
    });

    return _react2.default.createElement(
        _Paper2.default,
        { style: searchResultsWrap, onMouseEnter: function onMouseEnter() {
                return (0, _search.setHovering)(true);
            }, onMouseLeave: function onMouseLeave() {
                return (0, _search.setHovering)(false);
            } },
        _react2.default.createElement(
            'div',
            { style: { flex: 1, overflow: 'auto', padding: '1rem' } },
            searchResultBoxContent
        ),
        _react2.default.createElement(
            'div',
            { style: _headerBarStyles2.default.moreAppsButtonWrap },
            moreAppsButton
        )
    );
}

// Connect the store to the SearchResults component
// TODO: This means we can only have one search results at all times (Perhaps make this more dynamic?)
var SearchResultsWithState = (0, _d2UiCore.withStateFrom)(_search.searchStore$, (0, _d2UiCore.addD2Context)(SearchResults));

exports.default = SearchResultsWithState;