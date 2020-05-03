import React from 'react'
import styled from 'styled-components'

const Position = styled.div`
  align-items: center;
  color: ${(props) => props.theme.LINK_COLOUR}
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  right: 2%;
  top: 25px;
`

const Img = styled.img`
  height: 50px;
  margin-bottom: 20px;
  width: 50px;
`

function CallToAction({ text }) {
  return (
    <Position>
      <Img src={'./arrow.png'} />
      {text}
    </Position>
  )
}

export default CallToAction
