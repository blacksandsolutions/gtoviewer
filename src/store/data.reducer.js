import { assoc } from 'ramda'

import { createTimelineObject, processNewData } from '../utils/gto-processing'
import {
  ADD_LOCATION,
  CLEAR_DATA,
  IMPORT_FILE_DATA,
  REMOVE_LOCATIONS,
  SHOW_LOCATION_INFO,
  SHOW_PLACE_INFO,
} from './actions'
import undoable from './undoable.reducer'

const DEFAULT_STATE = {
  timelineObjects: [],
  processedFiles: [],
  showLocationInfoFor: null,
  showPlaceInfoFor: null,
  removedLocations: [],
}

const dataReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      // * for now can only add locations when timeline is Active - this is because we need a datetime
      if (!action.payload.isTimelineActive && !action.payload.areMarkersActive) {
        return state
      }
      const { latLng, timeMs } = action.payload
      return assoc(
        'timelineObjects',
        [...state.timelineObjects, createTimelineObject(latLng, timeMs)],
        state,
      )

    case CLEAR_DATA:
      return DEFAULT_STATE

    case IMPORT_FILE_DATA:
      const { timelineObjects, processedFiles } = processNewData(
        state.processedFiles,
        action.payload,
      )
      return {
        ...state,
        timelineObjects: [...state.timelineObjects, ...timelineObjects],
        processedFiles,
      }

    case SHOW_LOCATION_INFO:
      return {
        ...state,
        showLocationInfoFor: action.payload,
      }

    case SHOW_PLACE_INFO:
      return {
        ...state,
        showPlaceInfoFor: action.payload,
      }

    case REMOVE_LOCATIONS:
      // * Removing from original data is not that straighforward, so instead maintain a list of removed items and simply filter out
      return assoc('removedLocations', [...state.removedLocations, ...action.payload], state)

    default:
      return state
  }
}

export default undoable(dataReducer)
