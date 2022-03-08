import { useEffect, useState } from 'react'
import anime from 'animejs'

type AnimatedCartTotalProps = {
	value: number
	currency: string
}

function AnimatedCartTotal({value, currency}: AnimatedCartTotalProps) {
	const [displayValue, setDisplayValue] = useState<number>(0)
	useEffect(() => {
		const targetObject = {displayValue}
		anime({
			targets: targetObject,
			displayValue: value,
			easing: 'easeInOutQuad',
			round: 4,
			update: function() {
				setDisplayValue(targetObject.displayValue)
			}
		})
	}, [value])

	return <span className="indicator-item indicator-bottom badge badge-secondary">{displayValue}€</span>
}

export default AnimatedCartTotal
