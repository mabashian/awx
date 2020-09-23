import 'styled-components/macro';
import React from 'react';
import { withI18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { useField } from 'formik';
import { Form } from '@patternfly/react-core';
import useRequiredPasswords from '../useRequiredPasswords';
import { PasswordField } from '../../FormField';
import { required } from '../../../util/validators';

function CredentialPasswordsStep({ config, i18n }) {
  const [field] = useField({
    name: 'credentials',
    validate: required(null, i18n),
  });

  const { requiredSSHPasswords, requiredVaultPasswords } = useRequiredPasswords(
    config,
    field.value
  );

  return (
    <Form>
      {requiredSSHPasswords.includes('ssh_password') && (
        <PasswordField
          id="launch-prompt-ssh_password"
          label={i18n._(t`SSH password`)}
          name="credential_passwords.ssh_password"
          validate={required(i18n._(t`This field must not be blank`), i18n)}
          isRequired
        />
      )}
      {requiredSSHPasswords.includes('ssh_key_unlock') && (
        <PasswordField
          id="launch-prompt-ssh_key_unlock"
          label={i18n._(t`Private key passphrase`)}
          name="credential_passwords.ssh_key_unlock"
          validate={required(i18n._(t`This field must not be blank`), i18n)}
          isRequired
        />
      )}
      {requiredSSHPasswords.includes('become_password') && (
        <PasswordField
          id="launch-prompt-become_password"
          label={i18n._(t`Privilege escalation password`)}
          name="credential_passwords.become_password"
          validate={required(i18n._(t`This field must not be blank`), i18n)}
          isRequired
        />
      )}
      {requiredVaultPasswords.map(vaultIdentifier => {
        return (
          <PasswordField
            key={vaultIdentifier}
            id={`launch-prompt-vault-${vaultIdentifier}`}
            label={i18n._(t`Vault password - ${vaultIdentifier}`)}
            name={`credential_passwords.['vault_password.${vaultIdentifier}']`}
            validate={required(i18n._(t`This field must not be blank`), i18n)}
            isRequired
          />
        );
      })}
    </Form>
  );
}

export default withI18n()(CredentialPasswordsStep);
