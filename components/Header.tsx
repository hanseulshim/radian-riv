import * as React from 'react'

const Header: React.FC = () => {
  return (
    <div>
      <div className="header">
        <img src="/header-logo.svg" alt="logo" />
      </div>
      <div className="header primary-background">
        <h2>Radian Interactive Value</h2>
        <h6 className="font-weight-normal">Need slogan to go here</h6>
      </div>
    </div>
  )
}

export default Header
