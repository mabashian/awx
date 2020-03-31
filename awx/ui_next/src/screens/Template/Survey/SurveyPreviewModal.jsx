import React from 'react';
import { withI18n } from '@lingui/react';
import styled from 'styled-components';
import { t } from '@lingui/macro';
import { PasswordField } from '@components/FormField';
import { Formik } from 'formik';

import {
  Chip as _Chip,
  Form,
  FormGroup,
  Modal,
  TextInput,
  TextArea,
  InputGroup,
  InputGroupText as _InputGroupText,
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
  const initialValues = {};
  questions.forEach(q => (initialValues[q.variable] = q.default));

  return (
    <Modal
      title={i18n._(t`Survey Preview`)}
      isOpen={isPreviewModalOpen}
      onClose={() => onToggleModalOpen(false)}
      isSmall
    >
      <Formik initialValues={initialValues}>
        {() => (
          <Form>
            {questions.map(q => (
              <div key={q.variable}>
                {['text', 'integer', 'float'].includes(q.type) && (
                  <FormGroup
                    fieldId={`survey-preview-text-${q.variable}`}
                    label={q.question_name}
                  >
                    <TextInput
                      id={`survey-preview-text-${q.variable}`}
                      value={q.default}
                      isDisabled
                      aria-label={i18n._(t`Text`)}
                    />
                  </FormGroup>
                )}
                {['textarea'].includes(q.type) && (
                  <FormGroup
                    fieldId={`survey-preview-textArea-${q.variable}`}
                    label={q.question_name}
                  >
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
                  <PasswordField
                    id={`survey-preview-password-${q.variable}`}
                    label={q.question_name}
                    name={q.variable}
                    isDisabled
                  />
                )}
                {['multiplechoice'].includes(q.type) && (
                  <FormGroup
                    fieldId={`survey-preview-multipleChoice-${q.variable}`}
                    label={q.question_name}
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
                  <FormGroup
                    fieldId={`survey-preview-multiSelect-${q.variable}`}
                    label={q.question_name}
                  >
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
        )}
      </Formik>
    </Modal>
  );
}
export default withI18n()(SurveyPreviewModal);
