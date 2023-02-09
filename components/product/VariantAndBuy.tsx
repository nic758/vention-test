import {useState} from 'react';
import {IProductVariant} from 'boundless-api-client';
import ProductVariantPicker from './VariantPicker';
import ProductPriceAndBuy from './PriceAndBuy';
import clsx from 'clsx';
import {CSSTransition} from 'react-transition-group';

export default function ProductVariantAndBuy({product, onAddedToCart}:any) {
	const [selectedVariant, setSelectedVariant] = useState<null | IProductVariant>();
	const [error, setError] = useState<null | string>(null);
	const [showAnimation, setShowAnimation] = useState(false);

	const triggerError = (error: string | null) => {
		setShowAnimation(Boolean(error));
		setError(error);
	};

	const onCaseChange = (value: {}, variant?: IProductVariant) => {
		setSelectedVariant(variant ? variant : null);
		setError(null);
	};

	return (
		<div className={'variant-and-buy'}>
			{product.has_variants &&
				<div className={clsx('variant-and-buy__variants', {'has-error': error})}>
					<CSSTransition
						in={showAnimation}
						timeout={1000}
						onEntered={() => setShowAnimation(false)}
						classNames={{
							enterActive: 'animate__animated animate__shakeX',
						}}
					>
						<ProductVariantPicker
							extendedVariants={product.extendedVariants!}
							onChange={onCaseChange}
						/>
					</CSSTransition>
					{error && <div className={'variant-and-buy__error'}>{error}</div>}
					<hr className='variant-and-buy__hr' />
				</div>}
			<ProductPriceAndBuy
				product={product}
				selectedVariant={selectedVariant}
				setError={triggerError}
				onAddedToCart={onAddedToCart}
			/>
		</div>
	);
}