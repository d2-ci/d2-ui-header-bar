'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _headerBarStyles = require('../header-bar-styles');

var _headerBarStyles2 = _interopRequireDefault(_headerBarStyles);

var _search = require('../search/search.stores');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onMouseUp = function onMouseUp(link) {
    return function () {
        (0, _search.search)('');
        (0, _search.setSearchFieldFocusTo)(false);
        window.location = link;
    };
};

var HeaderMenuItem = function (_Component) {
    (0, _inherits3.default)(HeaderMenuItem, _Component);

    function HeaderMenuItem() {
        (0, _classCallCheck3.default)(this, HeaderMenuItem);

        var _this = (0, _possibleConstructorReturn3.default)(this, (HeaderMenuItem.__proto__ || (0, _getPrototypeOf2.default)(HeaderMenuItem)).call(this));

        _this.state = {
            hovering: false
        };

        _this.onMouseEnter = _this.onMouseEnter.bind(_this);
        _this.onMouseLeave = _this.onMouseLeave.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(HeaderMenuItem, [{
        key: 'render',
        value: function render() {
            var props = this.props;

            var itemStyle = (0, _assign2.default)({
                backgroundColor: props.selected || this.state.hovering ? '#F5F5F5' : 'transparent'
            }, _headerBarStyles2.default.menuItemLink);

            return _react2.default.createElement(
                'a',
                { href: props.action, onMouseUp: onMouseUp(props.action), style: itemStyle, onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('img', { style: _headerBarStyles2.default.menuItemIcon, src: props.icon })
                ),
                _react2.default.createElement(
                    'div',
                    { style: _headerBarStyles2.default.menuItemLabel },
                    props.label
                )
            );
        }
    }, {
        key: 'onMouseEnter',
        value: function onMouseEnter() {
            this.setState({
                hovering: true
            });
        }
    }, {
        key: 'onMouseLeave',
        value: function onMouseLeave() {
            this.setState({
                hovering: false
            });
        }
    }]);
    return HeaderMenuItem;
}(_react.Component);

HeaderMenuItem.propTypes = {
    action: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.string.isRequired,
    icon: _propTypes2.default.string
};

exports.default = HeaderMenuItem;