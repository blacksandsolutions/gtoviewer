import React from 'react'
import styled from 'styled-components'
import ReactPageView from '../ReactPageView'

import Places from '../places/Places'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`

export default function PlacesPage() {
  ReactPageView('PlacesPage')
  return (
    <Container>
      <h2>Places</h2>
      <Places />
    </Container>
  )
}
