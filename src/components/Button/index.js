import PropTypes from 'prop-types';
import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.contrastText};
  border-radius: ${({ theme }) => theme.colors.borderRadius};
  border: 0;
  padding: 12px 16px;
  width: 100%;
  text-transform: uppercase;
  line-height: 1;
  font-size: 14px;
  font-weight: bold;
  outline:0;
  overflow: hidden;
  cursor: pointer;
  transition: .3s;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.success};
  }
  &:disabled {
    background-color: #979797;
    cursor: not-allowed;
  }
`;
Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
