import React, { useState } from 'react'
import ContactUs from './ContactUs'
import Copyright from './Copyright'
import AboutUs from './AboutUs'

export default function Footer() {
  const [contactUsModal, setContactUsModal] = useState(false)
  const [copyrightModal, setCopyrightModal] = useState(false)
  const [aboutUsModal, setAboutUsModal] = useState(false)
  const toggleContactUsModal = () => {
    setContactUsModal(!contactUsModal)
  }
  const toggleCopyrightModal = () => {
    setCopyrightModal(!copyrightModal)
  }
  const toggleAboutUsModal = () => {
    setAboutUsModal(!aboutUsModal)
  }
  return (
    <div id="footer">
      <div className="logo-container">
        <img src={`${process.env.baseUrl}/images/footer-logo.svg`} alt="logo" />
      </div>
      <div className="content">
        <div className="footer-links">
          <a onClick={toggleAboutUsModal}>About Us</a>
          <a target="_blank" href={`${process.env.baseUrl}/PrivacyPolicy.pdf`}>
            Privacy Policy
          </a>
          <a target="_blank" href={`${process.env.baseUrl}/TermsOfUse.pdf`}>
            Terms of Use
          </a>
          <a onClick={toggleCopyrightModal}>Copyright Infringement</a>
          <a onClick={toggleContactUsModal}>Contact Us: vox@redbellre.com</a>
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
      {copyrightModal && <Copyright closeModal={toggleCopyrightModal} />}
      {contactUsModal && <ContactUs closeModal={toggleContactUsModal} />}
      {aboutUsModal && <AboutUs closeModal={toggleAboutUsModal} />}
    </div>
  )
}
