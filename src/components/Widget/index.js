import styled from 'styled-components';

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;

  h1, h2, h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 22px;
  background-color: ${({ theme }) => theme.colors.primary};
  *{
    margin:0;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`;

Widget.Loading = styled.div`
height: 250px;
`;

Widget.Topic = styled.a`
  outline: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => `${theme.colors.primary}70`};
  padding: 10px 15px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: .3s;
  display: block;
  
  &:hover,
  &:focus
   {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateX(10px);
  }

  &[data-disabled="true"] {
    cursor: not-allowed;
    opacity: .4;
    background-color: #979797;
  }

  &[rightAnswer="true"] {
    background-color: ${(props) => (props.rightAnswer ? 'green' : 'red')};
  }
`;

Widget.Result = styled.div`
  background-color: ${({ theme }) => `${theme.colors.primary}40`};
  padding: 2px 15px;
  margin-bottom: 8px;
  border-radius: ${({ theme }) => theme.borderRadius};
  display: block;

  &[data-correct="true"] {
    background-color: ${({ theme }) => theme.colors.success};
  }

  & > *:first-child {
    color: ${({ theme }) => `${theme.colors.contrastText}`};
    font-size: 14px;
    margin: 10px auto;
    text-align: center;
    text-transform: uppercase;
    line-height: 1.3;
  }
`;

Widget.Warning = styled.div`
  background-color: transparent;
  margin: 10px auto;
  border-radius: 5px;
  border: none;
  padding: 0px 2px;
  width: 95%;
  p {
    color: ${({ theme }) => theme.colors.wrong};
    font-weight: 500;
    margin: 0;
  }
  [data-disabled="false"] {
    display: none;
  }
`;

export default Widget;
