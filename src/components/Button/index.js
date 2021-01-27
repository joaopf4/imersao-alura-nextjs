import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Button = styled.button`
  margin-top: 12px;
  margin-bottom: 12px;
  padding: 12px 32px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.contrastText};
  border-radius: 4px;
  overflow: hidden;
  h4 {
    font-weight: 700;
    line-height: 1;
    margin: 0;
  }
  :hover{
    background-color: ${({ theme }) => theme.colors.secondary};
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
  }
  :active{
    background-color: ${({ theme }) => theme.colors.success};
  }
`;
