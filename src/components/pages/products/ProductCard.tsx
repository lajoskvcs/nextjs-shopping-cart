import Image from 'next/image'
import { Product } from '@/types'
import styles from './ProductCard.module.scss'

type ProductComponentProps = {
	data: Product
}

export default function ProductCard({ data }: ProductComponentProps) {
	console.log({styles})
	return (
		<div className={styles.productCard}>
			<div className={styles.productCardImage}>
				<Image
					src={data.imageUrl}
					alt={data.name}
					width={400}
					height={400}
				/>
			</div>
			<div className={styles.productCardName}>{data.name}</div>
			<div className={styles.productCardPrice}>{ data.recommendedRetailPrice } {data.recommendedRetailPriceCurrency}</div>
		</div>
	)
}
