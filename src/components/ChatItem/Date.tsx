import React from 'react';
import styled from 'styled-components';
import { format, isToday, endOfToday } from 'date-fns';
import localeKo from 'date-fns/locale/ko';

const StyledDate = styled.div`
  font-size: 11px;
  color: #363a42;
`;

function getDateString(date: number): string {
  if (isToday(date)) {
    return format(date, 'HH:mm');
  }
  if ((endOfToday().getTime() - date) / (1000 * 60 * 60 * 24) < 7) {
    return format(date, 'cccc', { locale: localeKo });
  }
  return format(date, 'M월d일');
}

const Date: React.FC<{ children: number }> = ({ children }) => (
  <StyledDate>{getDateString(children)}</StyledDate>
);

export default Date;
