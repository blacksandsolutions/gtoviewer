import React from 'react'
import { connect } from 'react-redux'
import L from 'leaflet'

import {
  addLocation,
  removeLocations,
  showLocationInfo,
  showPlaceInfo,
  updateSelectedTime,
} from '../store/actions'
import {
  getAreMarkersActive,
  getArePlacesActive,
  getLatLongs,
  getLocations,
  getIsHeatMapActive,
  getPlaces,
  getSelectedTime,
  getShowPlaceInfoFor,
  getTimelineData,
  getIsTimelineActive,
} from '../store/selectors'
import { IconDefault, IconPlace } from './components/Icons'
import Timeline from './components/Timeline'
import { Container, TimelineContainer } from './MapStyles'

require('leaflet.heat')
require('leaflet-draw')
require('leaflet.markercluster')

const style = {
  width: '100%',
  height: 'calc(100vh - 60px)', // TODO make this work with theme
}

const southWest = L.latLng(-90, -180),
  northEast = L.latLng(90, 180),
  bounds = L.latLngBounds(southWest, northEast)

const mapParams = {
  center: [-41.284946, 173.1960541],
  zoomControl: false,
  maxBounds: bounds,
  zoom: 13,
}

class Map extends React.Component {
  initialLayerLoad = false
  componentDidMount() {
    const drawControl = new L.Control.Draw({
      draw: {
        marker: false,
        polygon: false,
        polyline: false,
        rectangle: true,
        circle: {
          metric: 'metric',
        },
      },
      edit: false,
    })

    // this is used to see if markers are within drawn circle
    L.Circle.include({
      contains: function (latLng) {
        return this.getLatLng().distanceTo(latLng) < this.getRadius()
      },
    })

    // this is used to see if markers are within drawn rectangle
    L.Rectangle.include({
      contains: function (latLng) {
        return this.getBounds().contains(latLng)
      },
    })

    this.markersLayer = new L.markerClusterGroup()
    this.heatMapLayer = new L.heatLayer([], { radius: 25 })

    const openStreetMapLayer = L.tileLayer('//{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    })

    mapParams.layers = [openStreetMapLayer, this.markersLayer]
    this.map = L.map('map', mapParams).locate({ setView: true, zoom: 10 })
    this.map.on('click', (e) => this.addLocation(e.latlng))

    L.control
      .zoom({
        position: 'topleft',
      })
      .addTo(this.map)

    this.map.addControl(drawControl)

    this.map.on(L.Draw.Event.CREATED, (e) => {
      const locationIdsToRemove = []
      this.markersLayer.eachLayer(function (marker) {
        if (e.layer.contains(marker.getLatLng())) {
          locationIdsToRemove.push(marker.id)
        }
      })
      this.props.removeLocations(locationIdsToRemove)
    })

    this.markersLayer.addTo(this.map)
    this.heatMapLayer.addTo(this.map)

    this.addMarkersToMap()
    this.addHeatMapToMap()
  }

  addLocation(latLng) {
    let timeMs = this.props.selectedTime
    if (!timeMs) {
      const timelineData = this.props.timelineData
      timeMs = timelineData.min
    }
    if (this.props.isTimelineActive) {
      this.props.addLocation({
        latLng,
        timeMs,
        isTimelineActive: this.props.isTimelineActive,
        areMarkersActive: this.props.areMarkersActive,
      })
    }
  }

  addHeatMapToMap() {
    if (this.map) {
      this.heatMapLayer.setLatLngs(this.props.isHeatMapActive ? this.props.latLngs : [])
    }
  }

  addMarkersToMap() {
    if (this.map) {
      this.markersLayer.clearLayers()

      if (this.props.locations && this.props.areMarkersActive) {
        this.props.locations.forEach((location) => {
          const mkr = new L.marker([location.latitudeE7, location.longitudeE7])
            .addTo(this.markersLayer)
            .on('click', (e) => {
              this.props.showLocationInfo(e.target.id)
            })
          mkr.id = location.id
          mkr.setIcon(IconDefault)
        })
      }

      if (this.props.places && this.props.arePlacesActive) {
        this.props.places.forEach((place) => {
          const mkr = new L.marker([place.latitudeE7, place.longitudeE7])
            .addTo(this.markersLayer)
            .on('click', (e) => {
              this.props.showPlaceInfo(e.target.id)
            })
          mkr.id = place.id
          mkr.setIcon(IconPlace)
          if (this.props.showPlaceInfoFor && place.id === this.props.showPlaceInfoFor) {
            // TODO this causes a React error
            //mkr.bindPopup(place.name).openPopup()
          }
        })
      }
    }
  }

  render() {
    this.addMarkersToMap()
    this.addHeatMapToMap()

    return (
      <Container>
        <div id="map" style={style} />
        {this.props.isTimelineActive && (
          <TimelineContainer>
            <Timeline
              locations={this.props.timelineData.locations}
              max={this.props.timelineData.max}
              min={this.props.timelineData.min}
              onChange={this.props.updateSelectedTime}
            />
          </TimelineContainer>
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    areMarkersActive: getAreMarkersActive(state),
    arePlacesActive: getArePlacesActive(state),
    isHeatMapActive: getIsHeatMapActive(state),
    isTimelineActive: getIsTimelineActive(state),
    latLngs: getLatLongs(state),
    locations: getLocations(state),
    places: getPlaces(state),
    selectedTime: getSelectedTime(state),
    showPlaceInfoFor: getShowPlaceInfoFor(state),
    timelineData: getTimelineData(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addLocation: (payload) => dispatch(addLocation(payload)),
    removeLocations: (locations) => dispatch(removeLocations(locations)),
    showLocationInfo: (id) => dispatch(showLocationInfo(id)),
    showPlaceInfo: (id) => dispatch(showPlaceInfo(id)),
    updateSelectedTime: (time) => dispatch(updateSelectedTime(time)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
