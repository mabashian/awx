import React, { useState } from 'react';
import { withI18n } from '@lingui/react';
import styled from 'styled-components';
import { t } from '@lingui/macro';
import { PasswordField } from '@components/FormField';
import { Formik, useField, Field } from 'formik';
import { FormColumnLayout } from '@components/FormLayout';

import {
  Chip as _Chip,
  Form,
  FormGroup,
  Modal,
  TextInput,
  TextArea,
  InputGroup,
  InputGroupText as _InputGroupText,
  Button,
  Select,
} from '@patternfly/react-core';

const InputGroupText = styled(_InputGroupText)`
  width: 100%;
`;
const Chip = styled(_Chip)`
  margin-right: 5px;
`;
function SurveyPreviewModal({
  questions,
  isPreviewModalOpen,
  onToggleModalOpen,
  i18n,
}) {
  const [isPassword, setIsPassword] = useState(true);
  // const [passwordField] = useField('password');
  // console.log(passwordField);
  return (
    <Modal
      title={i18n._(t`Survey Preview`)}
      isOpen={isPreviewModalOpen}
      onClose={() => onToggleModalOpen(false)}
      isSmall
    >
      {/* <Formik
        onSumbit={() => {}}
        initialValues={{
          password: questions.filter(q =>
            q.type === 'password' ? q.default : null
          ),
        }}
      >
        {formik => ( */}
      <Form // autoComplete="off" onSubmit={formik.handleSubmit}>
      >
        {questions.map(q => (
          <div key={q.variable}>
            <strong>{q.question_name}</strong>
            {['text', 'integer', 'float'].includes(q.type) && (
              <FormGroup fieldId={`survey-preview-text-${q.variable}`}>
                <TextInput
                  id={`survey-preview-text-${q.variable}`}
                  value={q.default}
                  isDisabled
                  aria-label={i18n._(t`Text`)}
                />
              </FormGroup>
            )}
            {['textarea'].includes(q.type) && (
              <FormGroup fieldId={`survey-preview-textArea-${q.variable}`}>
                <TextArea
                  id={`survey-preview-textArea-${q.variable}`}
                  type={`survey-preview-textArea-${q.variable}`}
                  value={q.default}
                  aria-label={i18n._(t`Text Area`)}
                  disabled
                />
              </FormGroup>
            )}
            {['password'].includes(q.type) && (
              // <FormGroup fieldId={`survey-preview-password-${q.variable}`}>
              // formik.values.password.map((pwdField, index) => (
              //   <Field name="password">
              //     {({ field }) => (
              //       console.log(field, 'field'),
              //       (
              //         <PasswordField
              //           id={`survey-preview-password-${q.variable}`}
              //           name="password"
              //           label=""
              //           validate={null}
              //           value={field.value[index]}
              //         />
              //       )
              //     )}
              //   </Field>
              // ))
              // </FormGroup>
              <FormGroup fieldId={`survey-preview-password-${q.variable}`}>
                <InputGroup>
                  <Button onClick={() => setIsPassword(!isPassword)}>
                    {isPassword ? 'Show' : 'Hide'}
                  </Button>
                  <TextInput
                    id={`survey-preview-password-${q.variable}`}
                    aria-label={i18n._(t`Password`)}
                    type={isPassword ? 'password' : 'text'}
                    value={
                      !isPassword
                        ? i18n._(t`encrypted`).toUpperCase()
                        : q.default
                    }
                    isDisabled
                  />
                </InputGroup>
              </FormGroup>
            )}
            {['multiplechoice'].includes(q.type) && (
              <FormGroup
                fieldId={`survey-preview-multipleChoice-${q.variable}`}
              >
                <Select
                  id={`survey-preview-multipleChoice-${q.variable}`}
                  isDisabled
                  placeholderText={q.default}
                  onToggle={() => {}}
                />
              </FormGroup>
            )}
            {['multiselect'].includes(q.type) && (
              <FormGroup fieldId={`survey-preview-multiSelect-${q.variable}`}>
                <InputGroup
                  aria-label={i18n._(t`Multi-Select`)}
                  id={`survey-preview-multiSelect-${q.variable}`}
                >
                  <InputGroupText>
                    {q.default.split('\n').map(chip => (
                      <Chip key={chip} isReadOnly>
                        {chip}
                      </Chip>
                    ))}
                  </InputGroupText>
                </InputGroup>
              </FormGroup>
            )}
          </div>
        ))}
      </Form>
      {/* )}
      </Formik> */}
    </Modal>
  );
}
export default withI18n()(SurveyPreviewModal);
