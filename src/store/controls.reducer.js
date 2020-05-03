import { assoc } from 'ramda'

import {
  TOGGLE_HEATMAP,
  TOGGLE_MARKERS,
  TOGGLE_PLACES,
  TOGGLE_TIMELINE,
  UPDATE_SELECTED_TIME,
} from './actions'

const DEFAULT_STATE = {
  heatMapActive: false,
  markersActive: true,
  placesActive: false,
  selectedTime: null,
  timelineActive: false,
}

const controlsReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case TOGGLE_HEATMAP:
      return assoc('heatMapActive', !state.heatMapActive, state)

    case TOGGLE_MARKERS:
      return assoc('markersActive', !state.markersActive, state)

    case TOGGLE_PLACES:
      return assoc('placesActive', !state.placesActive, state)

    case TOGGLE_TIMELINE:
      return assoc('timelineActive', !state.timelineActive, state)

    case UPDATE_SELECTED_TIME:
      return assoc('selectedTime', action.payload, state)

    default:
      return state
  }
}

export default controlsReducer
