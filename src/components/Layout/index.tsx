import { ReactNode, useEffect, useState } from 'react'

import Link from 'next/link'
import { useAppContext } from '@/store'

import AnimatedCartTotal from '@/ui/AnimatedCartTotal'

type Props = {
	children: ReactNode;
};

const Layout = ({children}: Props) => {
	const appContext = useAppContext()
	const [cartTotal, setCartTotal] = useState(0)
	// NOTE: Prevent hydration error
	useEffect(() => {
		setCartTotal(appContext.cart.reduce((total, currentValue) => total + currentValue.recommendedRetailPrice * currentValue.quantity, 0))
	})
	return (
		<div className="container mx-auto px-4">
			<div className="flex justify-between border-1 border-gray-500 border-b p-5">
				<strong>Qogita</strong>
				<nav>
					<ul className="flex gap-4">
						<li>
							<Link href="/">
								<a className="underline">Products</a>
							</Link>
						</li>
						<li>
							<Link href="/cart">
								<a className="underline">Your Cart <AnimatedCartTotal value={cartTotal} currency="EUR"/></a>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			{children}
		</div>
	)
}

export default Layout
