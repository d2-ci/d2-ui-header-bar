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

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _headerBarStyles = require('../header-bar-styles');

var _headerBarStyles2 = _interopRequireDefault(_headerBarStyles);

var _HeaderMenuItems = require('./HeaderMenuItems');

var _HeaderMenuItems2 = _interopRequireDefault(_HeaderMenuItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeaderMenu = function (_Component) {
    (0, _inherits3.default)(HeaderMenu, _Component);

    function HeaderMenu() {
        var _ref;

        (0, _classCallCheck3.default)(this, HeaderMenu);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = HeaderMenu.__proto__ || (0, _getPrototypeOf2.default)(HeaderMenu)).call.apply(_ref, [this].concat(args)));

        _this.state = {};

        _this.onMouseEnter = _this.onMouseEnter.bind(_this);
        _this.onMouseLeave = _this.onMouseLeave.bind(_this);
        _this.onScroll = _this.onScroll.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(HeaderMenu, [{
        key: 'render',
        value: function render() {
            var itemsPerRow = this.props.rowItemCount;
            var menuWidth = itemsPerRow * _headerBarStyles.MENU_ITEM_WIDTH;
            var _props = this.props,
                name = _props.name,
                children = _props.children;

            var menuStyle = (0, _assign2.default)({}, _headerBarStyles2.default.dropDownWrap, {
                display: this.state.open ? 'flex' : 'none',
                right: this.state.showScrollBar ? 20 : _headerBarStyles2.default.dropDownWrap.right,
                width: this.state.showScrollBar ? menuWidth + 55 : menuWidth + 35
            }, this.props.menuStyle);

            var useScrollAfterNumberOfRows = this.props.columnItemCount * _headerBarStyles.MENU_ITEM_WIDTH;
            var calculatedHeight = Math.ceil(children.length / itemsPerRow) * _headerBarStyles.MENU_ITEM_WIDTH;
            var innerMenuProps = {
                height: calculatedHeight > useScrollAfterNumberOfRows ? useScrollAfterNumberOfRows : calculatedHeight,
                width: this.state.showScrollBar ? menuWidth + 35 : menuWidth + 55,
                marginRight: this.state.showScrollBar ? 0 : -30,
                onScroll: this.onScroll.bind(this),
                padding: this.props.padding
            };

            return _react2.default.createElement(
                'div',
                {
                    style: _headerBarStyles2.default.headerMenu,
                    onMouseEnter: this.onMouseEnter,
                    onMouseLeave: this.onMouseLeave
                },
                name,
                _react2.default.createElement(
                    'div',
                    { style: { paddingTop: 55 } },
                    _react2.default.createElement(
                        _Paper2.default,
                        { style: menuStyle },
                        _react2.default.createElement(
                            _HeaderMenuItems2.default,
                            innerMenuProps,
                            children
                        ),
                        this.props.rightSide,
                        this.props.moreButton
                    )
                )
            );
        }
    }, {
        key: 'onMouseEnter',
        value: function onMouseEnter(event) {
            this.setState({
                anchor: event.target,
                open: true
            });
        }
    }, {
        key: 'onMouseLeave',
        value: function onMouseLeave() {
            this.setState({
                open: false
            });
        }
    }, {
        key: 'onScroll',
        value: function onScroll(event) {
            this.setState({
                showScrollBar: event.target.scrollTop > 1
            });
        }
    }]);
    return HeaderMenu;
}(_react.Component);

exports.default = HeaderMenu;