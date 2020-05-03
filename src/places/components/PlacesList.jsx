import React from 'react'
import styled from 'styled-components'

import Place from '../../common/Place'

const PlacesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const PlaceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 8px;
  width: 200px;
`

function PlacesList({ places }) {
  return (
    <PlacesContainer>
      {places.map((place) => {
        return (
          <PlaceWrapper>
            <Place key={place.placeId} place={place} showAddress={true}></Place>
          </PlaceWrapper>
        )
      })}
    </PlacesContainer>
  )
}

export default PlacesList
