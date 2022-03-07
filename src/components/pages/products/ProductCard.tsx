import Image from 'next/image'
import { Product } from '@/types'
import styles from './ProductCard.module.scss'
import { useRouter } from 'next/router'

type ProductComponentProps = {
	data: Product
}

export default function ProductCard({ data }: ProductComponentProps) {
	const router = useRouter()

	const navigateToProductPage = (gtin: string) => router.push(`/${gtin}`)

	return (
		<div className={`${styles.productCard}`} onClick={() => navigateToProductPage(data.gtin)}>
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