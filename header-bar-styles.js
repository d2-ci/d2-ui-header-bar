'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toggleStyle = exports.MENU_ITEM_WIDTH = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.applyUserStyle = applyUserStyle;
exports.getWindowWidth = getWindowWidth;
exports.getSearchResultsHeight = getSearchResultsHeight;

var _Observable = require('rxjs/Observable');

require('rxjs/add/observable/fromEvent');

require('rxjs/add/operator/debounceTime');

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _curry = require('lodash/fp/curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MENU_ITEM_WIDTH = exports.MENU_ITEM_WIDTH = 125;

function applyUserStyle(user, style) {
    switch (user.userSettings.keyStyle) {
        case 'vietnam/vietnam.css':
            return (0, _assign2.default)({}, style, { background: '#B40303' });
        case 'india/india.css':
            return (0, _assign2.default)({}, style, { background: '#EA5911' });
        case 'green/green.css':
            return (0, _assign2.default)({}, style, { background: '#467E4A' });
        default:
            break;
    }

    return style;
}

var styles = {};

function getWindowWidth() {
    if (!global.document) {
        return 0;
    }

    return Math.max(window.document.documentElement.clientWidth, window.innerWidth || 0);
}

var toggleStyle = exports.toggleStyle = (0, _curry2.default)(function (predicateFn, whenTrue, whenFalse) {
    return predicateFn() ? whenTrue : whenFalse;
});

/**
 * Calculates the height of the search results box. When the user has a large screen height we fit a max of four rows
 * of search results onto the screen. If four rows is too big for the current screen size we limit the search results box
 * to 80% of the current viewport height.
 *
 * @returns {number} The height of the search result box in pixels.
 */
function getSearchResultsHeight() {
    var maxResultRowsHeight = 465;

    if (!global.document) {
        return maxResultRowsHeight;
    }

    var eightyPercentHeight = Math.max(global.document.documentElement.clientHeight, window.innerHeight || 0) * 0.8;

    if (eightyPercentHeight < maxResultRowsHeight) {
        return eightyPercentHeight;
    }
    return maxResultRowsHeight;
}

// Only attach the window resize listener when we have a document
if (global.document) {
    // Track the resize event on the window to recalculate the height of the search results box.
    _Observable.Observable.fromEvent(global, 'resize').debounceTime(300).subscribe(function () {
        return (0, _assign2.default)(styles.searchResults, { maxHeight: getSearchResultsHeight() });
    }, _loglevel2.default.error);
}

styles = {
    avatar: {
        fontSize: '0.8rem',
        fontWeight: '700',
        lineHeight: '32px',
        marginLeft: '-2px',
        backgroundColor: '#6a94c2',
        width: 32,
        height: 32
    },

    avatarBig: {
        fontSize: '1.5rem',
        fontWeight: '500',
        lineHeight: '60px',
        backgroundColor: '#6a94c2',
        width: 60,
        height: 60
    },

    headerBar: {
        boxSizing: 'border-box',
        background: '#276696',
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        minHeight: 48,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1400
    },

    headerTitle: {
        flex: 1,
        color: '#FFF'
    },

    headerMenu: {
        flex: '0 0 auto',
        padding: '0 1rem',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },

    menusWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: '2rem'
    },

    dropDownWrap: {
        position: 'absolute',
        display: 'none',
        padding: '1rem',
        right: 40,
        overflow: 'hidden',
        width: 400,
        flexDirection: 'column',
        top: 48
    },

    headerActions: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        minWidth: 420,
        maxWidth: 550
    },

    notificationBadge: {
        padding: 0
    },

    notificationBadgeIcon: {
        zIndex: 10,
        width: 20,
        height: 20,
        top: 3,
        backgroundColor: '#4ca899',
        fontSize: '9px',
        right: 0
    },

    notificationIcon: {
        fill: 'white'
    },

    notificationButton: {
        padding: 0,
        width: 44
    },

    searchField: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },

    searchFieldInnerWrap: {
        flex: 1,
        transition: 'width .5s cubic-bezier(0.39, -0.04, 0.2, 1)',
        position: 'relative',
        top: '8px'
    },

    searchIcon: {
        fill: 'white',
        padding: '0px'
    },

    searchIconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px 8px 0px 24px'
    },

    searchResultList: {
        display: 'flex',
        flexWrap: 'wrap'
    },

    searchResults: {
        position: 'absolute',
        top: 48,
        left: 0,
        right: 0,
        maxWidth: 673,
        maxHeight: getSearchResultsHeight(),
        overflow: 'auto',
        transition: 'padding-top .3s cubic-bezier(0.39, -0.04, 0.2, 1), padding-bottom .3s cubic-bezier(0.39, -0.04, 0.2, 1), height .3s cubic-bezier(0.39, -0.04, 0.2, 1)',
        boxSizing: 'border-box'
    },

    searchFieldInput: {
        color: 'white'
    },

    searchFieldHintText: {
        color: 'rgba(255, 255, 255, 0.5)'
    },

    menuItemLink: {
        padding: '1rem',
        display: 'flex',
        width: MENU_ITEM_WIDTH,
        height: MENU_ITEM_WIDTH,
        boxSizing: 'border-box',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        color: 'black',
        fontSize: '1rem'
    },

    menuItemIcon: {
        height: 48,
        width: 48
    },

    menuItemLabel: {
        flex: '1 1 auto',
        maxWidth: '100%',
        textAlign: 'center',
        wordWrap: 'break-word'
    },

    moreAppsButton: {
        marginTop: '1rem',
        width: '100%',
        display: 'block',
        textAlign: 'center'
    },

    moreAppsButtonWrap: {
        width: '100%',
        padding: '1rem',
        boxSizing: 'border-box'
    },

    clearIcon: {
        fill: 'white',
        color: 'white',
        position: 'absolute',
        top: '5px',
        right: '5px'
    },

    notifications: {
        display: 'flex',
        flexDirection: 'row'
    },

    profileRightSide: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
        justifyContent: 'space-between',
        borderLeft: '1px solid #CCC',
        backgroundColor: '#F5F5F5'
    },

    profileFlexWrap: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },

    profileName: {
        width: '100%',
        marginTop: '1rem',
        lineHeight: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        wordBreak: 'break-word'
    },

    profileMail: {
        width: '100%',
        lineHeight: '1.5rem',
        textAlign: 'center',
        wordBreak: 'break-all'
    },

    logoutButton: {
        width: '100%',
        textAlign: 'center'
    },

    profileMenu: {
        flexDirection: 'row',
        width: 600,
        padding: '0'
    }
};

exports.default = styles;