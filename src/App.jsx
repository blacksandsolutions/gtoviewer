import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ReactGA from 'react-ga'
import styled, { ThemeProvider } from 'styled-components'

import Header from './header/Header'
import HelpPage from './pages/HelpPage'
import LandingPage from './pages/LandingPage'
import MapPage from './pages/MapPage'
import PlacesPage from './pages/PlacesPage'

import { GlobalStyle } from './styles/globalStyles'
import theme from './styles/theme'

const Container = styled.div`
  display: flex;
  height: calc(100vh - ${(props) => props.theme.HEADER_HEIGHT});
`
ReactGA.initialize(process.env.REACT_APP_GA_ID || '')

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Container>
            <Switch>
              <Route path="/map">
                <MapPage />
              </Route>
              <Route path="/places">
                <PlacesPage />
              </Route>
              <Route path="/help">
                <HelpPage />
              </Route>
              <Route path="/:uuid?">
                <LandingPage />
              </Route>
            </Switch>
          </Container>
          <GlobalStyle />
        </Router>
      </ThemeProvider>
    )
  }
}

export default App
