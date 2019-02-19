import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { config } from 'd2';

import NotificationItem from './NotificationItem';
import getBaseUrlFromD2ApiUrl from '../utils/getBaseUrlFromD2ApiUrl';
import styles from '../header-bar-styles';

config.i18n.strings.add('interpretations');
config.i18n.strings.add('messages');

var Notifications = function (_Component) {
    _inherits(Notifications, _Component);

    function Notifications() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Notifications);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Notifications.__proto__ || _Object$getPrototypeOf(Notifications)).call.apply(_ref, [this].concat(args))), _this), _this.getBaseUrl = function () {
            return getBaseUrlFromD2ApiUrl(_this.context.d2);
        }, _this.render = function () {
            var _this$props$notificat = _this.props.notifications,
                unreadInterpretations = _this$props$notificat.unreadInterpretations,
                unreadMessageConversations = _this$props$notificat.unreadMessageConversations;

            var interpretationsHref = _this.getBaseUrl() + '/dhis-web-interpretation/index.html';
            var messagesHref = _this.getBaseUrl() + '/dhis-web-messaging';

            return React.createElement(
                'div',
                { style: styles.notifications },
                React.createElement(NotificationItem, {
                    icon: 'Message',
                    href: interpretationsHref,
                    count: unreadInterpretations,
                    tooltip: _this.context.d2.i18n.getTranslation('interpretations'),
                    style: { top: 2 } // Message icon quick fix
                }),
                React.createElement(NotificationItem, {
                    icon: 'Email',
                    href: messagesHref,
                    count: unreadMessageConversations,
                    tooltip: _this.context.d2.i18n.getTranslation('messages')
                })
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Notifications;
}(Component);

Notifications.propTypes = {
    notifications: PropTypes.object.isRequired
};

Notifications.contextTypes = {
    d2: PropTypes.object.isRequired
};

export default Notifications;