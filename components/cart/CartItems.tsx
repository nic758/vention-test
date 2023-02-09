import {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {useAppDispatch} from '../../hooks/redux';
import CartRow from './CartRow';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons/faShoppingCart';
import {IProductInCart, removeProduct} from '../../redux/reducers/cart';

export default function CartItems({items, setItems, total}: ICartItemsProps) {
	const dispatch = useAppDispatch();
	const mounted = useRef(false);
	const [submitting, setSubmitting] = useState(false);

	const rmItem = (itemId: number|undefined) => {
		if (!confirm('Are you sure?')) return;

		setSubmitting(true);
		setItems(prevItems => prevItems.filter(el => el.product?.item_id !== itemId));
		dispatch(removeProduct(itemId));
		
	};

	useEffect(() => {
		mounted.current = true;
		return () => {
			mounted.current = false;
		};
	}, []);

	return (
		<>
			<div className='cart-items'>
				<div className='cart-items__thead row'>
					<div className='cart-items__thead-cell col-md-4'></div>
					<div className='cart-items__thead-cell col-md-2'>Price</div>
					<div className='cart-items__thead-cell col-md-2'>Qty</div>
					<div className='cart-items__thead-cell col-md-2'>Total</div>
					<div className='cart-items__thead-cell col-md-2'></div>
				</div>
				{items.map(item => (
					<CartRow
						item={item}
						rmItem={() => rmItem(item.product?.item_id)} key={item.product?.item_id}
					/>
				))}
				<div className='cart-items__total-row row'>
					<div className='cart-items__total-cell cart-items__total-cell_title col-md-6'>Order Total:</div>
					<div className='cart-items__total-cell col-md-2'>
						<span className='cart-items__label'>Qty: </span>
						{total.qty}
					</div>
					<div className='cart-items__total-cell col-md-2'>
						<span className='cart-items__label'>Price: </span>
						{total.price}
					</div>
				</div>
			</div>
			<div className='cart-items__actions'>
				<button
					className='btn btn-action btn-lg btn-anim'
					disabled={submitting}
				>
					Proceed to checkout <FontAwesomeIcon icon={faShoppingCart} />
				</button>
			</div>
		</>
	);
}

interface ICartItemsProps {
	items: IProductInCart[];
	setItems: Dispatch<SetStateAction<IProductInCart[]>>;
	total: {qty: number, price: number | null}
}