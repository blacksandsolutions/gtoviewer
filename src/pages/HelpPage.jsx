import React from 'react'
import styled from 'styled-components'
import ReactPageView from '../ReactPageView'

import Link from '../common/Link'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    width: 48%;

    @media (max-width: 768px) {
      width: 90%;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding-left: 5%;
  }
`

const H2 = styled.h2`
  margin-bottom: 0;
`

const Item = styled.li`
  margin-bottom: 4px;
  font-size: 0.8em;
`

export default function HelpPage() {
  ReactPageView('HelpPage')
  return (
    <Container>
      <div>
        <H2>How to get your location data from Google</H2>
        <ul>
          <Item>
            Navigate to{' '}
            <Link href="https://takeout.google.com/" target="_blank">
              https://takeout.google.com/
            </Link>
          </Item>
          <Item>First click on "Deselect all". To exlude non location data.</Item>
          <Item>Select "Location History"</Item>
          <Item>Scroll down and click on "Next Step"</Item>
          <Item>Select the delivery method: "Send download link via email"</Item>
          <Item>Click on "Create Export"</Item>
          <Item>
            After the export is created (might take some minutes) click on "Download". <br /> You
            might need to input your google password
          </Item>
          <Item>Open and Unzip the folder</Item>
        </ul>

        <H2>Importing Location Data</H2>
        <p>
          {' '}
          The location data is organised by year, with a file for each month. <br /> You can import
          as many as you like.
        </p>
        <ul>
          <Item>
            Click on the <b>IMPORT</b> button
          </Item>
          <Item>Find your unzipped folder</Item>
          <Item>Open the 'Semantic Location History' folder</Item>
          <Item>Open the folder for the year you are interested in</Item>
          <Item>Select the month(s) you are interested in</Item>
          <Item> Click Open</Item>
        </ul>
      </div>
      <div>
        <H2>How to Remove Locations</H2>
        <ul>
          <Item>Ensure the 'Locations' option is selected</Item>
          <Item>Click the square or circle in the draw menu on the Left of the map</Item>
          <Item>
            Click the map and draw a square/circle that encloses the locations you want to remove
          </Item>
        </ul>
        <H2>How to Add Locations</H2>
        <ul>
          <Item>Ensure the 'Locations' option is selected</Item>
          <Item>Ensure the 'Timeline' option is selected</Item>
          <Item>Click anywhere on the map</Item>
        </ul>

        <H2>How to Export Location Data </H2>
        <ul>
          <Item>Click the Export button. This will download a file to your computer</Item>
        </ul>

        <H2>How to Clear Location Data </H2>
        <ul>
          <Item>Click the Clear button. This will clear ALL data from your computer</Item>
        </ul>

        <H2>How to View Location Details </H2>
        <ul>
          <Item>Click the marker for any location or place to see details in the side panel</Item>
        </ul>
      </div>
    </Container>
  )
}
