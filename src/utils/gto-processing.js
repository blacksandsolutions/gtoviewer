import { clone } from 'ramda'
import { v4 as uuidv4 } from 'uuid'

function getWaypoints(activitySegment) {
  if (activitySegment.waypointPath) {
    return activitySegment.waypointPath.waypoints
  } else if (activitySegment.simplifiedRawPath) {
    return activitySegment.simplifiedRawPath.points
  } else {
    return []
  }
}

/**
 * Extract latlng and timestamp from activitySegment
 * @param {*} activitySegment
 */
function processActivitySegment(activitySegment) {
  const duration = activitySegment.duration
  const waypoints = getWaypoints(activitySegment)

  const locations = []
  waypoints.forEach((waypoint, widx) => {
    locations.push({
      id: waypoint.id,
      timestampMs: duration.startTimestampMs,
      latitudeE7: waypoint.latE7 / 1e7,
      longitudeE7: waypoint.lngE7 / 1e7,
    })
  })
  return locations
}

/**
 * Extract latlng and timestamp from placeVisit
 * @param {*} placeVisit
 */
function processPlaceVisit(placeVisit) {
  // will have a duration.startTimestampMs and  duration.endTimestampMs
  // will have  a location
  // if duration.startTimestampMs and  duration.endTimestampMs falls within our search frame add location to locations
  const duration = placeVisit.duration

  const location = placeVisit.location
  return {
    id: location.id,
    timestampMs: duration.startTimestampMs,
    latitudeE7: location.latitudeE7 / 1e7,
    longitudeE7: location.longitudeE7 / 1e7,
  }
}

/**
 * Find the things we use for locations and give them a UUID.
 * Return a clone of the original object to avoid mutating the original
 * @param {[]} timelineObjects
 */
function identifyTimelineObjects(timelineObjects) {
  const identified = []
  timelineObjects.forEach((timelineObject, lidx) => {
    if (timelineObject.activitySegment) {
      const waypoints = getWaypoints(timelineObject.activitySegment)
      waypoints.forEach((waypoint, widx) => {
        waypoint.id = uuidv4()
      })
    }
    if (timelineObject.placeVisit) {
      const location = timelineObject.placeVisit.location
      location.id = uuidv4()
    }
    identified.push(clone(timelineObject))
  })
  return identified
}

/**
 * Create valid data structure for used added location
 * @param {*} latLng
 * @param {*} timestampMs
 */
export function createTimelineObject(latLng, timestampMs) {
  return {
    activitySegment: {
      waypointPath: {
        waypoints: [
          {
            latE7: latLng.lat * 1e7,
            lngE7: latLng.lng * 1e7,
          },
        ],
      },
      duration: {
        startTimestampMs: timestampMs,
        endTimestampMs: timestampMs,
      },
    },
  }
}

/**
 * GTO timeline objects contain a lot of data.
 * We are only really interested in the lat/lng and timestamp
 * Extract just this info as an aray
 * @param {*} timelineObjects
 */
export function extractLocationsFromTimelineObjects(timelineObjects) {
  const locations = []

  timelineObjects.forEach((timelineObject) => {
    if (timelineObject.activitySegment) {
      locations.push(...processActivitySegment(timelineObject.activitySegment))
    }

    if (timelineObject.placeVisit) {
      locations.push(processPlaceVisit(timelineObject.placeVisit))
    }
  })
  return locations
}

export function extractPlacesFromTimelineObjects(timelineObjects) {
  const places = []
  timelineObjects.forEach((timelineObject) => {
    if (timelineObject.placeVisit) {
      const duration = timelineObject.placeVisit.duration

      if (timelineObject.placeVisit.placeConfidence === 'HIGH_CONFIDENCE') {
        const place = timelineObject.placeVisit.location
        const existing = places.find((p) => p.placeId === place.placeId)

        if (!existing) {
          places.push({
            id: place.id,
            placeId: place.placeId,
            address: place.address,
            name: place.name,
            timestampMs: duration.startTimestampMs,
            latitudeE7: place.latitudeE7 / 1e7,
            longitudeE7: place.longitudeE7 / 1e7,
          })
        }
      }
    }
  })
  return places
}

/**
 * Takes data imported from GTO file and flattens into a singl array.
 * Adds a UUID to each location so we can ID it later - makes it easier to filter out
 * removed locations
 * @param {[]} newData
 */
export function processNewData(processedFiles, newFiles) {
  // TODO handle wrong file structure E.g. main file not monthly files

  const timelineObjects = []

  for (let i = 0; i < newFiles.length; i++) {
    const file = newFiles[i]

    if (processedFiles.indexOf(file.name) > -1) {
      // dont process data in files we have seen before
      continue
    } else {
      processedFiles.push(file.name)
    }

    const newObjects = file.fileData.timelineObjects
    //const withFilename = map((tobj) => addFileNameToObject(tobj, file.name), newObjects)

    timelineObjects.push(...newObjects)
  }

  return {
    timelineObjects: identifyTimelineObjects(timelineObjects),
    processedFiles,
  }
}
