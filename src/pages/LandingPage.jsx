import React from 'react'
import styled from 'styled-components'
import ReactPageView from '../ReactPageView'
import NavLink from '../common/NavLink'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const H2 = styled.h2`
  margin-bottom: 0;
  margin-left: 16px;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    padding-right: 16px;
    width: 47%;

    @media (max-width: 768px) {
      width: 90%;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding-left: 5%;
  }
`

const P = styled.p`
  font-size: 0.9em;
  margin-top: 0;
  max-width: 800px;
`

export default function LandingPage() {
  ReactPageView('LandingPage')
  return (
    <Wrapper>
      <H2>Google Take Out Location Viewer</H2>
      <Container>
        <div>
          <h3>What</h3>
          <P>
            This tool allows you to view your Google Take Out Location history and edit it.
            <br />
            You can remove locations from your history, or add in new locations.
          </P>

          <h3>Why?</h3>
          <P>
            Firstly, because I think it's kinda cool, if a little scary, to visulise the location
            data Google has collected on us.
          </P>

          <P>
            But, another potential application is to allow you to review and edit location data
            before submitting it to a third party site.
          </P>
          <h3>
            <NavLink to="/help">Learn how to get your location data from Google</NavLink>
          </h3>
        </div>
        <div>
          <h3>Why might you want to do this...?</h3>

          <P>
            Several Contact Tracing apps are being developed around the world which will inform you
            if you have crossed paths with an infected person. In order to do this, these apps need
            to know your location. They can track this from the moment you install the app - but
            what about before you install the app?
          </P>
          <P>
            You can provide the app with your location history by sharing your Google Take Out
            Location history. This data is anonymised, but will likely show clusters of location
            markers around your house and other potential areas you'd rather not share.
          </P>

          <P>This tool allows you to remove any sensitive location data before you share it.</P>
          <P>Likewise you can add in any missing location data.</P>
          <P>
            All of this data is kept on your computer (in the browser) and can be cleared at any
            time - it's never sent or saved anywhere else.
          </P>

          <P>
            To share the data you can export it, the downloaded file contains a list of locations
            and timestamps only.
          </P>
        </div>
      </Container>
    </Wrapper>
  )
}
