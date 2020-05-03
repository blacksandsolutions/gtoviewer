import React from 'react'
import styled from 'styled-components'
import ReactPageView from '../ReactPageView'

import ControlPanel from '../controlPanel/ControlPanel'
import Map from '../map/Map'

const MapWrapper = styled.div`
  width: 80%;
  @media (max-width: 768px) {
    width: 76%;
  }
  @media (min-width: 1920px) {
    width: 85%;
  }
`

const ControlPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  @media (max-width: 768px) {
    width: 24%;
  }
  @media (min-width: 1920px) {
    width: 15%;
  }
`

export default function MapPage() {
  ReactPageView('MapPage')
  return (
    <>
      <MapWrapper>
        <Map />
      </MapWrapper>
      <ControlPanelWrapper>
        <ControlPanel />
      </ControlPanelWrapper>
    </>
  )
}
