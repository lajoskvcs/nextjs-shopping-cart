import ProductList from '../components/pages/products/ProductList'
import Pagination from '@/ui/Pagination'
import { useRouter } from 'next/router'
import Error from 'next/error'
import useSWR from 'swr'
import { ProductsResponse } from '@/types'
import { fetcher, FetcherError } from '@/utils/fetcher'

function ProductListContainer ({ data, page }: { data?: ProductsResponse, page: number }) {
	if(!data) return <></>

	const Paginator = ({count}: {count: number}) => {
		return (
			<div className="flex justify-center">
				<Pagination page={page} count={count} />
			</div>
		)
	}

	return (
		<>
			<Paginator count={data.count} />
			<ProductList data={data} />
			<Paginator count={data.count} />
		</>
	)
}

function HomePage () {
	const router = useRouter()
	const { query } = router
	const page = query.page ? parseInt(query.page.toString()) : 1
	const { data, error } = useSWR<ProductsResponse, FetcherError>(`/api/products?page=${page}`, fetcher);

	if (error) return <Error statusCode={error.status} />

	const displayContainer = (!data) ? <div>loading...</div> : <ProductListContainer data={data} page={page} />

	return (
		<>
			<div className="flex justify-end mt-5">
				<div>
					<span>Items per page: 20</span>
				</div>
			</div>
			{displayContainer}
		</>
	)
}

export default HomePage
