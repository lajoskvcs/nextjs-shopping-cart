import Layout from '../components/Layout'
import ProductList from '../components/pages/products/ProductList'
import Pagination from '@/ui/Pagination'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { ProductsResponse } from '@/types'
import { fetcher } from '@/utils/fetcher'

function HomePage () {
	const router = useRouter()
	const { query } = router
	const page = query.page ? parseInt(query.page.toString()) : 1
	const { data, error } = useSWR<ProductsResponse>(`/api/products?page=${page}`, fetcher);

	const Paginator = ({error, data}: {error: any, data?: ProductsResponse}) => {
		if(error || !data) return (<></>)
		return (
			<div className="flex justify-center">
				<Pagination page={page} count={data.count} />
			</div>
		)
	}

	return (
		<Layout>
			<h1>Products</h1>
			<Paginator error={error} data={data} />
			<ProductList data={data} error={error} />
			<Paginator error={error} data={data} />
		</Layout>
	)
}

export default HomePage
