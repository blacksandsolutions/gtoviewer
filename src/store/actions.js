export const ADD_LOCATION = 'ADD_LOCATION'
export const CLEAR_DATA = 'CLEAR_DATA'
export const IMPORT_FILE_DATA = 'IMPORT_FILE_DATA'
export const REDO = 'REDO'
export const REMOVE_LOCATIONS = 'REMOVE_LOCATIONS'
export const SHOW_LOCATION_INFO = 'SHOW_LOCATION_INFO'
export const SHOW_PLACE_INFO = 'SHOW_PLACE_INFO'
export const TOGGLE_HEATMAP = 'TOGGLE_HEATMAP'
export const TOGGLE_MARKERS = 'TOGGLE_MARKERS'
export const TOGGLE_PLACES = 'TOGGLE_PLACES'
export const TOGGLE_TIMELINE = 'TOGGLE_TIMELINE'
export const UPDATE_SELECTED_TIME = 'UPDATE_SELECTED_TIME'
export const UNDO = 'UNDO'

export const addLocation = (payload) => ({
  type: ADD_LOCATION,
  payload,
})

export const clearData = () => ({
  type: CLEAR_DATA,
})

export const importFileData = (payload) => ({
  type: IMPORT_FILE_DATA,
  payload,
})

export const redo = () => ({
  type: REDO,
})

export const removeLocations = (payload) => ({
  type: REMOVE_LOCATIONS,
  payload,
})

export const showLocationInfo = (payload) => ({
  type: SHOW_LOCATION_INFO,
  payload,
})

export const showPlaceInfo = (payload) => ({
  type: SHOW_PLACE_INFO,
  payload,
})

export const toggleHeatMap = () => ({
  type: TOGGLE_HEATMAP,
})

export const toggleMarkers = () => ({
  type: TOGGLE_MARKERS,
})

export const togglePlaces = () => ({
  type: TOGGLE_PLACES,
})

export const toggleTimeline = () => ({
  type: TOGGLE_TIMELINE,
})

export const undo = () => ({
  type: UNDO,
})

export const updateSelectedTime = (time) => ({
  type: UPDATE_SELECTED_TIME,
  payload: time,
})
