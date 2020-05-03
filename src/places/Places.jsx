import React from 'react'
import { connect } from 'react-redux'

import { getPlaces } from '../store/selectors'
import PlacesList from './components/PlacesList'

function Places({ places }) {
  return (
    <>
      {places.length > 0 ? (
        <p>These are places you have visited...</p>
      ) : (
        <p>You need to import some location data...</p>
      )}

      <PlacesList places={places} />
    </>
  )
}

const mapStateToProps = (state) => {
  const places = getPlaces(state)
  return {
    places,
  }
}

export default connect(mapStateToProps)(Places)
