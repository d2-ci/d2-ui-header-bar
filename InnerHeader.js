import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Promise from 'babel-runtime/core-js/promise';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/* global dhis2 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';
import { Observable } from 'rxjs/Observable';
import styles from './header-bar-styles';
import getBaseUrlFromD2ApiUrl from './utils/getBaseUrlFromD2ApiUrl';

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
    _inherits(InnerHeader, _Component);

    function InnerHeader() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, InnerHeader);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InnerHeader.__proto__ || _Object$getPrototypeOf(InnerHeader)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            headerBar: {}
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(InnerHeader, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            this.getSystemSettings(this.context.d2).then(this.getHeaderBarData).catch(this.loadDataFromLocalStorageIfAvailable).then(saveToLocalStorage).then(function (headerData) {
                _this2.setHeaderData(headerData.userStyleUrl, headerData.title);
            }).catch(function (error) {
                log.error(error);
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            Observable.fromEvent(window, 'resize').debounceTime(200).subscribe(function () {
                return _this3.forceUpdate();
            }, function (e) {
                return log.error('Could not update the HeaderBar after resize', e);
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
                return _Promise.reject(new Error('Offline'));
            }

            return d2.system.settings.all();
        }
    }, {
        key: 'getHeaderBarData',
        value: function getHeaderBarData(systemSettings) {
            return this.requestUserStyle().catch(function () {
                log.info('Unable to load usersettings, falling back to systemSettings');
                localStorage.setItem('dhis2.menu.ui.headerBar.userStyle', systemSettings.keyCurrentStyle);
                return systemSettings.keyCurrentStyle;
            }).then(function (userStyleUrl) {
                return {
                    userStyleUrl: userStyleUrl || systemSettings.keyCurrentStyle,
                    title: systemSettings.applicationTitle
                };
            }).catch(function (error) {
                return log.error(error);
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
            return getBaseUrlFromD2ApiUrl(this.context.d2);
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

            var innerHeaderStyles = _Object$assign({ display: 'flex', overflow: 'hidden', textOverflow: 'ellipsis' }, styles.headerTitle);

            return React.createElement(
                'div',
                { style: innerHeaderStyles },
                React.createElement(
                    'a',
                    { href: linkHref, title: this.state.headerBar.title, style: logoHref, className: 'title-link' },
                    React.createElement(
                        'div',
                        { style: headerBannerWrapperStyle },
                        React.createElement(
                            'div',
                            null,
                            React.createElement('img', { className: 'header-logo', src: this.getLogoUrl(), id: 'headerBanner', style: headerBannerStyle })
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { style: linkWrapStyle },
                    React.createElement(
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
                headerBar: _Object$assign({}, this.state.headerBar, _defineProperty({}, name, value))
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
}(Component);

InnerHeader.propTypes = {
    lastUpdate: PropTypes.instanceOf(Date)
};

InnerHeader.contextTypes = {
    d2: PropTypes.object.isRequired
};

export default InnerHeader;