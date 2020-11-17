import * as React from 'react'
import styled from 'styled-components'

export const HeaderContainer = styled.div`
  padding: 1em;
`

const Header: React.FC = () => {
  return (
    <div>
      <HeaderContainer>
        <img src="/header-logo.svg" alt="logo" />
      </HeaderContainer>
      <HeaderContainer className="bg-primary text-white">
        <h2>Radian Interactive Value</h2>
        <h6 className="font-weight-normal">Need slogan to go here</h6>
      </HeaderContainer>
    </div>
  )
}

export default Header
