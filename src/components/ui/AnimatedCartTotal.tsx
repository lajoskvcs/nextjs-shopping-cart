import { useEffect, useState } from 'react'
import anime from 'animejs'
import { roundFn } from '@/utils/roundFn'

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
			update: function() {
				setDisplayValue(roundFn(targetObject.displayValue))
			}
		})
	}, [value])

	return <span className="indicator-item indicator-bottom badge badge-secondary">{displayValue}€</span>
}

export default AnimatedCartTotal
