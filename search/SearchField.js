import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Observable } from 'rxjs/Observable';
import log from 'loglevel';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { SvgIcon } from '@dhis2/d2-ui-core';
import ClearIcon from '@material-ui/icons/Clear';
import AppsIcon from '@material-ui/icons/Apps';
import { config } from 'd2';
import styles, { MENU_ITEM_WIDTH } from '../header-bar-styles';
import { search, handleKeyPress, setSearchFieldFocusTo, hideWhenNotHovering } from './search.stores';
import { withStateFrom } from '@dhis2/d2-ui-core';
import { searchStore$ } from './search.stores';
import SearchResults from './SearchResults';

import { withStyles } from '@material-ui/core/styles';

var searchFieldStyles = function searchFieldStyles(theme) {
    return {
        inputUnderline: {
            '&:hover::before': {
                borderColor: 'rgba(255,255,255,0.5) !important'
            },
            '&:before': {
                borderColor: 'rgba(255,255,255,0.5) !important'
            },
            '&:after': {
                borderColor: 'white'
            }
        }
    };
};

config.i18n.strings.add('app_search_placeholder');

var SearchField = function (_Component) {
    _inherits(SearchField, _Component);

    function SearchField() {
        var _ref;

        _classCallCheck(this, SearchField);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = SearchField.__proto__ || _Object$getPrototypeOf(SearchField)).call.apply(_ref, [this].concat(args)));

        _this.state = {
            searchValue: ''
        };

        _this.setSearchValue = _this.setSearchValue.bind(_this);
        _this.focusSearchField = _this.focusSearchField.bind(_this);
        _this.onFocus = _this.onFocus.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        _this.clearSearchField = _this.clearSearchField.bind(_this);
        return _this;
    }

    _createClass(SearchField, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var isCtrlPressed = function isCtrlPressed(event) {
                return event.ctrlKey;
            };
            var isSpaceKey = function isSpaceKey(event) {
                return event.keyCode === 32 || event.key === 'Space';
            };
            var combineFilters = function combineFilters() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                return function combinedFiltersFn(event) {
                    return args.map(function (filterFn) {
                        return filterFn(event);
                    }).every(function (filterResult) {
                        return filterResult === true;
                    });
                };
            };

            // When Ctrl+Space is pressed focus the search field in the header bar
            this.disposable = Observable.fromEvent(window, 'keyup') // TODO: Using the window global directly is bad for testability
            .filter(combineFilters(isCtrlPressed, isSpaceKey)).subscribe(this.focusSearchField, log.error);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.disposable && this.disposable.unsubscribe) {
                this.disposable.unsubscribe();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var classes = this.props.classes;

            return React.createElement(
                'div',
                { style: styles.searchField },
                React.createElement(
                    'div',
                    { style: styles.searchIconContainer },
                    React.createElement(SvgIcon, { icon: 'Search', style: styles.searchIcon })
                ),
                React.createElement(
                    'div',
                    {
                        ref: function ref(searchBox) {
                            _this2.searchBox = searchBox;
                        },
                        style: styles.searchFieldInnerWrap
                    },
                    React.createElement(TextField, {
                        fullWidth: true,
                        value: this.props.searchValue || '',
                        onChange: this.setSearchValue,
                        onFocus: this.onFocus,
                        onBlur: this.onBlur,
                        placeholder: this.context.d2.i18n.getTranslation('app_search_placeholder'),
                        onKeyUp: this.onKeyUp,
                        InputProps: {
                            style: _extends({}, styles.searchFieldInput),
                            classes: {
                                underline: classes.inputUnderline
                            }
                        },
                        InputLabelProps: {
                            style: _extends({}, styles.searchFieldHintText)
                        }
                    }),
                    this.props.searchValue ? React.createElement(ClearIcon, { style: styles.clearIcon,
                        onClick: this.clearSearchField }) : ''
                ),
                React.createElement(
                    IconButton,
                    { onClick: this.focusSearchField },
                    React.createElement(AppsIcon, { style: { fill: 'white' } })
                ),
                React.createElement(SearchResults, null)
            );
        }
    }, {
        key: 'focusSearchField',
        value: function focusSearchField() {
            var searchBox = this.searchBox;

            if (searchBox && searchBox !== document.activeElement) {
                searchBox.querySelector('input').focus();
            }
        }
    }, {
        key: 'clearSearchField',
        value: function clearSearchField() {
            if (this.state.hasFocus) {
                this.focusSearchField();
            }
            search('');
        }
    }, {
        key: 'setSearchValue',
        value: function setSearchValue(event) {
            this.setState({ hasValue: Boolean(event.target.value) });
            search(event.target.value);
        }
    }, {
        key: 'onFocus',
        value: function onFocus() {
            this.setState({ hasFocus: true });
            setSearchFieldFocusTo(true);
        }
    }, {
        key: 'onBlur',
        value: function onBlur() {
            this.setState({ hasFocus: false });
            hideWhenNotHovering();
        }
    }, {
        key: 'onKeyUp',
        value: function onKeyUp(event) {
            handleKeyPress(event, Math.floor(event.currentTarget.clientWidth / MENU_ITEM_WIDTH));
        }
    }]);

    return SearchField;
}(Component);

SearchField.contextTypes = {
    d2: PropTypes.object.isRequired
};

var StyledSearchField = withStyles(searchFieldStyles)(SearchField);

export default withStateFrom(searchStore$, StyledSearchField);