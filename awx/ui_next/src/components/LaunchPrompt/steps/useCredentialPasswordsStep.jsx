import React, { useState } from 'react';
import { t } from '@lingui/macro';
import CredentialPasswordsStep from './CredentialPasswordsStep';
import StepName from './StepName';

const STEP_ID = 'credential_passwords';

export default function useCredentialPasswordsStep(
  config,
  resource,
  visitedSteps,
  i18n,
  formRef
) {
  const [stepErrors, setStepErrors] = useState({});

  const hasErrors = visitedSteps[STEP_ID] && stepErrors.credential_passwords;

  const validate = values => {
    const errors = {};
    if (values.credential_passwords) {
      Object.keys(values.credential_passwords).forEach(password => {
        if (
          !values.credential_passwords?.[password] ||
          values.credential_passwords?.[password] === ''
        ) {
          if (!errors.credential_passwords) {
            errors.credential_passwords = {};
          }
          errors.credential_passwords[password] = i18n._(
            t`This field must not be blank`
          );
        }
      });
    }
    setStepErrors(errors);
    return errors;
  };

  return {
    step: getStep(config, hasErrors, i18n, formRef),
    initialValues: {},
    validate,
    isReady: true,
    contentError: null,
    formError: null,
    setTouched: () => {},
  };
}

function getStep(config, hasErrors, i18n, formRef) {
  // this has the values from before the most recent form change
  console.log(formRef.current);
  if (
    !config.ask_credential_on_launch &&
    !(config?.passwords_needed_to_start.length > 0)
  ) {
    return null;
  }
  return {
    id: STEP_ID,
    name: (
      <StepName hasErrors={hasErrors}>
        {i18n._(t`Credential Passwords`)}
      </StepName>
    ),
    component: <CredentialPasswordsStep config={config} i18n={i18n} />,
  };
}
