import React from 'react';
import { config } from 'd2';
import { addD2Context } from '@dhis2/d2-ui-core';

config.i18n.strings.add('no_results_found');

function NoResults(props, _ref) {
    var d2 = _ref.d2;

    return React.createElement(
        'div',
        null,
        d2.i18n.getTranslation('no_results_found')
    );
}

export default addD2Context(NoResults);