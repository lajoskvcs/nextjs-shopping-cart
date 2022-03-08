import CartItems from '@/pageComponents/cart/CartItems'
import { useAppContext } from '@/store'

const CartPage = () => {
	const appContext = useAppContext()
	return (
		<>
			<div className="flex justify-center mt-12">
				<ul className="steps">
					<li className="step step-primary">Cart items</li>
					<li className="step">Personal info</li>
					<li className="step">Shipping options</li>
					<li className="step">Payment options</li>
					<li className="step">Checkout summary</li>
					<li className="step">🥳</li>
				</ul>
			</div>
			<div className="mt-12">
				<CartItems cart={appContext.cart}/>
			</div>
		</>
	)
}

export default CartPage;
