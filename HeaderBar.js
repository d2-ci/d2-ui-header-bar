import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
import _inherits from 'babel-runtime/helpers/inherits';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';

import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStateFrom } from '@dhis2/d2-ui-core';
import { setInstance } from 'd2';

import ProfileMenu from './menus/ProfileMenu';
import InnerHeader from './InnerHeader';
import HeaderMenus from './menus/HeaderMenus';
import Notifications from './notifications/Notifications';
import SearchField from './search/SearchField';
import styles, { applyUserStyle } from './header-bar-styles';

import { App as D2UI } from '@dhis2/d2-ui-core';
import headerBarStore$ from './headerBar.store';

export var HeaderBar = function (_Component) {
    _inherits(HeaderBar, _Component);

    _createClass(HeaderBar, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { d2: this.props.d2 };
        }
    }]);

    function HeaderBar(props) {
        _classCallCheck(this, HeaderBar);

        var _this = _possibleConstructorReturn(this, (HeaderBar.__proto__ || _Object$getPrototypeOf(HeaderBar)).call(this, props));

        if (props.d2) {
            setInstance(props.d2);
        }
        return _this;
    }

    _createClass(HeaderBar, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                profileItems = _props.profileItems,
                notifications = _props.notifications,
                noLoadingIndicator = _props.noLoadingIndicator;


            var currentUser = this.props.d2.currentUser;

            // If the required props are not passed we're in a loading state.
            if (!this.props.d2 || !profileItems) {
                if (noLoadingIndicator) {
                    return React.createElement('div', { style: { display: 'none' } });
                }

                return React.createElement(
                    'div',
                    { style: styles.headerBar },
                    React.createElement(
                        'div',
                        { style: { flexGrow: 1, alignSelf: 'flex-end' } },
                        React.createElement(LinearProgress, { mode: 'indeterminate' })
                    )
                );
            }

            return React.createElement(
                D2UI,
                null,
                React.createElement(
                    'div',
                    { style: applyUserStyle(currentUser, styles.headerBar) },
                    React.createElement(InnerHeader, null),
                    React.createElement(
                        'div',
                        { className: 'd2-ui-header-bar--CustomArea' },
                        this.props.children
                    ),
                    React.createElement(
                        'div',
                        { style: styles.headerActions },
                        React.createElement(Notifications, { notifications: notifications }),
                        React.createElement(SearchField, null)
                    ),
                    React.createElement(
                        HeaderMenus,
                        null,
                        React.createElement(ProfileMenu, {
                            items: profileItems,
                            rowItemCount: 3,
                            columnItemCount: 3,
                            currentUser: currentUser
                        })
                    )
                )
            );
        }
    }]);

    return HeaderBar;
}(Component);

HeaderBar.childContextTypes = {
    d2: PropTypes.object
};

HeaderBar.propTypes = {
    notifications: PropTypes.object,
    profileItems: PropTypes.array,
    noLoadingIndicator: PropTypes.bool,
    d2: PropTypes.object.isRequired
};

HeaderBar.defaultProps = {
    notifications: {}
};

export default withStateFrom(headerBarStore$, HeaderBar);