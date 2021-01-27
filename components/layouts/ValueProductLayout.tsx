import React, { useEffect, useState } from 'react'
import { withAuth } from 'context/auth/AuthRoute'
import { useValueProduct } from 'context/ValueProductProvider'
import Breadcrumbs from 'components/common/Breadcrumbs'
import Sidebar from 'components/Sidebar'
import { useRouter } from 'next/router'
import { getPropertyInfo } from 'api'
import { getValueProductRoutes } from 'utils'
import Modal from 'components/common/Modal'

interface Props {
  children: React.ReactNode
}

function ValueProductLayout({ children }: Props) {
  const [hasError, setHasError] = useState(false)
  const { propertyInfo, setPropertyInfo } = useValueProduct()
  const router = useRouter()
  const { propertyInfoId } = router.query

  useEffect(() => {
    const getOrder = async () => {
      if (propertyInfoId) {
        try {
          const propertyInfo = await getPropertyInfo(propertyInfoId as string)
          setPropertyInfo(propertyInfo)
        } catch (e) {
          setHasError(true)
        }
      }
    }
    getOrder()
  }, [propertyInfoId])

  const toggleErrorModal = () => {
    setHasError(!hasError)
  }
  if (hasError) {
    return (
      <Modal title="Error" closeModal={toggleErrorModal}>
        <div>Something went wrong.</div>
      </Modal>
    )
  }

  return (
    propertyInfo.id && (
      <Sidebar
        routes={getValueProductRoutes(propertyInfo.id)}
        label={propertyInfo.address}
        parentPath={`/value-products`}
      >
        <div className="container value-product">
          <Breadcrumbs
            current={`${propertyInfo.address}`}
            parents={[{ path: '/value-products', name: 'Value Products' }]}
          >
            <img
              className="icon"
              style={{ marginLeft: 10 }}
              src={`${process.env.baseUrl}/images/edit-property-info.svg`}
              alt="logo"
            />
          </Breadcrumbs>
          {children}
        </div>
      </Sidebar>
    )
  )
}

export default withAuth(ValueProductLayout)
