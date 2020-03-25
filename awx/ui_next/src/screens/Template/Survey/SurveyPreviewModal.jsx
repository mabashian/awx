import React, { useState } from 'react';
import { withI18n } from '@lingui/react';
import styled from 'styled-components';
import { t } from '@lingui/macro';

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
  return (
    <Modal
      title={i18n._(t`Survey Preview`)}
      isOpen={isPreviewModalOpen}
      onClose={() => onToggleModalOpen(false)}
      isSmall
    >
      <Form>
        {questions.map(q => (
          <div key={q.variable}>
            <strong>{q.question_name}</strong>
            {['text', 'integer', 'float'].includes(q.type) && (
              <FormGroup fieldId="text">
                <TextInput
                  type="text"
                  value={q.default}
                  isDisabled
                  aria-label={i18n._(t`Text`)}
                />
              </FormGroup>
            )}
            {['textarea'].includes(q.type) && (
              <FormGroup fieldId="text area">
                <TextArea
                  value={q.default}
                  aria-label={i18n._(t`Text Area`)}
                  disabled
                />
              </FormGroup>
            )}
            {['password'].includes(q.type) && (
              <FormGroup fieldId="password">
                <InputGroup>
                  <Button onClick={() => setIsPassword(!isPassword)}>
                    {isPassword ? 'Show' : 'Hide'}
                  </Button>
                  <TextInput
                    aria-label={i18n._(t`Password`)}
                    type={isPassword ? 'password' : 'text'}
                    value={q.default}
                    isDisabled
                  />
                </InputGroup>
              </FormGroup>
            )}
            {['multiplechoice'].includes(q.type) && (
              <FormGroup fieldId="multiple choice">
                <Select
                  isDisabled
                  placeholderText={q.default}
                  onToggle={() => {}}
                />
              </FormGroup>
            )}
            {['multiselect'].includes(q.type) && (
              <FormGroup fieldId="multiselect">
                <InputGroup aria-label={i18n._(t`Multi-Select`)}>
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
    </Modal>
  );
}
export default withI18n()(SurveyPreviewModal);
