import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { Product, CartItem } from '@/types'
import { fetchCartFromStorage, saveCartToStorage } from '@/utils/cartSessionStorage'

interface AppContextInterface {
	cart: CartItem[]
	previousProductPage: number | null
	setPreviousProductPage: Dispatch<SetStateAction<number | null>>
	addItemToTheCart: (product: Product, quantity: number) => void
}

const AppContext = createContext<AppContextInterface>({
	cart: [],
	previousProductPage: null,
	setPreviousProductPage: () => {},
	addItemToTheCart: (product: Product, quantity: number) => {}
})

type AppContextProviderProps = {
	children: ReactNode
}

export function AppContextProvider({ children }: AppContextProviderProps) {
	const [cart, setCart] = useState<CartItem[]>([])

	if (typeof window !== 'undefined') {
		setCart(fetchCartFromStorage())
	}


	const addItemToTheCart = function (product: Product, quantity: number) {
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

	const [previousProductPage, setPreviousProductPage] = useState<number | null>(null)
	return (
		<AppContext.Provider
			value={{
				cart,
				previousProductPage,
				setPreviousProductPage,
				addItemToTheCart
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
