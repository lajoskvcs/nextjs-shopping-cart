import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

interface AppContextInterface {
	cart: any[]
	previousProductPage: number | null
	setPreviousProductPage: Dispatch<SetStateAction<number | null>>
}

const AppContext = createContext<AppContextInterface>({
	cart: [],
	previousProductPage: null,
	setPreviousProductPage: () => {}
})

type AppContextProviderProps = {
	children: ReactNode
}

export function AppContextProvider({ children }: AppContextProviderProps) {
	const [cart, setCart] = useState([])
	const [previousProductPage, setPreviousProductPage] = useState<number | null>(null)
	return (
		<AppContext.Provider
			value={{
				cart,
				previousProductPage,
				setPreviousProductPage
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
