'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _Observable = require('rxjs/Observable');

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _d2UiCore = require('@dhis2/d2-ui-core');

var _Clear = require('@material-ui/icons/Clear');

var _Clear2 = _interopRequireDefault(_Clear);

var _Apps = require('@material-ui/icons/Apps');

var _Apps2 = _interopRequireDefault(_Apps);

var _d = require('d2');

var _headerBarStyles = require('../header-bar-styles');

var _headerBarStyles2 = _interopRequireDefault(_headerBarStyles);

var _search = require('./search.stores');

var _SearchResults = require('./SearchResults');

var _SearchResults2 = _interopRequireDefault(_SearchResults);

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

_d.config.i18n.strings.add('app_search_placeholder');

var SearchField = function (_Component) {
    (0, _inherits3.default)(SearchField, _Component);

    function SearchField() {
        var _ref;

        (0, _classCallCheck3.default)(this, SearchField);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = SearchField.__proto__ || (0, _getPrototypeOf2.default)(SearchField)).call.apply(_ref, [this].concat(args)));

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

    (0, _createClass3.default)(SearchField, [{
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
            this.disposable = _Observable.Observable.fromEvent(window, 'keyup') // TODO: Using the window global directly is bad for testability
            .filter(combineFilters(isCtrlPressed, isSpaceKey)).subscribe(this.focusSearchField, _loglevel2.default.error);
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

            return _react2.default.createElement(
                'div',
                { style: _headerBarStyles2.default.searchField },
                _react2.default.createElement(
                    'div',
                    { style: _headerBarStyles2.default.searchIconContainer },
                    _react2.default.createElement(_d2UiCore.SvgIcon, { icon: 'Search', style: _headerBarStyles2.default.searchIcon })
                ),
                _react2.default.createElement(
                    'div',
                    {
                        ref: function ref(searchBox) {
                            _this2.searchBox = searchBox;
                        },
                        style: _headerBarStyles2.default.searchFieldInnerWrap
                    },
                    _react2.default.createElement(_TextField2.default, {
                        fullWidth: true,
                        value: this.props.searchValue || '',
                        onChange: this.setSearchValue,
                        onFocus: this.onFocus,
                        onBlur: this.onBlur,
                        placeholder: this.context.d2.i18n.getTranslation('app_search_placeholder'),
                        onKeyUp: this.onKeyUp,
                        InputProps: {
                            style: (0, _extends3.default)({}, _headerBarStyles2.default.searchFieldInput),
                            classes: {
                                underline: classes.inputUnderline
                            }
                        },
                        InputLabelProps: {
                            style: (0, _extends3.default)({}, _headerBarStyles2.default.searchFieldHintText)
                        }
                    }),
                    this.props.searchValue ? _react2.default.createElement(_Clear2.default, { style: _headerBarStyles2.default.clearIcon,
                        onClick: this.clearSearchField }) : ''
                ),
                _react2.default.createElement(
                    _IconButton2.default,
                    { onClick: this.focusSearchField },
                    _react2.default.createElement(_Apps2.default, { style: { fill: 'white' } })
                ),
                _react2.default.createElement(_SearchResults2.default, null)
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
            (0, _search.search)('');
        }
    }, {
        key: 'setSearchValue',
        value: function setSearchValue(event) {
            this.setState({ hasValue: Boolean(event.target.value) });
            (0, _search.search)(event.target.value);
        }
    }, {
        key: 'onFocus',
        value: function onFocus() {
            this.setState({ hasFocus: true });
            (0, _search.setSearchFieldFocusTo)(true);
        }
    }, {
        key: 'onBlur',
        value: function onBlur() {
            this.setState({ hasFocus: false });
            (0, _search.hideWhenNotHovering)();
        }
    }, {
        key: 'onKeyUp',
        value: function onKeyUp(event) {
            (0, _search.handleKeyPress)(event, Math.floor(event.currentTarget.clientWidth / _headerBarStyles.MENU_ITEM_WIDTH));
        }
    }]);
    return SearchField;
}(_react.Component);

SearchField.contextTypes = {
    d2: _propTypes2.default.object.isRequired
};

var StyledSearchField = (0, _styles.withStyles)(searchFieldStyles)(SearchField);

exports.default = (0, _d2UiCore.withStateFrom)(_search.searchStore$, StyledSearchField);