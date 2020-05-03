import { createSelector } from 'reselect'

import {
  extractLocationsFromTimelineObjects,
  extractPlacesFromTimelineObjects,
} from '../utils/gto-processing'

const MAX_UNDO_REDOS = 10

const getTimelineObjects = (state) => {
  return state.dataReducer.present.timelineObjects
}

export const canRedo = (state) => {
  return state.dataReducer.future.length > 0 && state.dataReducer.future.length <= MAX_UNDO_REDOS
}

export const canUndo = (state) => {
  return state.dataReducer.past.length > 0 && state.dataReducer.past.length <= MAX_UNDO_REDOS
}

export const getAreMarkersActive = (state) => state.controlsReducer.markersActive

export const getArePlacesActive = (state) => state.controlsReducer.placesActive

export const getIsHeatMapActive = (state) => state.controlsReducer.heatMapActive

export const getIsTimelineActive = (state) => state.controlsReducer.timelineActive

export const getRemovedLocations = (state) => state.dataReducer.present.removedLocations

export const getSelectedTime = (state) => state.controlsReducer.selectedTime

export const getShowLocationInfoFor = (state) => state.dataReducer.present.showLocationInfoFor

export const getShowPlaceInfoFor = (state) => state.dataReducer.present.showPlaceInfoFor

export const getLocations = createSelector(
  [getTimelineObjects, getRemovedLocations, getIsTimelineActive, getSelectedTime],
  (timelineObjects, removed, timelineActive, selectedTime) => {
    const locations = extractLocationsFromTimelineObjects(timelineObjects).filter(
      (l) => !removed.includes(l.id),
    )

    if (!selectedTime || !timelineActive) {
      return locations
    }

    return locations.filter((loc) => loc.timestampMs === selectedTime)
  },
)

export const getLatLongs = createSelector([getLocations], (locations) => {
  return locations.map((loc) => {
    return [loc.latitudeE7, loc.longitudeE7, 2]
  })
})

export const getLocationInfo = createSelector(
  [getLocations, getAreMarkersActive, getShowLocationInfoFor],
  (locations, markersActive, id) => {
    if (!id || !markersActive) {
      return null
    }
    if (id) {
      const filtered = locations.filter((p) => p.id === id)
      return filtered.length ? filtered[0] : null
    }
    return null
  },
)

export const getPlaces = createSelector([getTimelineObjects], (timelineObjects) => {
  return extractPlacesFromTimelineObjects(timelineObjects)
})

export const getPlaceInfo = createSelector(
  [getPlaces, getArePlacesActive, getShowPlaceInfoFor],
  (places, placesActive, id) => {
    if (!id || !placesActive) {
      return null
    }
    if (id) {
      const filtered = places.filter((p) => p.id === id)
      return filtered.length ? filtered[0] : null
    }
    return null
  },
)

export const getTimelineData = createSelector([getTimelineObjects], (timelineObjects) => {
  // * We don't reuse getLocations because that will be filtered by time when timeline active
  // * and we want the timeline to ALWAYS show ALL locations
  const locations = extractLocationsFromTimelineObjects(timelineObjects).sort(compare)
  const firstLocation = locations[0] ? locations[0] : null
  const lastLocation = locations[0] ? locations[locations.length - 1] : null
  const min = firstLocation ? Number(firstLocation.timestampMs) : null
  const max = lastLocation ? Number(lastLocation.timestampMs) : null
  return {
    locations,
    min,
    max,
  }
})

function compare(a, b) {
  if (a.timestampMs < b.timestampMs) {
    return -1
  }
  if (a.timestampMs > b.timestampMs) {
    return 1
  }
  return 0
}
