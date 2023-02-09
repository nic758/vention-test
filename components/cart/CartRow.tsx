import Link from 'next/link';
import {formatMoney} from '../../lib/formatter';
import {getCartImg} from '../../lib/imgs';
import NoImage from '../NoImage';
import {TThumbRatio} from '../../@types/image';
import {IProductInCart} from '../../redux/reducers/cart';

export default function CartRow({item, rmItem}: ICartRowProps) {
	const imgPath = item.product?.images?.find(x => x.is_default);
	
	const imgElement = imgPath
		? <img src={getCartImg(imgPath.path)}
			alt={item.product?.title}
		/>
		: <NoImage ratio={TThumbRatio['1-1']} className={'bg-xs'} />;

	return (
		<div className='cart-item row'>
			<div className='cart-item__description-col col-md-4'>
				<Link href='/'>
					<a className='cart-item__img-link'>
						{imgElement}
					</a>
				</Link>
				<div className='cart-item__title'>
					<div>
						<Link href='/'>
							{item.product?.title || ''}
						</Link>
					</div>
				</div>
			</div>
			<div className='cart-item__col col-md-2'>
				<span className='cart-items__label'><strong>Price: </strong></span>
				{formatMoney(item.product?.price?.min || 0)}
			</div>
			<div className='cart-item__col cart-item__col_qty col-md-2'>
				<span className='cart-items__label'><strong>Qty: </strong></span>
				<div className='cart-item__qty-input input-group input-group-sm'>
					<input
						type='number'
						className='form-control form-control-sm text-center'
						name={`qty[${item.product?.item_id}]`}
						value={item.qty}
						min={1}
						disabled
					/>
				</div>
			</div>
			<div className='cart-item__col col-md-2'>
				<span className='cart-items__label'><strong>Total: </strong></span>
				{formatMoney((item.product?.price?.min || 0) * item.qty)}</div>
			<div className='cart-item__col cart-item__col_rm col-md-2'>
				<button
					className='btn btn-sm btn-outline-secondary'
					onClick={rmItem}
				>
					Remove
				</button>
			</div>
		</div >
	);
}

interface ICartRowProps {
	item: IProductInCart;
	rmItem: () => void;
}