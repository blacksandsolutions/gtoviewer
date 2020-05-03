// NOT USED
const loadDynamicScript = (callback, libraryName, url) => {
  const existingScript = document.getElementById(libraryName)

  if (!existingScript) {
    const script = document.createElement('script')
    script.src = url // URL for the third-party library being loaded.
    script.id = libraryName // e.g., googleMaps or stripe
    document.body.appendChild(script)

    script.onload = () => {
      if (callback) callback()
    }
  }

  if (existingScript && callback) callback()
}

export const loadLeafletTimeline = (callback) => {
  return loadDynamicScript(callback, 'leaflet.timeline', './leaflet.timeline.js')
}
