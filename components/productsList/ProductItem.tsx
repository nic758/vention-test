import {IProduct} from 'boundless-api-client';
import clsx from 'clsx';
import {useAppDispatch} from '../../hooks/redux';
import {addItem2Cart} from '../../redux/actions/cart';
import ProductListImage from './ProductImage';
import ProductPrice from './ProductPrice';
import {TQuery} from '../../@types/common';
import Link from 'next/link';
import ProductLabels from '../product/Labels';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartPlus} from '@fortawesome/free-solid-svg-icons/faCartPlus';
import NoImage from '../NoImage';
import {productImgRatio} from '../../lib/imgs';
import {TThumbRatio} from '../../@types/image';
import {useState} from 'react';
import Rating from '@mui/material/Rating';

export default function ProductItem({product, query, categoryId}: IProductItemProps) {
	const params = {...query};
	if (categoryId && categoryId !== product.default_category?.category_id) {
		Object.assign(params, {category: categoryId});
	}
	const [rating, setValue] = useState(product.rating);
	const update = async (_event:any, newValue:any) =>{
		const id = product.item_id;
		const r = await fetch(`${window.location.origin}/api/products`, {method:'PATCH', body:JSON.stringify({item_id:id,rating:newValue})});
		if (r.status == 200){
			setValue(newValue == null ? 0 : newValue);
		}
	};

	return (
		<li
			className={clsx('products__item', {'in-stock': product.in_stock, 'out-of-stock': !product.in_stock})}
			data-id={product.product_id}
			itemScope
			itemType='//schema.org/Product'
		>
			<div className='products__item-wrapper'>
				<ProductImage product={product}/>
				<h4 className='products__title'>
					<Link href='/'>
						<a itemProp='url'>
							<span itemProp='name'>{product.title}</span>
						</a>
					</Link>
				</h4>
				<div className='products__offer'>
					{product.price && <ProductPrice price={product.price} />}
					<Rating name='simple-controlled' value={rating} onChange={update}/>
				</div>
				<Product2Cart product={product} />
			</div>
			<ProductSchemaOrgMarkup product={product} />
		</li>
	);
}

function Product2Cart({product}: {product: IProduct}) {
	const dispatch = useAppDispatch();
	return (
		<div className='products__to-cart'>
			{product.in_stock
				? <button
					type='button'
					className='btn btn-action btn-resp-size'
					onClick={()=>{
						dispatch(addItem2Cart(product));
					}}
				>
					<FontAwesomeIcon icon={faCartPlus} /> Add to cart
				</button>
				: <span className={'text-muted'}>Out of stock</span>
			}
		</div>
	);
}

function ProductImage({product}: {product: IProduct}) {
	const img = product.images!.find(({is_default}) => is_default);

	return (
		<Link href='/'>
			<a className={'products__image'}>
				{img
					? <ProductListImage image={img} alt={img.alt || product.title} />
					: <NoImage ratio={productImgRatio || TThumbRatio['1-1']} />
				}
				<ProductLabels labels={product.labels!}
											 className={'product__labels_small product__labels_column'}

				/>
			</a>
		</Link>
	);
}

function ProductSchemaOrgMarkup({product}: {product: IProduct}) {
	const schemaAvailability = product.in_stock ? '//schema.org/InStock' : '//schema.org/OutOfStock';

	return (
		<>
			<meta itemProp='productID' content={String(product.product_id)} />
			<meta itemProp='brand' content={product.manufacturer?.title || ''} />
			<meta itemProp='sku' content={product.sku || ''} />
			{product.price &&
			(product.price?.min
					?
					<div itemProp='offers' itemScope itemType='//schema.org/AggregateOffer'>
						<meta itemProp='lowPrice' content={String(product.price.min)} />
						<meta itemProp='highPrice' content={String(product.price.max)} />
						<meta itemProp='priceCurrency' content={product.price.currency_alias?.toUpperCase()} />
						<link itemProp='availability' href={schemaAvailability} />
					</div>
					:
					<div itemProp='offers' itemScope itemType='//schema.org/Offer'>
						<meta itemProp='price' content={String(product.price.value)} />
						<meta itemProp='priceCurrency' content={product.price.currency_alias?.toUpperCase()} />
						<link itemProp='availability' href={schemaAvailability} />
					</div>
			)
			}
		</>
	);
}

interface IProductItemProps {
	product: IProduct | any;
	query: TQuery;
	categoryId?: number;
}