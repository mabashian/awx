/*************************************************
 * Copyright (c) 2016 Ansible, Inc.
 *
 * All Rights Reserved
 *************************************************/

export default ['i18n', function(i18n) {
    return {
        name: 'configuration_github_enterprise_template',
        showActions: true,
        showHeader: false,

        fields: {
            SOCIAL_AUTH_GITHUB_ENTERPRISE_CALLBACK_URL: {
                type: 'text',
                reset: 'SOCIAL_AUTH_GITHUB_ENTERPRISE_CALLBACK_URL'
            },
            SOCIAL_AUTH_GITHUB_ENTERPRISE_URL: {
                type: 'text',
                reset: 'SOCIAL_AUTH_GITHUB_ENTERPRISE_URL'
            },
            SOCIAL_AUTH_GITHUB_ENTERPRISE_API_URL: {
                type: 'text',
                reset: 'SOCIAL_AUTH_GITHUB_ENTERPRISE_API_URL'
            },
            SOCIAL_AUTH_GITHUB_ENTERPRISE_KEY: {
                type: 'text',
                reset: 'SOCIAL_AUTH_GITHUB_ENTERPRISE_KEY'
            },
            SOCIAL_AUTH_GITHUB_ENTERPRISE_SECRET: {
                type: 'sensitive',
                hasShowInputButton: true,
                reset: 'SOCIAL_AUTH_GITHUB_ENTERPRISE_SECRET'
            },
            SOCIAL_AUTH_GITHUB_ENTERPRISE_ORGANIZATION_MAP: {
                type: 'textarea',
                reset: 'SOCIAL_AUTH_GITHUB_ENTERPRISE_ORGANIZATION_MAP',
                rows: 6,
                codeMirror: true,
                class: 'Form-textAreaLabel Form-formGroup--fullWidth'
            },
            SOCIAL_AUTH_GITHUB_ENTERPRISE_TEAM_MAP: {
                type: 'textarea',
                reset: 'SOCIAL_AUTH_GITHUB_ENTERPRISE_TEAM_MAP',
                rows: 6,
                codeMirror: true,
                class: 'Form-textAreaLabel Form-formGroup--fullWidth'
            }
        },

        buttons: {
            reset: {
                ngShow: '!user_is_system_auditor',
                ngClick: 'vm.resetAllConfirm()',
                label: i18n._('Revert all to default'),
                class: 'Form-resetAll'
            },
            cancel: {
                ngClick: 'vm.formCancel()',
            },
            save: {
                ngClick: 'vm.formSave()',
                ngDisabled: true
            }
        }
    };
}
];
