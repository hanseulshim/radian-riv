import { withAuth } from 'context/auth/AuthRoute'
import Breadcrumbs from 'components/common/Breadcrumbs'
import Sidebar from 'components/Sidebar'
import Link from 'next/link'

function ValueProducts() {
  return (
    <Sidebar routes={[]} label="Value Products" parentPath="/">
      <div className="container">
        <Breadcrumbs current="Value Products" />
        <h1>Value Products</h1>
        <Link href="/value-products/31130765-5">
          <a>18324 Tapwood Road</a>
        </Link>
      </div>
    </Sidebar>
  )
}

export default withAuth(ValueProducts)
