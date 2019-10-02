'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = HeaderMenuItems;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HeaderMenuItems(props) {
    var innerMenuStyle = {
        height: props.height,
        width: props.width,
        overflowY: 'scroll',
        marginRight: props.marginRight,
        display: 'flex',
        flexWrap: 'wrap',
        boxSizing: 'content-box',
        overflow: 'auto',
        padding: props.padding
    };

    return _react2.default.createElement(
        'div',
        { style: innerMenuStyle, onScroll: props.onScroll },
        props.children
    );
}