import React, { useEffect, useState } from 'react'
import { withAuth } from 'context/auth/AuthRoute'
import { useOrder } from 'context/OrderProvider'
import Breadcrumbs from 'components/common/Breadcrumbs'
import Sidebar from 'components/Sidebar'
import { useRouter } from 'next/router'
import { getOrder } from 'api'
import { getValueProductPropertyRoutes } from 'utils'
import Modal from 'components/common/Modal'

interface Props {
  children: React.ReactNode
}

function OrderLayout({ children }: Props) {
  const [hasError, setHasError] = useState(false)
  const { order, setOrder } = useOrder()
  const router = useRouter()
  const { orderId } = router.query

  useEffect(() => {
    const getCurrentOrder = async () => {
      if (orderId) {
        try {
          const order = await getOrder(orderId as string)
          console.log(order)
          setOrder(order)
        } catch (e) {
          console.log(e)
          setHasError(true)
        }
      }
    }
    getCurrentOrder()
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
    order.id && (
      <Sidebar
        routes={getValueProductPropertyRoutes(order.id)}
        label={order.address}
        parentPath={`/value-products`}
      >
        <div className="container value-product-property">
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

export default withAuth(OrderLayout)
