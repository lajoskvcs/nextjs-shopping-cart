import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { Product, CartItem } from '@/types'
import { fetchCartFromStorage, saveCartToStorage } from '@/utils/cartSessionStorage'

interface AppContextInterface {
	cart: CartItem[]
	previousProductPage: number | null
	setPreviousProductPage: Dispatch<SetStateAction<number | null>>
	addItemToTheCart: (product: Product, quantity: number) => void
	removeAllItemsFromTheCart: () => void
	removeItemFromTheCart: (gtin: string) => void
	increaseItemQuantityInTheCart: (gtin: string) => void
	decreaseItemQuantityInTheCart: (gtin: string) => void
}

const AppContext = createContext<AppContextInterface>({
	cart: [],
	previousProductPage: null,
	setPreviousProductPage: () => {},
	addItemToTheCart: (product: Product, quantity: number) => {},
	removeAllItemsFromTheCart: () => {},
	removeItemFromTheCart: (gtin: string) => {},
	increaseItemQuantityInTheCart: (gtin: string) => {},
	decreaseItemQuantityInTheCart: (gtin: string) => {}
})

type AppContextProviderProps = {
	children: ReactNode
}

export function AppContextProvider({ children }: AppContextProviderProps) {
	let initialCartState = []
	if (typeof window !== 'undefined') {
		initialCartState = fetchCartFromStorage()
	}

	const [cart, setCart] = useState<CartItem[]>(initialCartState)

	const addItemToTheCart = (product: Product, quantity: number) => {
		const productIndex = cart.findIndex(cartItem => cartItem.gtin === product.gtin)
		const newCart: CartItem[] = []
		newCart.push(...cart)
		if(productIndex === -1) {
			newCart.push(Object.assign({}, product, { quantity }))
		} else {
			newCart[productIndex].quantity += quantity
		}
		setCart(newCart)
		saveCartToStorage(newCart)
	}

	const removeAllItemsFromTheCart = () => {
		setCart([])
		saveCartToStorage([])
	}

	const removeItemFromTheCart = (gtin: string) => {
		const productIndex = cart.findIndex(cartItem => cartItem.gtin === gtin)
		if(productIndex === -1) return

		const newCart: CartItem[] = []
		newCart.push(...cart)
		newCart.splice(productIndex, 1)
		setCart(newCart)
		saveCartToStorage(newCart)
	}
	const increaseItemQuantityInTheCart = (gtin: string) => {
		const productIndex = cart.findIndex(cartItem => cartItem.gtin === gtin)
		if(productIndex === -1) return
		const newCart: CartItem[] = []
		newCart.push(...cart)
		newCart[productIndex].quantity += 1
		setCart(newCart)
		saveCartToStorage(newCart)
	}
	const decreaseItemQuantityInTheCart = (gtin: string) => {
		const productIndex = cart.findIndex(cartItem => cartItem.gtin === gtin)
		if(productIndex === -1) return
		const newCart: CartItem[] = []
		newCart.push(...cart)
		if(newCart[productIndex].quantity - 1 <= 0) {
			newCart.splice(productIndex, 1)
		} else {
			newCart[productIndex].quantity -= 1
		}
		setCart(newCart)
		saveCartToStorage(newCart)
	}

	const [previousProductPage, setPreviousProductPage] = useState<number | null>(null)
	return (
		<AppContext.Provider
			value={{
				cart,
				previousProductPage,
				setPreviousProductPage,
				addItemToTheCart,
				removeAllItemsFromTheCart,
				removeItemFromTheCart,
				increaseItemQuantityInTheCart,
				decreaseItemQuantityInTheCart
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export function useAppContext(): AppContextInterface {
	const context = useContext(AppContext)

	if (!context)
		throw new Error('useAppContext must be used inside a `AppContextProvider`')

	return context
}
