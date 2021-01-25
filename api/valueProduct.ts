export const getOrderInfo = async (
  orderId: string
): Promise<{ id: string; address: string }> => {
  if (!orderId) return null
  return {
    id: orderId,
    address: '18324 Tapwood Road'
  }
}
