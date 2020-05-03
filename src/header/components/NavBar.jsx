import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import Button from '../../common/Button'
import CallToAction from '../../common/CallToAction'
import FileControl from './FileControl'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 0 16px;

  @media (max-width: 400px) {
    display: none;
  }
`

const LinkContainer = styled.div`
  align-items: center;
  display: flex;
`

const LinkButton = styled(NavLink)`
  color: #666;
  margin: 0 8px;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
    border-bottom: 3px solid rgb(28, 184, 65);
  }
  &.active {
    border-bottom: 3px solid rgb(28, 184, 65);
  }
`
const LogoButton = styled(LinkButton)`
  @media (max-width: 768px) {
    display: none;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: calc(20% - 32px);
  > * {
    margin-left: 8px;
  }

  @media (max-width: 768px) {
    width: calc(24% - 32px);
  }
  @media (min-width: 1920px) {
    width: calc(15% - 32px);
  }
`

function NavBar({ onClear, onFileLoaded, onExport, showButtons, showCTA }) {
  return (
    <Wrapper>
      <LogoButton to="/" exact>
        GTO Viewer
      </LogoButton>

      <LinkContainer>
        <LinkButton to="/" exact>
          Home
        </LinkButton>
        <LinkButton to="/map">Map</LinkButton>
        <LinkButton to="/places">Places</LinkButton>
        <LinkButton to="/help">Help</LinkButton>
      </LinkContainer>
      <ButtonContainer>
        {showCTA && <CallToAction text={'Click here to import Google Data'} />}
        {showButtons && (
          <Button onClick={onExport} label={'Export'} title={'Download location data'} />
        )}
        {showButtons && <Button onClick={onClear} label={'Clear'} title={'Clear all data'} />}
        <FileControl onFileLoaded={onFileLoaded} />
      </ButtonContainer>
    </Wrapper>
  )
}

export default NavBar
