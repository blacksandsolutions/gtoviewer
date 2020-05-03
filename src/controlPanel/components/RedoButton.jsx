import React from 'react'
import styled from 'styled-components'

const Button = styled.div`
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  flex-direction: column;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  padding: 8px 16px;

  &:hover {
    opacity: 0.75;
  }
`

const Img = styled.img``

function RedoButton({ disabled, onClick }) {
  const handleClick = () => {
    if (!disabled) {
      onClick()
    }
  }
  return (
    <Button disabled={disabled} onClick={handleClick}>
      <Img src={'./icons8-redo-64.png'} />
      Redo
    </Button>
  )
}

export default RedoButton
