'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HeaderBar = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

require('rxjs/add/observable/fromPromise');

require('rxjs/add/observable/of');

require('rxjs/add/observable/combineLatest');

require('rxjs/add/operator/combineLatest');

require('rxjs/add/operator/catch');

require('rxjs/add/operator/map');

require('rxjs/add/operator/mergeMap');

require('rxjs/add/operator/filter');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _LinearProgress = require('@material-ui/core/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _d2UiCore = require('@dhis2/d2-ui-core');

var _d = require('d2');

var _ProfileMenu = require('./menus/ProfileMenu');

var _ProfileMenu2 = _interopRequireDefault(_ProfileMenu);

var _InnerHeader = require('./InnerHeader');

var _InnerHeader2 = _interopRequireDefault(_InnerHeader);

var _HeaderMenus = require('./menus/HeaderMenus');

var _HeaderMenus2 = _interopRequireDefault(_HeaderMenus);

var _Notifications = require('./notifications/Notifications');

var _Notifications2 = _interopRequireDefault(_Notifications);

var _SearchField = require('./search/SearchField');

var _SearchField2 = _interopRequireDefault(_SearchField);

var _headerBarStyles = require('./header-bar-styles');

var _headerBarStyles2 = _interopRequireDefault(_headerBarStyles);

var _d2UiApp = require('@dhis2/d2-ui-app');

var _d2UiApp2 = _interopRequireDefault(_d2UiApp);

var _headerBar = require('./headerBar.store');

var _headerBar2 = _interopRequireDefault(_headerBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeaderBar = exports.HeaderBar = function (_Component) {
    (0, _inherits3.default)(HeaderBar, _Component);
    (0, _createClass3.default)(HeaderBar, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { d2: this.props.d2 };
        }
    }]);

    function HeaderBar(props) {
        (0, _classCallCheck3.default)(this, HeaderBar);

        var _this = (0, _possibleConstructorReturn3.default)(this, (HeaderBar.__proto__ || (0, _getPrototypeOf2.default)(HeaderBar)).call(this, props));

        if (props.d2) {
            (0, _d.setInstance)(props.d2);
        }
        return _this;
    }

    (0, _createClass3.default)(HeaderBar, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                profileItems = _props.profileItems,
                notifications = _props.notifications,
                noLoadingIndicator = _props.noLoadingIndicator;


            var currentUser = this.props.d2.currentUser;

            // If the required props are not passed we're in a loading state.
            if (!this.props.d2 || !profileItems) {
                if (noLoadingIndicator) {
                    return _react2.default.createElement('div', { style: { display: 'none' } });
                }

                return _react2.default.createElement(
                    'div',
                    { style: _headerBarStyles2.default.headerBar },
                    _react2.default.createElement(
                        'div',
                        { style: { flexGrow: 1, alignSelf: 'flex-end' } },
                        _react2.default.createElement(_LinearProgress2.default, { mode: 'indeterminate' })
                    )
                );
            }

            return _react2.default.createElement(
                _d2UiApp2.default,
                null,
                _react2.default.createElement(
                    'div',
                    { style: (0, _headerBarStyles.applyUserStyle)(currentUser, _headerBarStyles2.default.headerBar) },
                    _react2.default.createElement(_InnerHeader2.default, null),
                    _react2.default.createElement(
                        'div',
                        { className: 'd2-ui-header-bar--CustomArea' },
                        this.props.children
                    ),
                    _react2.default.createElement(
                        'div',
                        { style: _headerBarStyles2.default.headerActions },
                        _react2.default.createElement(_Notifications2.default, { notifications: notifications }),
                        _react2.default.createElement(_SearchField2.default, null)
                    ),
                    _react2.default.createElement(
                        _HeaderMenus2.default,
                        null,
                        _react2.default.createElement(_ProfileMenu2.default, {
                            items: profileItems,
                            rowItemCount: 3,
                            columnItemCount: 3,
                            currentUser: currentUser
                        })
                    )
                )
            );
        }
    }]);
    return HeaderBar;
}(_react.Component);

HeaderBar.childContextTypes = {
    d2: _propTypes2.default.object
};

HeaderBar.propTypes = {
    notifications: _propTypes2.default.object,
    profileItems: _propTypes2.default.array,
    noLoadingIndicator: _propTypes2.default.bool,
    d2: _propTypes2.default.object.isRequired
};

HeaderBar.defaultProps = {
    notifications: {}
};

exports.default = (0, _d2UiCore.withStateFrom)(_headerBar2.default, HeaderBar);