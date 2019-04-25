'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = HeaderMenus;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _headerBarStyles = require('../header-bar-styles');

var _headerBarStyles2 = _interopRequireDefault(_headerBarStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HeaderMenus(props) {
    return _react2.default.createElement(
        'div',
        { style: _headerBarStyles2.default.menusWrap },
        props.children
    );
}