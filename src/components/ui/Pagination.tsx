import { useRouter } from 'next/router'

const PAGE_SIZE = 20

type PaginationProps = {
	count: number
	page: number
}

function Pagination ({count, page}: PaginationProps) {
	const router = useRouter()

	const maxPageCount = Math.ceil(count / PAGE_SIZE)

	const goToPrevious = () => {
		if(page - 1 > 0)
			router.push(`/?page=${page - 1}`)
	}
	const goToNext = () => {
		if (page + 1 <= maxPageCount)
			router.push(`/?page=${page + 1}`)
	}
	const goTo = (page: number) => router.push(`/?page=${page}`)
	const previousButtons = (page > 1) ? (
		<button className="btn" onClick={() => goTo(page - 1)}>{page - 1}</button>
	) : null
	const nextButtons = (page < maxPageCount) ? (
		<button className="btn" onClick={() => goTo(page + 1)}>{page + 1}</button>
	) : null
	return (
		<div className="btn-group">
			<button className="btn" onClick={() => goToPrevious()}>«</button>
			{previousButtons}
			<button className="btn btn-disabled">{page}</button>
			{nextButtons}
			<button className="btn" onClick={() => goToNext()}>»</button>
		</div>
	)
}

export default Pagination
