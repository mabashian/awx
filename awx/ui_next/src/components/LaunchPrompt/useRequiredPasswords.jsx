import { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';

export default function useRequiredPasswords(config, credentials) {
  const { values, resetForm } = useFormikContext();
  const [requiredSSHPasswords, setRequiredSSHPasswords] = useState([]);
  const [requiredVaultPasswords, setRequiredVaultPasswords] = useState([]);

  useEffect(() => {
    const newRequiredSSHPasswords = [];
    const newRequiredVaultPasswords = [];
    const credentialPasswordValues = {};
    if (config?.ask_credential_on_launch) {
      credentials.forEach(cred => {
        const vaultId = cred?.vault_id || cred?.inputs?.vault_id;
        const passwords_needed = cred?.passwords_needed || [];
        if (
          cred?.inputs?.password === 'ASK' ||
          passwords_needed.includes('ssh_password')
        ) {
          newRequiredSSHPasswords.push('ssh_password');
          credentialPasswordValues.ssh_password =
            values?.credential_passwords?.ssh_password || '';
        }
        if (
          cred?.inputs?.become_password === 'ASK' ||
          passwords_needed.includes('become_password')
        ) {
          newRequiredSSHPasswords.push('become_password');
          credentialPasswordValues.become_password =
            values?.credential_passwords?.become_password || '';
        }
        if (
          (cred?.inputs?.ssh_key_unlock === 'ASK' &&
            cred?.inputs?.ssh_key_data === '$encrypted$') ||
          passwords_needed.includes('ssh_key_unlock')
        ) {
          newRequiredSSHPasswords.push('ssh_key_unlock');
          credentialPasswordValues.ssh_key_unlock =
            values?.credential_passwords?.ssh_key_unlock || '';
        }
        if (
          cred?.inputs?.vault_password === 'ASK' ||
          passwords_needed.includes(`vault_password.${vaultId}`)
        ) {
          newRequiredVaultPasswords.push(vaultId);
          credentialPasswordValues[`vault_password.${vaultId}`] =
            values?.credential_passwords?.[`vault_password.${vaultId}`] || '';
        }
      });
    } else {
      config.passwords_needed_to_start.forEach(password => {
        if (password === 'ssh_password') {
          newRequiredSSHPasswords.push('ssh_password');
          credentialPasswordValues.ssh_password =
            values?.credential_passwords?.ssh_password || '';
        }
        if (password === 'become_password') {
          newRequiredSSHPasswords.push('become_password');
          credentialPasswordValues.become_password =
            values?.credential_passwords?.become_password || '';
        }
        if (password === 'ssh_key_unlock') {
          newRequiredSSHPasswords.push('ssh_key_unlock');
          credentialPasswordValues.ssh_key_unlock =
            values?.credential_passwords?.ssh_key_unlock || '';
        }
        if (password.startsWith('vault_password')) {
          const vaultId = password.split(/\.(.+)/)[1];
          newRequiredVaultPasswords.push(vaultId);
          credentialPasswordValues[`vault_password.${vaultId}`] =
            values?.credential_passwords?.[`vault_password.${vaultId}`] || '';
        }
      });
    }

    setRequiredSSHPasswords(newRequiredSSHPasswords);
    setRequiredVaultPasswords(newRequiredVaultPasswords);

    resetForm({
      values: {
        ...values,
        credential_passwords: credentialPasswordValues,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, credentials, resetForm]);

  return {
    requiredSSHPasswords,
    requiredVaultPasswords,
  };
}
