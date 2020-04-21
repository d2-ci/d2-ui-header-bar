'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d = require('d2');

var _NotificationItem = require('./NotificationItem');

var _NotificationItem2 = _interopRequireDefault(_NotificationItem);

var _getBaseUrlFromD2ApiUrl = require('../utils/getBaseUrlFromD2ApiUrl');

var _getBaseUrlFromD2ApiUrl2 = _interopRequireDefault(_getBaseUrlFromD2ApiUrl);

var _headerBarStyles = require('../header-bar-styles');

var _headerBarStyles2 = _interopRequireDefault(_headerBarStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_d.config.i18n.strings.add('interpretations');
_d.config.i18n.strings.add('messages');

var Notifications = function (_Component) {
    (0, _inherits3.default)(Notifications, _Component);

    function Notifications() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Notifications);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Notifications.__proto__ || (0, _getPrototypeOf2.default)(Notifications)).call.apply(_ref, [this].concat(args))), _this), _this.getBaseUrl = function () {
            return (0, _getBaseUrlFromD2ApiUrl2.default)(_this.context.d2);
        }, _this.render = function () {
            var _this$props$notificat = _this.props.notifications,
                unreadInterpretations = _this$props$notificat.unreadInterpretations,
                unreadMessageConversations = _this$props$notificat.unreadMessageConversations;

            var interpretationsHref = _this.getBaseUrl() + '/dhis-web-interpretation/index.html';
            var messagesHref = _this.getBaseUrl() + '/dhis-web-messaging';

            return _react2.default.createElement(
                'div',
                { style: _headerBarStyles2.default.notifications },
                _react2.default.createElement(_NotificationItem2.default, {
                    icon: 'Message',
                    href: interpretationsHref,
                    count: unreadInterpretations,
                    tooltip: _this.context.d2.i18n.getTranslation('interpretations'),
                    style: { top: 2 } // Message icon quick fix
                }),
                _react2.default.createElement(_NotificationItem2.default, {
                    icon: 'Email',
                    href: messagesHref,
                    count: unreadMessageConversations,
                    tooltip: _this.context.d2.i18n.getTranslation('messages')
                })
            );
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    return Notifications;
}(_react.Component);

Notifications.propTypes = {
    notifications: _propTypes2.default.object.isRequired
};

Notifications.contextTypes = {
    d2: _propTypes2.default.object.isRequired
};

exports.default = Notifications;