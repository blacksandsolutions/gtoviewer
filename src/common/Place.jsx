import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'

import Box from './Box'

const Title = styled.b`
  color: ${(props) => props.theme.BUTTON_BG};
  margin-bottom: 4px;
`
const DateTimeLabel = styled.div`
  font-size: 0.8em;
  font-weight: bold;
`
const Address = styled.div`
  font-size: 0.8em;
`
const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default ({ place, showAddress = false }) => {
  const date = format(new Date(Number(place.timestampMs)), 'd MMM yyyy')
  const time = format(new Date(Number(place.timestampMs)), 'HH:mm')

  return (
    <Box style={{ flex: 1 }}>
      <Wrapper showAddress={showAddress}>
        <Title>{place.name}</Title>
        {showAddress && <Address>{place.address}</Address>}
        <div>
          <DateTimeLabel>
            {date} {time}
          </DateTimeLabel>
        </div>
      </Wrapper>
    </Box>
  )
}
