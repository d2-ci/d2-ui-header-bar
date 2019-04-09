'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _Observable = require('rxjs/Observable');

var _headerBarStyles = require('./header-bar-styles');

var _headerBarStyles2 = _interopRequireDefault(_headerBarStyles);

var _getBaseUrlFromD2ApiUrl = require('./utils/getBaseUrlFromD2ApiUrl');

var _getBaseUrlFromD2ApiUrl2 = _interopRequireDefault(_getBaseUrlFromD2ApiUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global dhis2:false */

var defaultStyle = 'light_blue';
var defaultStylesheetUrl = 'light_blue/light_blue.css';
var stylesLocation = 'dhis-web-commons/css';

function islocalStorageSupported() {
    try {
        localStorage.setItem('dhis2.menu.localstorage.test', 'dhis2.menu.localstorage.test');
        localStorage.removeItem('dhis2.menu.localstorage.test');
        return true;
    } catch (e) {
        return false;
    }
}

function saveToLocalStorage() {
    var headerData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (islocalStorageSupported()) {
        headerData.userStyleUrl && localStorage.setItem('dhis2.menu.ui.headerBar.userStyle', headerData.userStyleUrl);
        headerData.title && localStorage.setItem('dhis2.menu.ui.headerBar.title', headerData.title);
    }

    return headerData;
}

var InnerHeader = function (_Component) {
    (0, _inherits3.default)(InnerHeader, _Component);

    function InnerHeader() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, InnerHeader);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = InnerHeader.__proto__ || (0, _getPrototypeOf2.default)(InnerHeader)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            headerBar: {}
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(InnerHeader, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            this.getSystemSettings(this.context.d2).then(this.getHeaderBarData).catch(this.loadDataFromLocalStorageIfAvailable).then(saveToLocalStorage).then(function (headerData) {
                _this2.setHeaderData(headerData.userStyleUrl, headerData.title);
            }).catch(function (error) {
                _loglevel2.default.error(error);
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            _Observable.Observable.fromEvent(window, 'resize').debounceTime(200).subscribe(function () {
                return _this3.forceUpdate();
            }, function (e) {
                return _loglevel2.default.error('Could not update the HeaderBar after resize', e);
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            if (this.props.lastUpdate && this.props.lastUpdate.getTime() - props.lastUpdate.getTime() !== 0) {
                if (dhis2 && dhis2.menu && dhis2.menu.ui && dhis2.menu.ui.bootstrapMenu) {
                    dhis2.menu.ui.bootstrapMenu();
                }
            }
        }
    }, {
        key: 'getSystemSettings',
        value: function getSystemSettings(d2) {
            if (!d2.system) {
                return _promise2.default.reject(new Error('Offline'));
            }

            return d2.system.settings.all();
        }
    }, {
        key: 'getHeaderBarData',
        value: function getHeaderBarData(systemSettings) {
            return this.requestUserStyle().catch(function () {
                _loglevel2.default.info('Unable to load usersettings, falling back to systemSettings');
                localStorage.setItem('dhis2.menu.ui.headerBar.userStyle', systemSettings.keyCurrentStyle);
                return systemSettings.keyCurrentStyle;
            }).then(function (userStyleUrl) {
                return {
                    userStyleUrl: userStyleUrl || systemSettings.keyCurrentStyle,
                    title: systemSettings.applicationTitle
                };
            }).catch(function (error) {
                return _loglevel2.default.error(error);
            });
        }
    }, {
        key: 'getApiBaseUrl',
        value: function getApiBaseUrl() {
            if (!this.context.d2.Api) {
                return '/';
            }
            return this.context.d2.Api.getApi().baseUrl;
        }
    }, {
        key: 'getBaseUrl',
        value: function getBaseUrl() {
            return (0, _getBaseUrlFromD2ApiUrl2.default)(this.context.d2);
        }
    }, {
        key: 'getLogoUrl',
        value: function getLogoUrl() {
            return [this.getApiBaseUrl(), 'staticContent', 'logo_banner'].join('/');
        }
    }, {
        key: 'getStylesheetUrl',
        value: function getStylesheetUrl(stylesheet) {
            return [this.getBaseUrl(), stylesLocation, 'themes', stylesheet || defaultStylesheetUrl].join('/');
        }
    }, {
        key: 'getStyleName',
        value: function getStyleName(userStyle) {
            if (typeof userStyle === 'string' && userStyle.split('/')[0] && userStyle.split('/').length > 0) {
                return userStyle.split('/')[0];
            }
            return defaultStyle;
        }
    }, {
        key: 'render',
        value: function render() {
            var headerBannerWrapperStyle = {
                width: 155,
                height: 44,
                verticalAlign: 'middle',
                textAlign: 'center',
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            };

            var headerBannerStyle = {
                maxWidth: 175,
                maxHeight: 44
            };

            var linkWrapStyle = {
                flex: 1,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                color: '#FFF',
                alignItems: 'center',
                justifyItems: 'center',
                display: 'flex',
                minWidth: 'auto',
                paddingRight: '1rem',
                boxSizing: 'border-box'
            };

            var linkStyle = {
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#FFF',
                textDecoration: 'none',
                textOverflow: 'ellipsis',
                minWidth: 1,
                overflow: 'hidden',
                whiteSpace: 'nowrap'
            };

            var logoHref = {
                minWidth: 175
            };

            var linkHref = [this.getBaseUrl(), 'dhis-web-commons-about/redirect.action'].join('/');

            var innerHeaderStyles = (0, _assign2.default)({ display: 'flex', overflow: 'hidden', textOverflow: 'ellipsis' }, _headerBarStyles2.default.headerTitle);

            return _react2.default.createElement(
                'div',
                { style: innerHeaderStyles },
                _react2.default.createElement(
                    'a',
                    { href: linkHref, title: this.state.headerBar.title, style: logoHref, className: 'title-link' },
                    _react2.default.createElement(
                        'div',
                        { style: headerBannerWrapperStyle },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement('img', { className: 'header-logo', src: this.getLogoUrl(), id: 'headerBanner', style: headerBannerStyle })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: linkWrapStyle },
                    _react2.default.createElement(
                        'a',
                        { href: linkHref, title: this.state.headerBar.title, style: linkStyle, className: 'title-link' },
                        this.state.headerBar.title
                    )
                )
            );
        }
    }, {
        key: 'loadDataFromLocalStorageIfAvailable',
        value: function loadDataFromLocalStorageIfAvailable() {
            var title = void 0;
            var userStyle = void 0;

            // Load values from localStorage if they are available
            if (islocalStorageSupported()) {
                title = localStorage.getItem('dhis2.menu.ui.headerBar.title');
                userStyle = localStorage.getItem('dhis2.menu.ui.headerBar.userStyle');
            }

            return {
                userStyleUrl: userStyle,
                title: title
            };
        }
    }, {
        key: 'setHeaderData',
        value: function setHeaderData(userStyleUrl, title) {
            this.addUserStyleStylesheet(this.getStylesheetUrl(userStyleUrl));
            this.setHeaderTitle(title);
        }
    }, {
        key: 'setHeaderBarProp',
        value: function setHeaderBarProp(name, value) {
            this.setState({
                headerBar: (0, _assign2.default)({}, this.state.headerBar, (0, _defineProperty3.default)({}, name, value))
            });
        }
    }, {
        key: 'setHeaderTitle',
        value: function setHeaderTitle(applicationTitle) {
            this.setHeaderBarProp('title', applicationTitle || 'District Health Information Software 2');
        }
    }, {
        key: 'requestUserStyle',
        value: function requestUserStyle() {
            var api = this.context.d2.Api.getApi();
            return api.get('userSettings/keyStyle').then(function (response) {
                return response.trim();
            });
        }
    }, {
        key: 'isValidUserStyle',
        value: function isValidUserStyle(userStyle) {
            return typeof userStyle === 'string' && /^[A-z0-9_\-]+$/.test(userStyle);
        }
    }, {
        key: 'addUserStyleStylesheet',
        value: function addUserStyleStylesheet(stylesheetUrl) {
            var linkElement = document.createElement('link');
            linkElement.setAttribute('href', stylesheetUrl);
            linkElement.setAttribute('type', 'text/css');
            linkElement.setAttribute('rel', 'stylesheet');
            linkElement.setAttribute('media', 'screen,print');

            document.querySelector('head').appendChild(linkElement);
        }
    }]);
    return InnerHeader;
}(_react.Component);

InnerHeader.propTypes = {
    lastUpdate: _propTypes2.default.instanceOf(Date)
};

InnerHeader.contextTypes = {
    d2: _propTypes2.default.object.isRequired
};

exports.default = InnerHeader;