import React, { useState } from 'react';
import styled from 'styled-components';
import IconSend from '../assets/icon-send.svg';

const StyledForm = styled.div`
  display: flex;
  padding: 0 16px;
`;

const StyledTextarea = styled.textarea`
  resize: none;
  padding: 16px;
  border-radius: 25px;
  line-height: 17px;
  font-size: 14px;
  height: 50px;
  flex: 1;
  margin-right: 12px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border: none;
  height: 50px;
  box-sizing: border-box;

  :focus {
    outline: none;
  }
`;

const StyledButton = styled.button`
  width: 50px;
  border-radius: 25px;
  border: none;
  background-color: #5b36ac;
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

const SendMessageForm: React.FC = () => {
  const [value, setValue] = useState('');
  return (
    // TODO: onSubmit
    <form onSubmit={(e) => e.preventDefault()}>
      <StyledForm>
        <StyledTextarea
          placeholder="메시지를 입력하세요.."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <StyledButton type="submit">
          <IconSend />
        </StyledButton>
      </StyledForm>
    </form>
  );
};

export default SendMessageForm;
