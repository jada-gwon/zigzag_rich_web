import React from 'react';
import styled from 'styled-components';

const StyledDate = styled.div`
  width: 18px;
  height: 18px;
  line-height: 18px;
  background-color: #5b36ac;
  color: #fff;
  text-align: center;
  font-size: 10px;
  font-weight: bold;
  border-radius: 10px;
  float: right;
  margin-top: 6px;
`;

const Badge: React.FC = ({ children }) => <StyledDate>{children}</StyledDate>;

export default Badge;
