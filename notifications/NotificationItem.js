import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

import { SvgIcon } from '@dhis2/d2-ui-core';
import styles from '../header-bar-styles';

import { withStyles } from '@material-ui/core/styles';

var badgeStyles = function badgeStyles(theme) {
    return {
        root: styles.notificationBadge,
        badge: styles.notificationBadgeIcon
    };
};
var StyledBadge = withStyles(badgeStyles)(Badge);

var iconStyles = {
    root: styles.notificationButton
};
var StyledIconButton = withStyles(iconStyles)(IconButton);

var NotificationItem = function NotificationItem(props) {
    var count = props.count;


    if (count && count > 0) {
        return React.createElement(
            StyledBadge,
            {
                color: 'secondary',
                badgeContent: count > 99 ? '99+' : count
            },
            React.createElement(NotificationIcon, props)
        );
    }

    return React.createElement(NotificationIcon, props);
};

var NotificationIcon = function NotificationIcon(_ref) {
    var icon = _ref.icon,
        href = _ref.href,
        tooltip = _ref.tooltip,
        _ref$style = _ref.style,
        style = _ref$style === undefined ? {} : _ref$style;
    return React.createElement(
        StyledIconButton,
        {
            href: href,
            tooltip: tooltip,
            style: style
        },
        React.createElement(SvgIcon, { icon: icon, style: styles.notificationIcon })
    );
};

export default NotificationItem;