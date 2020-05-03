import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
  padding: 16px;
`

export default ({ children, style }) => {
  return <Box style={style}>{children}</Box>
}
