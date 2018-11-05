import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../header-bar-styles';

var SearchResultsList = function (_Component) {
    _inherits(SearchResultsList, _Component);

    function SearchResultsList() {
        _classCallCheck(this, SearchResultsList);

        return _possibleConstructorReturn(this, (SearchResultsList.__proto__ || _Object$getPrototypeOf(SearchResultsList)).apply(this, arguments));
    }

    _createClass(SearchResultsList, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { style: styles.searchResultList },
                this.props.children
            );
        }
    }]);

    return SearchResultsList;
}(Component);

SearchResultsList.propTypes = {
    children: PropTypes.array.isRequired
};

export default SearchResultsList;