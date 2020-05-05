import { NavLink as _NavLink } from 'react-router-dom'
import styled from 'styled-components'

const NavLink = styled(_NavLink)`
  background: none;
  border-bottom: 3px solid ${(props) => props.theme.LINK_COLOUR};
  color: inherit;
  text-decoration: none;
  &:hover {
    background: ${(props) => props.theme.LINK_COLOUR};
    border-bottom: none;
    cursor: pointer;
    padding: 2px;
  }
`
export default NavLink
