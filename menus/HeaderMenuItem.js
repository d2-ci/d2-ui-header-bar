import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../header-bar-styles';
import { search, setSearchFieldFocusTo } from '../search/search.stores';

var onMouseUp = function onMouseUp(link) {
    return function () {
        search('');
        setSearchFieldFocusTo(false);
        window.location = link;
    };
};

var HeaderMenuItem = function (_Component) {
    _inherits(HeaderMenuItem, _Component);

    function HeaderMenuItem() {
        _classCallCheck(this, HeaderMenuItem);

        var _this = _possibleConstructorReturn(this, (HeaderMenuItem.__proto__ || _Object$getPrototypeOf(HeaderMenuItem)).call(this));

        _this.state = {
            hovering: false
        };

        _this.onMouseEnter = _this.onMouseEnter.bind(_this);
        _this.onMouseLeave = _this.onMouseLeave.bind(_this);
        return _this;
    }

    _createClass(HeaderMenuItem, [{
        key: 'render',
        value: function render() {
            var props = this.props;

            var itemStyle = _Object$assign({
                backgroundColor: props.selected || this.state.hovering ? '#F5F5F5' : 'transparent'
            }, styles.menuItemLink);

            return React.createElement(
                'a',
                { href: props.action, onMouseUp: onMouseUp(props.action), style: itemStyle, onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave },
                React.createElement(
                    'div',
                    null,
                    React.createElement('img', { style: styles.menuItemIcon, src: props.icon })
                ),
                React.createElement(
                    'div',
                    { style: styles.menuItemLabel },
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
}(Component);

HeaderMenuItem.propTypes = {
    action: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string
};

export default HeaderMenuItem;