import { ReactNode, useEffect, useState } from 'react'

import Link from 'next/link'
import { useAppContext } from '@/store'

import AnimatedCartTotal from '@/ui/AnimatedCartTotal'
import { useRouter } from 'next/router'

type Props = {
	children: ReactNode;
};

const Layout = ({children}: Props) => {
	const router = useRouter()
	const appContext = useAppContext()
	const [cartTotal, setCartTotal] = useState(0)
	// NOTE: Prevent hydration error
	useEffect(() => {
		setCartTotal(appContext.cart.reduce((total, currentValue) => total + currentValue.recommendedRetailPrice * currentValue.quantity, 0))
	})
	return (
		<div className="container mx-auto px-4">
			<div className="navbar bg-base-100">
				<div className="navbar-start">
					<a className="normal-case text-xl">Qogita</a>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal p-0">
						<li><Link href="/"><a className={(router.route === '/') ? 'active' : ''}>Products</a></Link></li>
					</ul>
				</div>
				<div className="navbar-end">
					<div className="indicator">
						<AnimatedCartTotal value={cartTotal} currency="EUR"/>
						<Link href="/cart">
							<a className={`btn ${(router.route === '/cart') ? 'btn-primary' : ''}`}>
								Your Cart
							</a>
						</Link>
					</div>
				</div>
			</div>
			{children}
		</div>
	)
}

export default Layout
