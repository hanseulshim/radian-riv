import React, { useEffect, useState } from 'react'
import { withAuth } from 'context/auth/AuthRoute'
import { useOrder } from 'context/OrderProvider'
import Breadcrumbs from 'components/common/Breadcrumbs'
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
          const order = await getOrder(+orderId)
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
    order.ordersId && (
      <div id="main">
        <div className="content value-product-property">
          <Breadcrumbs
            parents={[{ path: '/value-products', name: 'Value Products' }]}
            parentPath="/value-products"
            routes={getValueProductPropertyRoutes(order.ordersId)}
            label={`Order ID #${order.ordersId}`}
            current={`Order ID #${order.ordersId}`}
          />
          {children}
        </div>
      </div>
    )
  )
}

export default withAuth(OrderLayout)
