import React, { useState } from 'react';
import { t } from '@lingui/macro';
import CredentialsStep from './CredentialsStep';
import StepName from './StepName';

const STEP_ID = 'credentials';

export default function useCredentialsStep(
  config,
  resource,
  visitedSteps,
  i18n
) {
  const [stepErrors, setStepErrors] = useState({});

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

  const hasErrors = visitedSteps[STEP_ID] && stepErrors.credential_passwords;

  return {
    step: getStep(config, hasErrors, i18n),
    initialValues: getInitialValues(config, resource),
    validate,
    isReady: true,
    contentError: null,
    formError: null,
    setTouched: setFieldsTouched => {
      setFieldsTouched({
        credentials: true,
      });
    },
  };
}

function getStep(config, hasErrors, i18n) {
  if (
    !config.ask_credential_on_launch &&
    !(config?.passwords_needed_to_start.length > 0)
  ) {
    return null;
  }
  return {
    id: STEP_ID,
    name: <StepName hasErrors={hasErrors}>{i18n._(t`Credentials`)}</StepName>,
    component: <CredentialsStep config={config} i18n={i18n} />,
  };
}

function getInitialValues(config, resource) {
  if (!config.ask_credential_on_launch) {
    return {};
  }

  const credentials = (config?.defaults?.credentials || []).map(
    defaultCredential =>
      Object.assign(
        defaultCredential,
        (resource?.summary_fields?.credentials || []).find(
          summaryFieldCredential =>
            defaultCredential.id === summaryFieldCredential.id
        )
      )
  );

  return {
    credentials,
  };
}
