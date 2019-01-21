import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import styles, { MENU_ITEM_WIDTH } from '../header-bar-styles';
import HeaderMenuItems from './HeaderMenuItems';

var HeaderMenu = function (_Component) {
    _inherits(HeaderMenu, _Component);

    function HeaderMenu() {
        var _ref;

        _classCallCheck(this, HeaderMenu);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = HeaderMenu.__proto__ || _Object$getPrototypeOf(HeaderMenu)).call.apply(_ref, [this].concat(args)));

        _this.state = {};

        _this.onMouseEnter = _this.onMouseEnter.bind(_this);
        _this.onMouseLeave = _this.onMouseLeave.bind(_this);
        _this.onScroll = _this.onScroll.bind(_this);
        return _this;
    }

    _createClass(HeaderMenu, [{
        key: 'render',
        value: function render() {
            var itemsPerRow = this.props.rowItemCount;
            var menuWidth = itemsPerRow * MENU_ITEM_WIDTH;
            var _props = this.props,
                name = _props.name,
                children = _props.children;

            var menuStyle = _Object$assign({}, styles.dropDownWrap, {
                display: this.state.open ? 'flex' : 'none',
                right: this.state.showScrollBar ? 20 : styles.dropDownWrap.right,
                width: this.state.showScrollBar ? menuWidth + 55 : menuWidth + 35
            }, this.props.menuStyle);

            var useScrollAfterNumberOfRows = this.props.columnItemCount * MENU_ITEM_WIDTH;
            var calculatedHeight = Math.ceil(children.length / itemsPerRow) * MENU_ITEM_WIDTH;
            var innerMenuProps = {
                height: calculatedHeight > useScrollAfterNumberOfRows ? useScrollAfterNumberOfRows : calculatedHeight,
                width: this.state.showScrollBar ? menuWidth + 35 : menuWidth + 55,
                marginRight: this.state.showScrollBar ? 0 : -30,
                onScroll: this.onScroll.bind(this),
                padding: this.props.padding
            };

            return React.createElement(
                'div',
                {
                    style: styles.headerMenu,
                    onMouseEnter: this.onMouseEnter,
                    onMouseLeave: this.onMouseLeave
                },
                name,
                React.createElement(
                    'div',
                    { style: { paddingTop: 55 } },
                    React.createElement(
                        Paper,
                        { style: menuStyle },
                        React.createElement(
                            HeaderMenuItems,
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
}(Component);

export default HeaderMenu;