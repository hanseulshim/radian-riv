import React, { useEffect, useState } from 'react'
import { withAuth } from 'context/auth/AuthRoute'
import { useValueProduct } from 'context/ValueProductProvider'
import Breadcrumbs from 'components/common/Breadcrumbs'
import Sidebar from 'components/Sidebar'
import { useRouter } from 'next/router'
import { getOrderInfo } from 'api'
import { getValueProductRoutes } from 'utils'
import Modal from 'components/common/Modal'

interface Props {
  children: React.ReactNode
}

function ValueProductLayout({ children }: Props) {
  const [hasError, setHasError] = useState(false)
  const { order, setOrder } = useValueProduct()
  const router = useRouter()
  const { orderId } = router.query

  useEffect(() => {
    const getOrder = async () => {
      if (orderId) {
        try {
          const orderInfo = await getOrderInfo(orderId as string)
          setOrder(orderInfo)
        } catch (e) {
          setHasError(true)
        }
      }
    }
    getOrder()
  }, [orderId])

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
    order && (
      <Sidebar
        routes={getValueProductRoutes(order.id)}
        label={order.address}
        parentPath={`/value-products`}
      >
        <div className="container value-product">
          <Breadcrumbs
            current={`${order.address}`}
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
