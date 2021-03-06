import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const InputBase = styled.input`
  margin-top: 12px;
  padding: 15px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.contrastText};
  font-weight: 700;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  margin-bottom: 25px;
`;
export default function Input({ onChange, placeholder, ...props }) {
  return (
    <div>
      <InputBase
        onChange={onChange}
        placeholder={placeholder}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </div>
  );
}

Input.defaultProps = {
  value: '',
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};
