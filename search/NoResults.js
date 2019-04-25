'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d = require('d2');

var _d2UiCore = require('@dhis2/d2-ui-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_d.config.i18n.strings.add('no_results_found');

function NoResults(props, _ref) {
    var d2 = _ref.d2;

    return _react2.default.createElement(
        'div',
        null,
        d2.i18n.getTranslation('no_results_found')
    );
}

exports.default = (0, _d2UiCore.addD2Context)(NoResults);