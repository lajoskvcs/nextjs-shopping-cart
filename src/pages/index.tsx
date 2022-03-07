import Layout from '../components/Layout'
import ProductList from '../components/pages/products/ProductList'

function HomePage () {
	return (
		<Layout>
			<h1>Products</h1>
			<ProductList />
		</Layout>
	)
}

export default HomePage
