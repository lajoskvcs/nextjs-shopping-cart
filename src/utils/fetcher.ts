export function fetcher (input: RequestInfo, init?: RequestInit): any {
	return fetch(input, init).then(res => res.json())
}
