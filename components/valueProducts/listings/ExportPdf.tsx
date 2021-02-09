import { useAuth } from 'context/auth/AuthProvider'
import React, { useState } from 'react'
import { validateForm } from 'utils'
import { exportPdf } from 'api'
import Checkbox from 'components/common/Checkbox'
import Form from 'components/common/Form'
import Input from 'components/common/Input'
import Modal from 'components/common/Modal'
import Radio from 'components/common/Radio'

interface Props {
  closeModal: () => void
  listingSheets: {
    subject: number
    selected: number
    all: number
  }
}

export default function ExportPdf({ closeModal, listingSheets }: Props) {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [form, setForm] = useState({
    subjectPhotosType: 'primaryOnly',
    subjectListingSheets: false,
    comparableType: 'selectedComparables',
    selectedCompPhotosType: 'primaryOnly',
    selectedCompListingSheets: false,
    allCompPhotosType: null,
    allCompListingSheets: false,
    uncheckedManualComparables: false
  })

  const onRadioChange = (e: any) => {
    if (e.target.name === 'comparableType') {
      if (e.target.value === 'selectedComparables') {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
          allCompPhotosType: null,
          allCompListingSheets: false
        })
      }
      if (e.target.value === 'allComparables') {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
          selectedCompPhotosType: null,
          selectedCompListingSheets: false
        })
      }
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }
  }

  const onCheckboxChange = (name: string, value: string | boolean) => {
    setForm({
      ...form,
      [name]: value
    })
  }

  const {
    subjectPhotosType,
    subjectListingSheets,
    comparableType,
    selectedCompPhotosType,
    selectedCompListingSheets,
    allCompPhotosType,
    allCompListingSheets,
    uncheckedManualComparables
  } = form
  const { subject, selected, all } = listingSheets

  if (formSubmitted) {
    return <ChooseDelivery closeModal={closeModal} exportForm={form} />
  }

  return (
    <Modal
      closeModal={closeModal}
      title={'Select your options for PDF'}
      width={600}
    >
      <div className="export-pdf-form">
        <h3 className="section-title">Subject</h3>
        <Radio
          value="primaryOnly"
          checked={subjectPhotosType === 'primaryOnly'}
          onChange={onRadioChange}
          label="Primary Photograph Only"
          name="subjectPhotosType"
        />
        <Radio
          value="allAvailable"
          checked={subjectPhotosType === 'allAvailable'}
          onChange={onRadioChange}
          label="All Available Photographs"
          name="subjectPhotosType"
        />
        <Checkbox
          label={`Listing Sheets (${subject})`}
          onChange={() =>
            onCheckboxChange('subjectListingSheets', !subjectListingSheets)
          }
          checked={subjectListingSheets}
          disabled={subject === 0}
        />
        <Radio
          value="selectedComparables"
          checked={comparableType === 'selectedComparables'}
          onChange={onRadioChange}
          label="Selected Comparables"
          className="section-title"
          name="comparableType"
        />
        <Radio
          value="primaryOnly"
          checked={selectedCompPhotosType === 'primaryOnly'}
          onChange={onRadioChange}
          label="Primary Photograph Only"
          disabled={comparableType !== 'selectedComparables'}
          name="selectedCompPhotosType"
        />
        <Radio
          value="allAvailable"
          checked={selectedCompPhotosType === 'allAvailable'}
          onChange={onRadioChange}
          label="All Available Photographs"
          disabled={comparableType !== 'selectedComparables'}
          name="selectedCompPhotosType"
        />
        <Checkbox
          label={`Listing Sheets (${selected})`}
          onChange={() =>
            onCheckboxChange(
              'selectedCompListingSheets',
              !selectedCompListingSheets
            )
          }
          checked={selectedCompListingSheets}
          disabled={comparableType !== 'selectedComparables' || selected === 0}
        />
        <Radio
          value="allComparables"
          checked={comparableType === 'allComparables'}
          onChange={onRadioChange}
          label="All Comparables"
          className="section-title"
          name="comparableType"
        />
        <Radio
          value="primaryOnly"
          checked={allCompPhotosType === 'primaryOnly'}
          onChange={onRadioChange}
          label="Primary Photograph Only"
          disabled={comparableType !== 'allComparables'}
          name="allCompPhotosType"
        />
        <Radio
          value="allAvailable"
          checked={allCompPhotosType === 'allAvailable'}
          onChange={onRadioChange}
          label="All Available Photographs"
          disabled={comparableType !== 'allComparables'}
          name="allCompPhotosType"
        />
        <Checkbox
          label={`Listing Sheets (${all})`}
          onChange={() =>
            onCheckboxChange('allCompListingSheets', !allCompListingSheets)
          }
          checked={allCompListingSheets}
          disabled={comparableType !== 'allComparables' || all === 0}
        />
        <div className="unchecked-manual-comparables">
          <Checkbox
            label="Unchecked Manual Comparables"
            onChange={() =>
              onCheckboxChange(
                'uncheckedManualComparables',
                !uncheckedManualComparables
              )
            }
            checked={uncheckedManualComparables}
          />
        </div>
        <button
          className="btn btn-small"
          onClick={() => setFormSubmitted(true)}
        >
          Export PDF
        </button>
      </div>
    </Modal>
  )
}

interface ChooseDeliveryProps {
  closeModal: () => void
  exportForm: {
    subjectPhotosType: string
    subjectListingSheets: boolean
    comparableType: string
    selectedCompPhotosType: string | null
    selectedCompListingSheets: boolean
    allCompPhotosType: string | null
    allCompListingSheets: boolean
    uncheckedManualComparables: boolean
  }
}

const defaultState = { emails: '' }

function ChooseDelivery({ closeModal, exportForm }: ChooseDeliveryProps) {
  const { auth } = useAuth()
  const [delivery, setDelivery] = useState('self')
  const [form, setForm] = useState({ ...defaultState })
  const [error, setError] = useState({ ...defaultState })
  const [alert, setAlert] = useState(null)

  const onSubmit = async () => {
    setAlert(null)
    let errorArr = []
    if (delivery !== 'self') {
      const emailArr = form.emails.split(/[ ,]+/)
      emailArr.forEach((address, i) => {
        const errorObj = validateForm({
          email: address
        })
        if (errorObj.email) {
          errorArr.push(errorObj.email)
        }
      })
      if (
        form.emails.match(/@/gi) &&
        form.emails.match(/@/gi).length > emailArr.length
      ) {
        errorArr.push('Emails should be comma separated')
      }
    }
    if (!errorArr.length) {
      let emailList = []
      if (delivery === 'self') {
        emailList.push(auth.user.email)
      } else {
        const emailArr = form.emails.split(',')
        emailList = [...emailArr]
      }
      try {
        const response = await exportPdf(emailList, exportForm)
        setAlert({ type: 'success', message: response })
      } catch (e) {
        setAlert({
          type: 'error',
          message: e.message
        })
      }
    } else {
      setError({
        emails: errorArr[0]
      })
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error.emails) {
      setError({ emails: '' })
    }
    setForm({
      emails: e.target.value
    })
  }

  const handleRadioChange = e => {
    if (e.target.value === 'self') {
      setForm({
        emails: ''
      })
      setError({
        emails: ''
      })
    }
    setDelivery(e.target.value)
  }

  return (
    <Modal closeModal={closeModal} title={''} width={600}>
      <Form id="exportPdf" onSubmit={onSubmit} alert={alert}>
        <h2 className="warning-header">Attention</h2>
        <p>
          Because of the size of this PDF, an email will be sent with a link to
          retrieve it.
        </p>
        <Radio
          value="self"
          checked={delivery === 'self'}
          onChange={e => handleRadioChange(e)}
          label={`Send the link to my email address: [${auth.user.email}]`}
          name="delivery"
        />
        <Radio
          value="other"
          checked={delivery === 'other'}
          onChange={e => handleRadioChange(e)}
          label={`Or you may choose to have this PDF delivered to the folllowing email addresses (commas separated):`}
          name="delivery"
        />
        <Input
          type="text"
          disabled={delivery === 'self'}
          value={form.emails}
          error={error.emails}
          label="Emails..."
          onChange={e => handleInput(e)}
        />
        <button className="btn login-button" type="submit">
          Deliver
        </button>
      </Form>
    </Modal>
  )
}
