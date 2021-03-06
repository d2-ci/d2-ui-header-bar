'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var categoryOrder = exports.categoryOrder = ['general', 'server', 'appearance', 'email', 'messaging', 'access', 'calendar', 'import', 'sync', 'monitoring', 'oauth2'];

var categories = exports.categories = {
    general: {
        label: 'general',
        icon: 'settings',
        pageLabel: 'general_settings',
        settings: ['keyAnalyticsMaxLimit', 'infrastructuralIndicators', 'infrastructuralDataElements', 'infrastructuralPeriodType', 'keyAnalysisRelativePeriod', 'feedbackRecipients', 'offlineOrganisationUnitLevel', 'factorDeviation', 'phoneNumberAreaCode', 'multiOrganisationUnitForms', 'keyAcceptanceRequiredForApproval']
    },
    analytics: {
        label: 'analytics',
        icon: 'equalizer',
        pageLabel: 'analytics_settings',
        settings: ['keyAnalysisRelativePeriod', 'keyCacheability', 'keyCacheStrategy', 'keyIgnoreAnalyticsApprovalYearThreshold', 'keyCacheAnalyticsDataYearThreshold', 'keyRespectMetaDataStartEndDatesInAnalyticsTableExport', 'keyAnalyticsMaintenanceMode']
    },
    server: {
        label: 'server',
        icon: 'business',
        pageLabel: 'server_settings',
        settings: ['keyDatabaseServerCpus', 'keySystemNotificationsEmail', 'keyInstanceBaseUrl', 'googleAnalyticsUA']
    },
    appearance: {
        label: 'appearance',
        icon: 'looks',
        pageLabel: 'appearance_settings',
        settings: ['localizedText', 'keyStyle', 'startModule', 'helpPageLink', 'keyFlag', 'keyUiLocale', 'keyDbLocale', 'keyAnalysisDisplayProperty', 'keyAnalysisDigitGroupSeparator', 'keyRequireAddToView', 'keyUseCustomLogoFront', 'keyUseCustomLogoBanner']
    },
    email: {
        label: 'email',
        icon: 'email',
        pageLabel: 'email_settings',
        settings: ['keyEmailHostName', 'keyEmailPort', 'keyEmailUsername', 'keyEmailPassword', 'keyEmailTls', 'keyEmailSender', 'emailTestButton']
    },
    messaging: {
        label: 'messaging',
        icon: 'message',
        pageLabel: 'messaging_settings',
        settings: ['keyMessageEmailNotification', 'keyMessageSmsNotification']
    },
    access: {
        label: 'access',
        icon: 'lock_open',
        pageLabel: 'access_settings',
        settings: ['selfRegistrationRole', 'selfRegistrationOrgUnit', 'keySelfRegistrationNoRecaptcha', 'keyAccountRecovery', 'keyLockMultipleFailedLogins', 'keyCanGrantOwnUserAuthorityGroups', 'keyAllowObjectAssignment', 'credentialsExpires', 'credentialsExpiryAlert', 'minPasswordLength', 'keyOpenIdProvider', 'keyOpenIdProviderLabel', 'corsWhitelist', 'keyMapzenSearchApiKey', 'keyGoogleMapsApiKey']
    },
    calendar: {
        label: 'calendar',
        icon: 'date_range',
        pageLabel: 'calendar_settings',
        settings: ['keyCalendar', 'keyDateFormat']
    },
    import: {
        label: 'import',
        icon: 'system_update_alt',
        pageLabel: 'import_settings',
        settings: ['keyDataImportStrictPeriods', 'keyDataImportStrictCategoryOptionCombos', 'keyDataImportStrictOrganisationUnits', 'keyDataImportStrictAttributeOptionCombos', 'keyDataImportRequireCategoryOptionCombo', 'keyDataImportRequireAttributeOptionCombo']
    },
    sync: {
        label: 'synchronization',
        icon: 'sync',
        pageLabel: 'synchronization_settings',
        settings: ['keyRemoteInstanceUrl', 'keyRemoteInstanceUsername', 'keyRemoteInstancePassword', 'keyMetadataDataVersioning']
    },
    monitoring: {
        label: 'system_monitoring',
        icon: 'dns',
        pageLabel: 'system_monitoring_settings',
        settings: ['keySystemMonitoringUrl', 'keySystemMonitoringUsername', 'keySystemMonitoringPassword']
    },
    oauth2: {
        label: 'oauth2_clients',
        icon: 'vpn_lock',
        pageLabel: 'oauth2_clients',
        authority: 'F_OAUTH2_CLIENT_MANAGE',
        settings: ['oauth2clients']
    }
};