import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Input = styled.input`
  margin-top: 12px;
  margin-bottom: 12px;
  padding: 12px 32px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.contrastText};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  overflow: hidden;
  h4 {
    font-weight: 700;
    line-height: 1;
    margin: 0;
  }
`;
