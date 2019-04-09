'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchResultsList = function (_Component) {
    (0, _inherits3.default)(SearchResultsList, _Component);

    function SearchResultsList() {
        (0, _classCallCheck3.default)(this, SearchResultsList);
        return (0, _possibleConstructorReturn3.default)(this, (SearchResultsList.__proto__ || (0, _getPrototypeOf2.default)(SearchResultsList)).apply(this, arguments));
    }

    (0, _createClass3.default)(SearchResultsList, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: _headerBarStyles2.default.searchResultList },
                this.props.children
            );
        }
    }]);
    return SearchResultsList;
}(_react.Component);

SearchResultsList.propTypes = {
    children: _propTypes2.default.array.isRequired
};

exports.default = SearchResultsList;