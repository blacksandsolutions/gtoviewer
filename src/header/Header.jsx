import React from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router'
import { useHistory } from 'react-router-dom'

import { clearData, importFileData } from '../store/actions'
import { getLocations } from '../store/selectors'
import { clearState } from '../utils/local-storage'

import Menu from './components/Menu'
import NavBar from './components/NavBar'
import { map, omit } from 'ramda'

function Header({ clearData, importFileData, locations }) {
  let location = useLocation()
  let history = useHistory()

  const handleClear = () => {
    clearState()
    clearData()
  }

  const handleNewData = (data) => {
    importFileData(data)
    if (location.pathname !== '/map') {
      history.push('/map')
    }
  }

  const handleExport = () => {
    const withoutIds = map((loc) => omit(['id'], loc), locations)
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(withoutIds))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute('href', dataStr)
    downloadAnchorNode.setAttribute('download', 'locations.json')
    document.body.appendChild(downloadAnchorNode) // required for firefox
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }
  return (
    <>
      <Menu />
      <NavBar
        onClear={handleClear}
        onFileLoaded={handleNewData}
        onExport={handleExport}
        showButtons={locations.length > 0}
        showCTA={!locations.length === 0 && location.pathname === '/'}
      ></NavBar>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    locations: getLocations(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearData: () => dispatch(clearData()),
    importFileData: (data) => dispatch(importFileData(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
