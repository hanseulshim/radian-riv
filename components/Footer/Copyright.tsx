import React, { useState } from 'react'
import Input from 'components/common/Input'
import Modal from 'components/common/Modal'
import Form from 'components/common/Form'
import { validateEmail } from 'utils'

interface Props {
  closeModal: () => void
}

export default function Copyright({ closeModal }: Props) {
  const toEmail = 'vow@redbellre.com'
  const subject = 'Copyright Infringement'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [comment, setComment] = useState('')
  const [emailError, setEmailError] = useState('')
  const [alert, setAlert] = useState(null)
  const submitForm = async () => {
    setAlert(null)
    const error = validateEmail(email)
    if (error) {
      setEmailError(error)
    } else {
      setAlert({ type: 'success', message: 'Email Sent' })
      const a = document.createElement('a')
      a.href = `mailto:${toEmail}?subject=${subject}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AProperty Address: ${address}%0D%0AComment: ${comment}`
      a.click()
    }
  }
  return (
    <Modal closeModal={closeModal} title={'Copyright Infringement'} width={800}>
      <div className="copyright">
        <span>
          If you believe a copyright, trademark or other property right has been
          infringed by any content included or posted on the VOW, including
          Listing Content, you should immediately send a notification to the VOW
          Operator’s designated agent (“Designated Agent”), as identified below,
          and in accordance with the Digital Millennium Copyright Act (“DMCA”),
          17 U.S.C. § 512(c). The VOW Operator’s Designated Agent for notice of
          claims of copyright infringement can be reached as indicated below or
          by submitting a message herein. Claims of Copyright Infringement &
          Related Issues (17 USC § 512 et seq.) We respect the intellectual
          property rights of others. Anyone who believes their work has been
          reproduced in a way that constitutes copyright infringement may notify
          our agent by providing the following information: Identification of
          the copyrighted work that you claim has been infringed, or, if
          multiple copyrighted works at a single online site are covered by a
          single notification, a representative list of such works at the site;
          Identification of the material that you claim is infringing and needs
          to be removed, including a description of where it is located so that
          the copyright agent can locate it; Your address, telephone number,
          and, if available, e-mail address, so that the copyright agent may
          contact you about your complaint; and A signed statement that the
          above information is accurate; that you have a good faith belief that
          the identified use of the material is not authorized by the copyright
          owner, its agent, or the law; and, under penalty of perjury, that you
          are the copyright owner or are authorized to act on the copyright
          owner's behalf in this situation. Upon obtaining such knowledge we
          will act expeditiously to remove, or disable access to, the material.
          Please be aware that there are substantial penalties for false claims.
          If a notice of copyright infringement has been wrongly filed against
          you, you may submit a counter notification to our agent. A valid
          counter notification is a written communication that incorporates the
          following elements: A physical or electronic signature of the poster;
          Identification of the material that has been removed or to which
          access has been disabled and the location at which the material
          appeared before it was removed or access to it was disabled; A
          statement under penalty of perjury that you have a good faith belief
          that the material was removed or disabled as a result of mistake or
          misidentification; Your name, address, and telephone number; a
          statement that you consent to the jurisdiction of federal district
          court for the judicial district in which your address is located, or
          if your address is outside of the U.S., for any judicial district in
          which the service provider may be found; and that you will accept
          service of process from the complainant. Notices of the foregoing
          copyright issues should be sent as follows: By mail: John H. Rees
          Callister Nebeker & McCullough 10 East South Temple, Suite 900 Salt
          Lake City, UT 84133 By e-mail: jhrees@cnmlaw.com If you give notice of
          copyright infringement by e-mail, an agent may begin investigating the
          alleged copyright infringement; however, we must receive your signed
          statement by mail or as an attachment to your e-mail before we are
          required to take any action. This information should not be construed
          as legal advice. We recommend you seek independent legal counsel
          before filing a notification or counter-notification. For further
          information about the DMCA, please visit the website of the United
          States Copyright Office at:{' '}
          <a
            className="copyright-link"
            href="http://www.copyright.gov/onlinesp"
            target="_blank"
          >
            http://www.copyright.gov/onlinesp
          </a>
        </span>
      </div>
      <Form id="reset-password" onSubmit={submitForm} alert={alert}>
        <Input
          label="To"
          value={toEmail}
          error={''}
          onChange={() => {}}
          disabled
        />
        <div className="form-row">
          <div className="form-spacer">
            <Input
              label="Name"
              value={name}
              error={''}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="form-spacer">
            <Input
              label="Email"
              value={email}
              error={emailError}
              onChange={e => {
                setEmail(e.target.value)
                setEmailError('')
              }}
            />
          </div>
        </div>
        <Input
          label="Subject"
          value={subject}
          error={''}
          onChange={() => {}}
          disabled
        />
        <Input
          label="Property Address"
          value={address}
          error={''}
          onChange={e => setAddress(e.target.value)}
        />
        <textarea
          placeholder="Comment Field..."
          onChange={e => setComment(e.target.value)}
          value={comment}
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </Form>
    </Modal>
  )
}
