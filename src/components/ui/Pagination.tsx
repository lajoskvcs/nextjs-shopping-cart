import Link from 'next/link'

const PAGE_SIZE = 20

type PaginationProps = {
	count: number
	page: number
}

function Pagination ({count, page}: PaginationProps) {
	const maxPageCount = Math.ceil(count / PAGE_SIZE)
	const previousButtons = (page > 1) ? (
		<Link href={`/?page=${page - 1}`}><a className="btn">{page - 1}</a></Link>
	) : null
	const nextButtons = (page < maxPageCount) ? (
		<Link href={`/?page=${page + 1}`}><a className="btn">{page + 1}</a></Link>
	) : null
	return (
		<div className="btn-group">
			<Link href={(page - 1 > 0) ? `/?page=${page - 1}` : `/?page=${page}`}><a className="btn">«</a></Link>
			{previousButtons}
			<a className="btn btn-disabled">{page}</a>
			{nextButtons}
			<Link href={(page + 1 <= maxPageCount) ? `/?page=${page + 1}` : `/?page=${page}`}><a className="btn">»</a></Link>
		</div>
	)
}

export default Pagination
