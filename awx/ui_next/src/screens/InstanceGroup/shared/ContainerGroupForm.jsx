import React from 'react';
import { func, shape } from 'prop-types';
import { Formik, useField } from 'formik';
import { withI18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { Form, FormGroup } from '@patternfly/react-core';
import { jsonToYaml } from '../../../util/yaml';

import FormField, {
  FieldTooltip,
  FormSubmitError,
  CheckboxField,
} from '../../../components/FormField';
import FormActionGroup from '../../../components/FormActionGroup';
import { required } from '../../../util/validators';
import {
  FormColumnLayout,
  FormFullWidthLayout,
  FormCheckboxLayout,
  SubFormLayout,
} from '../../../components/FormLayout';
import CredentialLookup from '../../../components/Lookup/CredentialLookup';
import { VariablesField } from '../../../components/CodeMirrorInput';

function ContainerGroupFormFields({ i18n }) {
  const [credentialField, credentialMeta, credentialHelpers] = useField(
    'credential'
  );
  const [overrideField] = useField('override');

  return (
    <>
      <FormField
        name="name"
        id="container-group-name"
        label={i18n._(t`Name`)}
        type="text"
        validate={required(null, i18n)}
        isRequired
      />
      <CredentialLookup
        label={i18n._(t`Credential`)}
        credentialTypeKind="kubernetes"
        helperTextInvalid={credentialMeta.error}
        isValid={!credentialMeta.touched || !credentialMeta.error}
        onBlur={() => credentialHelpers.setTouched()}
        onChange={value => {
          credentialHelpers.setValue(value);
        }}
        value={credentialField.value}
        isRequired
      />

      <FormGroup
        fieldId="container-groups-option-checkbox"
        label={i18n._(t`Options`)}
      >
        <FormCheckboxLayout>
          <CheckboxField
            name="override"
            aria-label={i18n._(t`Customize pod specification`)}
            label={
              <span>
                {i18n._(t`Customize pod spec`)}
                &nbsp;
                <FieldTooltip content={i18n._(t`Customize pod spec...`)} />
              </span>
            }
            id="container-groups-option-checkbox"
          />
        </FormCheckboxLayout>
      </FormGroup>

      {overrideField.value && (
        <SubFormLayout>
          <FormFullWidthLayout>
            <VariablesField
              tooltip={i18n._(
                t`Field for passing a custom Kubernetes or OpenShift Pod specification.`
              )}
              id="custom-pod-spec"
              name="pod_spec_override"
              label={i18n._(t`Custom pod spec`)}
            />
          </FormFullWidthLayout>
        </SubFormLayout>
      )}
    </>
  );
}

function ContainerGroupForm({
  initialPodSpec,
  instanceGroup,
  onSubmit,
  onCancel,
  submitError,
  ...rest
}) {
  let isChecked = Boolean(instanceGroup.pod_spec_override) || false;

  const initialValues = {
    name: instanceGroup.name || '',
    credential: instanceGroup?.summary_fields?.credential,
    pod_spec_override: isChecked
      ? instanceGroup.pod_spec_override
      : jsonToYaml(JSON.stringify(initialPodSpec)),
    override: isChecked,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        onSubmit(values);
      }}
    >
      {formik => (
        <Form autoComplete="off" onSubmit={formik.handleSubmit}>
          <FormColumnLayout>
            <ContainerGroupFormFields {...rest} />
            {submitError && <FormSubmitError error={submitError} />}
            <FormActionGroup
              onCancel={onCancel}
              onSubmit={formik.handleSubmit}
            />
          </FormColumnLayout>
        </Form>
      )}
    </Formik>
  );
}

ContainerGroupForm.propTypes = {
  instanceGroup: shape({}),
  onCancel: func.isRequired,
  onSubmit: func.isRequired,
  submitError: shape({}),
};

ContainerGroupForm.defaultProps = {
  instanceGroup: {},
  submitError: null,
};

export default withI18n()(ContainerGroupForm);
