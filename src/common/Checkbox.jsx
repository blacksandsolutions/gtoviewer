import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
`

//https://medium.com/@colebemis/building-a-checkbox-component-with-react-and-styled-components-8d3aa1d826dd
// icons8-checkmark-64.png

function Checkbox({ checked, label, onChange }) {
  const id = label.trim()
  return (
    <Wrapper>
      <label htmlFor={id}>
        <input id={id} type="checkbox" checked={checked} onChange={onChange} />
        {label}
      </label>
    </Wrapper>
  )
}

export default Checkbox
