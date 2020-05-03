import React from 'react'
import styled from 'styled-components'

const A = styled.a`
  background: none;
  border-bottom: 3px solid ${(props) => props.theme.LINK_COLOUR};
  color: inherit;
  text-decoration: none;
  &:hover {
    background: ${(props) => props.theme.LINK_COLOUR};
    border-bottom: none;
    cursor: pointer;
    padding: 2px;
  }
`

function Link({ children, href }) {
  return (
    <A href={href} target="_blank">
      {children}
    </A>
  )
}

export default Link
