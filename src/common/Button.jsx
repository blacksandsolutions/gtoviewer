import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.label`
  align-items: center;
  background-color: ${(props) => props.theme.BUTTON_BG};
  border-radius: 4px;
  color: white;
  cursor: pointer;
  color: white;
  font-size: 100%;
  line-height: normal;
  padding: 0.5em 1em;
  text-align: center;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  zoom: 1;

  &:hover {
    opacity: 0.6;
  }
`

function Button({ onClick, label, title }) {
  return (
    <StyledButton onClick={onClick} title={title}>
      {label}
    </StyledButton>
  )
}

export { StyledButton }

export default Button
