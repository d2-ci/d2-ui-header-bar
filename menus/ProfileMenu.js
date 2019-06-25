'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Avatar = require('@material-ui/core/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _HeaderMenu = require('./HeaderMenu');

var _HeaderMenu2 = _interopRequireDefault(_HeaderMenu);

var _HeaderMenuItem = require('./HeaderMenuItem');

var _HeaderMenuItem2 = _interopRequireDefault(_HeaderMenuItem);

var _d2UiCore = require('@dhis2/d2-ui-core');

var _getBaseUrlFromD2ApiUrl = require('../utils/getBaseUrlFromD2ApiUrl');

var _getBaseUrlFromD2ApiUrl2 = _interopRequireDefault(_getBaseUrlFromD2ApiUrl);

var _headerBarStyles = require('../header-bar-styles');

var _headerBarStyles2 = _interopRequireDefault(_headerBarStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getBaseUrl = _getBaseUrlFromD2ApiUrl2.default;

var ProfileMenu = (0, _d2UiCore.addD2Context)(function (props, _ref) {
    var d2 = _ref.d2;
    var currentUser = props.currentUser,
        items = props.items;

    var menuItems = items.map(function (item, index) {
        return _react2.default.createElement(_HeaderMenuItem2.default, (0, _extends3.default)({ key: index }, item));
    });

    if (!currentUser.firstName) {
        return _react2.default.createElement('div', null);
    }

    var initials = '' + currentUser.firstName.charAt(0) + currentUser.surname.charAt(0);

    var rightSide = _react2.default.createElement(
        'div',
        { style: _headerBarStyles2.default.profileRightSide },
        _react2.default.createElement(
            'div',
            { style: _headerBarStyles2.default.profileFlexWrap },
            _react2.default.createElement(
                _Avatar2.default,
                { style: _headerBarStyles2.default.avatarBig },
                initials
            ),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: _headerBarStyles2.default.profileName },
                    currentUser.displayName
                ),
                _react2.default.createElement(
                    'div',
                    { style: _headerBarStyles2.default.profileMail },
                    currentUser.email
                )
            )
        ),
        _react2.default.createElement(
            _Button2.default,
            { style: _headerBarStyles2.default.logoutButton, href: getBaseUrl(d2) + '/dhis-web-commons-security/logout.action' },
            d2.i18n.getTranslation('log_out')
        )
    );

    return _react2.default.createElement(
        _HeaderMenu2.default,
        {
            name: _react2.default.createElement(
                _Avatar2.default,
                { size: 32, style: _headerBarStyles2.default.avatar },
                initials
            ),
            rowItemCount: props.rowItemCount,
            columnItemCount: props.columnItemCount,
            rightSide: rightSide,
            width: 700,
            menuStyle: _headerBarStyles2.default.profileMenu,
            padding: '1rem'
        },
        menuItems
    );
});

exports.default = ProfileMenu;