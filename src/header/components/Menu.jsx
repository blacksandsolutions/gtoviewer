import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 0 16px;

  @media (min-width: 400px) {
    display: none;
  }
`

// TODO Mobile menu
function Menu({ onClear, onFileLoaded, onExport, showButtons, showCTA }) {
  return <Wrapper></Wrapper>
}

export default Menu
