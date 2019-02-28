'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Badge = require('@material-ui/core/Badge');

var _Badge2 = _interopRequireDefault(_Badge);

var _d2UiCore = require('@dhis2/d2-ui-core');

var _headerBarStyles = require('../header-bar-styles');

var _headerBarStyles2 = _interopRequireDefault(_headerBarStyles);

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var badgeStyles = function badgeStyles(theme) {
    return {
        root: _headerBarStyles2.default.notificationBadge,
        badge: _headerBarStyles2.default.notificationBadgeIcon
    };
};
var StyledBadge = (0, _styles.withStyles)(badgeStyles)(_Badge2.default);

var iconStyles = {
    root: _headerBarStyles2.default.notificationButton
};
var StyledIconButton = (0, _styles.withStyles)(iconStyles)(_IconButton2.default);

var NotificationItem = function NotificationItem(props) {
    var count = props.count;


    if (count && count > 0) {
        return _react2.default.createElement(
            StyledBadge,
            {
                color: 'secondary',
                badgeContent: count > 99 ? '99+' : count
            },
            _react2.default.createElement(NotificationIcon, props)
        );
    }

    return _react2.default.createElement(NotificationIcon, props);
};

var NotificationIcon = function NotificationIcon(_ref) {
    var icon = _ref.icon,
        href = _ref.href,
        tooltip = _ref.tooltip,
        _ref$style = _ref.style,
        style = _ref$style === undefined ? {} : _ref$style;
    return _react2.default.createElement(
        StyledIconButton,
        {
            href: href,
            tooltip: tooltip,
            style: style
        },
        _react2.default.createElement(_d2UiCore.SvgIcon, { icon: icon, style: _headerBarStyles2.default.notificationIcon })
    );
};

exports.default = NotificationItem;