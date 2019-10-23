'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.getSideBarConfig = getSideBarConfig;
exports.getSectionForType = getSectionForType;
exports.getFilterFieldsForType = getFilterFieldsForType;
exports.getFiltersForType = getFiltersForType;
exports.getTableColumnsForType = getTableColumnsForType;
exports.getDefaultFiltersForType = getDefaultFiltersForType;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSideBarConfig() {
    return {
        all: {
            items: []
        },

        categorySection: {
            items: ['categoryOption', 'category', 'categoryCombo', 'categoryOptionCombo', 'categoryOptionGroup', 'categoryOptionGroupSet']
        },

        dataElementSection: {
            items: ['dataElement', 'dataElementGroup', 'dataElementGroupSet']
        },

        dataSetSection: {
            items: ['dataSet']
        },

        indicatorSection: {
            items: ['indicator', 'indicatorType', 'indicatorGroup', 'indicatorGroupSet', 'programIndicator', 'programIndicatorGroup']
        },

        organisationUnitSection: {
            items: ['organisationUnit', 'organisationUnitGroup', 'organisationUnitGroupSet', 'organisationUnitLevel']
        },

        programSection: {
            items: ['program', 'trackedEntityAttribute', 'trackedEntityAttributeGroup', 'relationshipType', 'trackedEntity', 'programRule', 'programRuleVariable']
        },

        validationSection: {
            items: ['validationRule', 'validationRuleGroup', 'validationNotificationTemplate']
        },

        otherSection: {
            items: ['constant', 'attribute', 'optionSet', 'legendSet', 'predictor', 'pushAnalysis', 'externalMapLayer', 'dataApprovalLevel', 'dataApprovalWorkflow']
        }
    };
}

function getSectionForType(modelType) {
    var config = getSideBarConfig();

    return (0, _keys2.default)(config).find(function (section) {
        return config[section] && config[section].items && config[section].items.indexOf(modelType) >= 0;
    });
}

/**
 * Type details:
 *
 * - filters: Add controls for filtering the model list on these properties
 * - columns: Override the default columns in the data table
 */
var typeDetails = {
    category: {
        filters: ['dataDimensionType'],
        columns: ['displayName', 'dataDimensionType', 'publicAccess', 'lastUpdated']
    },
    categoryCombo: {
        filters: ['dataDimensionType'],
        columns: ['displayName', 'dataDimensionType', 'publicAccess', 'lastUpdated']
    },
    categoryOptionGroup: {
        filters: ['dataDimensionType'],
        columns: ['displayName', 'dataDimensionType', 'publicAccess', 'lastUpdated']
    },
    categoryOptionGroupSet: {
        filters: ['dataDimensionType'],
        columns: ['displayName', 'dataDimensionType', 'publicAccess', 'lastUpdated']
    },
    dataElement: {
        filters: ['domainType', 'valueType', 'categoryCombo'],
        columns: ['displayName', 'domainType', 'valueType', 'categoryCombo[displayName]', 'lastUpdated']
    },
    dataElementGroupSet: {
        columns: ['displayName', 'compulsory', 'publicAccess', 'lastUpdated']
    },
    dataSet: {
        filters: ['formType'],
        columns: ['displayName', 'formType', 'periodType', 'publicAccess', 'lastUpdated']
    },
    indicator: {
        filters: ['indicatorType'],
        columns: ['displayName', 'indicatorType[displayName]', 'publicAccess', 'lastUpdated']
    },
    indicatorType: {
        columns: ['displayName', 'factor', 'publicAccess', 'lastUpdated']
    },
    indicatorGroupSet: {
        columns: ['displayName', 'compulsory', 'publicAccess', 'lastUpdated']
    },
    organisationUnit: {
        columns: ['displayName', 'level', 'lastUpdated']
    },
    organisationUnitGroupSet: {
        columns: ['displayName', 'compulsory', 'dataDimension', 'publicAccess', 'lastUpdated']
    },
    trackedEntityAttribute: {
        filters: ['valueType', 'aggregationType'],
        columns: ['displayName', 'valueType', 'aggregationType', 'unique', 'confidential', 'lastUpdated']
    },
    program: {
        columns: ['displayName', 'publicAccess', 'lastUpdated'],
        defaultFilters: [['programType', 'WITHOUT_REGISTRATION']]
    },
    programIndicator: {
        filters: ['program'],
        columns: ['displayName', 'program[displayName]', 'lastUpdated']
    },
    programRule: {
        filters: ['program'],
        columns: ['displayName', 'program[displayName]', 'lastUpdated']
    },
    programRuleVariable: {
        filters: ['program', 'programRuleVariableSourceType'],
        columns: ['displayName', 'program[displayName]', 'programRuleVariableSourceType', 'lastUpdated']
    },
    validationRule: {
        columns: ['displayName', 'importance', 'periodType', 'publicAccess', 'lastUpdated']
    },
    constant: {
        columns: ['displayName', 'value', 'lastUpdated']
    },
    attribute: {
        columns: ['displayName', 'valueType', 'mandatory', 'unique', 'publicAccess', 'lastUpdated']
    },
    optionSet: {
        columns: ['displayName', 'valueType', 'lastUpdated']
    },
    predictor: {
        columns: ['displayName', 'output[displayName]', 'periodType', 'lastUpdated']
    },
    pushAnalysis: {
        columns: ['displayName', 'dashboard[displayName]', 'lastUpdated']
    },
    externalMapLayer: {
        columns: ['displayName', 'mapLayerPosition', 'mapService', 'lastUpdated']
    },
    dataApprovalLevel: {
        columns: ['displayName', 'level', 'orgUnitLevel', 'categoryOptionGroupSet[displayName]', 'publicAccess', 'lastUpdated']
    },
    dataApprovalWorkflow: {
        columns: ['displayName', 'periodType', 'publicAccess', 'lastUpdated']
    }
};

function getFilterFieldsForType(modelType) {
    if (typeDetails.hasOwnProperty(modelType) && typeDetails[modelType].hasOwnProperty('filters')) {
        return typeDetails[modelType].filters;
    }

    return [];
}

function getFiltersForType(modelType) {
    if (typeDetails.hasOwnProperty(modelType) && typeDetails[modelType].hasOwnProperty('filters')) {
        return typeDetails[modelType].filters.reduce(function (f, filters) {
            f[filters] = null;
            return f;
        }, {});
    }

    return [];
}

function getTableColumnsForType(modelType) {
    var preservePropNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (typeDetails.hasOwnProperty(modelType) && typeDetails[modelType].hasOwnProperty('columns')) {
        return typeDetails[modelType].columns.map(function (col) {
            return preservePropNames ? col : col.replace(/(\w*)\[(\w*)]/, '$1___$2');
        });
    }

    // Default columns:
    return ['displayName', 'publicAccess', 'lastUpdated'];
}

function getDefaultFiltersForType(modelType) {
    if (typeDetails.hasOwnProperty(modelType) && typeDetails[modelType].hasOwnProperty('defaultFilters') && Array.isArray(typeDetails[modelType].defaultFilters)) {
        return typeDetails[modelType].defaultFilters;
    }

    return [];
}

exports.default = {
    getSideBarConfig: getSideBarConfig
};