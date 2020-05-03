import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0 16px 16px 16px;
`

export const LocationContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const UndoContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const LinkContainer = styled.div`
  @media (max-width: 768px) {
    position: absolute;
    transform: rotate(-90deg);
    transform-origin: 0 0;
    left: 40px;
    &:first-child {
      left: 0px;
      top: -20px;
    }
  }
`

export const CheckboxContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`
