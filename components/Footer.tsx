import * as React from 'react'

const Footer: React.FC = () => {
  return (
    <div id="footer">
      <img src={`${process.env.baseUrl}/images/footer-logo.svg`} alt="logo" />
      <div className="content">
        <div className="footer-links">
          <a>About Us</a>
          <a>Privacy Policy</a>
          <a>Terms of Use</a>
          <a>Copyright Infringement</a>
          <a>Email Us: vox@redbellre.com</a>
        </div>
        <span>
          © 2020 Red Bell Real Estate, LLC. All rights reserved. Ownership and
          use of this report is governed by the legal agreement between RedBell
          and the party for which it was prepared. Information contained in this
          report is current as at the date of the report. Red Bell does not
          accept any liability for use of this report or the data, all of which
          is provided “as-is” and without warranty or covenant of any kind
          including any warranty as to its accuracy, marketability or fitness
          for a particular purpose or usage. Any use not expressly authorized by
          such agreement, including reliance on this report, is prohibited.
        </span>
      </div>
    </div>
  )
}

export default Footer
