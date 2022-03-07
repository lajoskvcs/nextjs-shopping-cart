import { CartItem } from '@/types'

const SESSION_KEY = 'tech_challange_cart_key'

export function fetchCartFromStorage() {
	const cart = window.sessionStorage.getItem(SESSION_KEY)
	if(!cart) {
		return []
	}
	return JSON.parse(cart)
}

export function saveCartToStorage(cart: CartItem[]) {
	window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(cart))
}
