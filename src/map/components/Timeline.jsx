import React, { useState } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const DateLabel = styled.div`
  width: 10%;
`

const Slider = styled.input`
  outline: none;
  width: 100%;
`

const Timeline = ({ locations, max, min, onChange }) => {
  const [timeMs, setTimeMs] = useState(locations[0] ? locations[0].timestampMs : null)
  const handleChange = (e) => {
    setTimeMs(e.target.value)
    onChange(e.target.value)
  }
  const date = format(new Date(Number(timeMs)), 'd MMM yyyy')
  const time = format(new Date(Number(timeMs)), 'HH:mm')

  return (
    <Container>
      <DateLabel>
        <div>{date}</div>
        <div>{time}</div>
      </DateLabel>
      <Slider
        aria-label="Slider"
        type="range"
        min={min}
        max={max}
        list="timeline-datalist"
        onChange={handleChange}
      ></Slider>
      <datalist id="timeline-datalist">
        <select aria-label="List of times">
          {locations.map((location, idx) => (
            <option key={idx} value={location.timestampMs}></option>
          ))}
        </select>
      </datalist>
    </Container>
  )
}
export default Timeline
