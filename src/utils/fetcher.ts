export class FetcherError extends Error {
	info: any
	status: number
	constructor(info: any, status: number) {
		super('An error occurred while fetching the data.')
		this.info = info
		this.status = status
	}
}

export async function fetcher (input: RequestInfo, init?: RequestInit): Promise<any> {
	const res = await fetch(input, init)

	if (!res.ok) {
		const info = await res.json()
		throw new FetcherError(info, res.status)
	}

	return res.json()
}
