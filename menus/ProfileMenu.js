import _extends from 'babel-runtime/helpers/extends';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import HeaderMenu from './HeaderMenu';
import HeaderMenuItem from './HeaderMenuItem';
import { addD2Context } from '@dhis2/d2-ui-core';
import getBaseUrlFromD2ApiUrl from '../utils/getBaseUrlFromD2ApiUrl';
import styles from '../header-bar-styles';

var getBaseUrl = getBaseUrlFromD2ApiUrl;

var ProfileMenu = addD2Context(function (props, _ref) {
    var d2 = _ref.d2;
    var currentUser = props.currentUser,
        items = props.items;

    var menuItems = items.map(function (item, index) {
        return React.createElement(HeaderMenuItem, _extends({ key: index }, item));
    });

    if (!currentUser.firstName) {
        return React.createElement('div', null);
    }

    var initials = '' + currentUser.firstName.charAt(0) + currentUser.surname.charAt(0);
    /* eslint-disable */
    var rightSide = React.createElement(
        'div',
        { style: styles.profileRightSide },
        React.createElement(
            'div',
            { style: styles.profileFlexWrap },
            React.createElement(
                Avatar,
                { style: styles.avatarBig },
                initials
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { key: name, style: styles.profileName },
                    currentUser.displayName
                ),
                React.createElement(
                    'div',
                    { style: styles.profileMail },
                    currentUser.email
                )
            )
        ),
        React.createElement(
            Button,
            { style: styles.logoutButton, href: getBaseUrl(d2) + '/dhis-web-commons-security/logout.action' },
            d2.i18n.getTranslation('log_out')
        )
    );
    /* eslint-enable */

    return React.createElement(
        HeaderMenu,
        {
            name: React.createElement(
                Avatar,
                { size: 32, style: styles.avatar },
                initials
            ),
            rowItemCount: props.rowItemCount,
            columnItemCount: props.columnItemCount,
            rightSide: rightSide,
            width: 700,
            menuStyle: styles.profileMenu,
            padding: '1rem'
        },
        menuItems
    );
});

export default ProfileMenu;