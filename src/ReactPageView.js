import ReactGA from 'react-ga'

export default (page) => {
  if (window.location.hostname !== 'localhost') {
    ReactGA.pageview(page)
  }
}
