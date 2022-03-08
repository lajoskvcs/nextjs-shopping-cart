import { CartItem } from '@/types'
import Image from 'next/image'
import { useAppContext } from '@/store'
import { roundFn } from '@/utils/roundFn'

type CartItemsProps = {
	cart: CartItem[]
}

function CartItems({cart}: CartItemsProps) {
	const appContext = useAppContext()
	const items = cart.map(cartItem => {
		return (
			<tr>
				<td>
					<div className="flex items-center space-x-3">
						<div className="avatar">
							<div className="mask mask-squircle w-12 h-12">
								<Image
									src={cartItem.imageUrl}
									alt={cartItem.name}
									width={100}
									height={100}
								/>
							</div>
						</div>
						<div>
							<div className="font-bold">{cartItem.name}</div>
							<div className="text-sm opacity-50">{cartItem.gtin}</div>
						</div>
					</div>
				</td>
				<td>
					<span className="badge badge-ghost badge-sm">Brand: {cartItem.brandName}</span>
					<br/>
					<span className="badge badge-ghost badge-sm">Category: {cartItem.categoryName}</span>
				</td>
				<td>{cartItem.quantity}</td>
				<td>{cartItem.recommendedRetailPrice} {cartItem.recommendedRetailPriceCurrency}</td>
				<th>
					<div className="flex justify-between">
						<button className="btn btn-info btn-xs" onClick={() => appContext.decreaseItemQuantityInTheCart(cartItem.gtin)}>-</button>
						<button className="btn btn-info btn-xs" onClick={() => appContext.increaseItemQuantityInTheCart(cartItem.gtin)}>+</button>
					</div>
					<button className="btn btn-error btn-xs w-full" onClick={() => appContext.removeItemFromTheCart(cartItem.gtin)}>Remove</button>
				</th>
			</tr>
		)
	})

	const cartTotal = roundFn(cart.reduce((total, cartItem) => total + cartItem.quantity * cartItem.recommendedRetailPrice, 0))
	return (
		<div className="overflow-x-auto w-full">
			<table className="table w-full">
				<thead>
				<tr>
					<th>Name</th>
					<th>Additional info</th>
					<th>Quantity</th>
					<th>Price</th>
					<th>
						{
							(cart.length) ? <button className="btn btn-error btn-xs w-full" onClick={() => appContext.removeAllItemsFromTheCart()}>Remove All</button> : ''
						}
					</th>
				</tr>
				</thead>
				<tbody>
				{items}
				</tbody>
				<tfoot>
				<tr>
					<th></th>
					<th></th>
					<th></th>
					<th>Total: {cartTotal} EUR</th>
					<th></th>
				</tr>
				</tfoot>

			</table>
			<div className="flex justify-end mt-5">
				{
					(cart.length) ? <button className="btn btn-primary">Checkout</button> : ''
				}
			</div>
		</div>
	)
}

export default CartItems
