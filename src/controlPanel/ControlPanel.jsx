import React from 'react'
import { connect } from 'react-redux'

import {
  canRedo,
  canUndo,
  getAreMarkersActive,
  getArePlacesActive,
  getIsHeatMapActive,
  getIsTimelineActive,
  getLocations,
  getLocationInfo,
  getPlaceInfo,
} from '../store/selectors'
import {
  redo,
  toggleHeatMap,
  toggleMarkers,
  togglePlaces,
  toggleTimeline,
  undo,
} from '../store/actions'

import Box from '../common/Box'
import Checkbox from '../common/Checkbox'
import Link from '../common/Link'
import Place from '../common/Place'

import LocationCount from './components/LocationCount'
import UndoButton from './components/UndoButton'
import RedoButton from './components/RedoButton'

import {
  CheckboxContainer,
  Container,
  Footer,
  LinkContainer,
  LocationContainer,
  UndoContainer,
} from './ControlPanel.styles'

function ControlPanel({
  areMarkersActive,
  arePlacesActive,
  canRedo,
  canUndo,
  isHeatMapActive,
  isTimelineActive,
  locations,
  locationInfo,
  placeInfo,
  redo,
  toggleHeatMap,
  toggleMarkers,
  togglePlaces,
  toggleTimeline,
  undo,
}) {
  console.log(placeInfo)
  return (
    <Container>
      <div>
        <Box>
          <LocationContainer>
            <LocationCount count={locations.length} />
          </LocationContainer>
        </Box>
        <Box>
          <UndoContainer>
            <UndoButton onClick={undo} disabled={!canUndo} />
            <RedoButton onClick={redo} disabled={!canRedo} />
          </UndoContainer>
        </Box>
        <Box>
          <CheckboxContainer>
            <Checkbox label={'Locations'} checked={areMarkersActive} onChange={toggleMarkers} />
            <Checkbox label={'Places'} checked={arePlacesActive} onChange={togglePlaces} />
            <Checkbox label={'Heat Map'} checked={isHeatMapActive} onChange={toggleHeatMap} />
            <Checkbox label={'Timeline'} checked={isTimelineActive} onChange={toggleTimeline} />
          </CheckboxContainer>
        </Box>
        {locationInfo && <Place place={locationInfo} />}
        {placeInfo && <Place place={placeInfo} />}
      </div>
      <Footer>
        <LinkContainer>
          Built by <Link href="https://www.blacksandsolutions.co">BlackSandSolutions</Link>
        </LinkContainer>
        <div>
          Icons by{' '}
          <Link target="_blank" href="https://icons8.com">
            Icons8
          </Link>
        </div>
      </Footer>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    areMarkersActive: getAreMarkersActive(state),
    arePlacesActive: getArePlacesActive(state),
    canUndo: canUndo(state),
    canRedo: canRedo(state),
    isHeatMapActive: getIsHeatMapActive(state),
    isTimelineActive: getIsTimelineActive(state),
    locations: getLocations(state),
    locationInfo: getLocationInfo(state),
    placeInfo: getPlaceInfo(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    redo: () => dispatch(redo()),
    toggleHeatMap: () => dispatch(toggleHeatMap()),
    toggleMarkers: () => dispatch(toggleMarkers()),
    togglePlaces: () => dispatch(togglePlaces()),
    toggleTimeline: () => dispatch(toggleTimeline()),
    undo: () => dispatch(undo()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)
