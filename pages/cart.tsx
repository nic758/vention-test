import {useEffect, useMemo, useState} from 'react';
import CartItems from '../components/cart/CartItems';
import {useAppDispatch} from '../hooks/redux';
import MainLayout from '../layouts/Main';
import {IProductInCart, setCartTotal, TCartInited} from '../redux/reducers/cart';
import {useCart} from '../hooks/cart';
import {IMenuItem} from '../@types/components';
import {GetServerSideProps} from 'next';
import CartLoader from '../components/cart/CartLoader';
import Link from 'next/link';
import {calcTotal} from '../lib/calculator';

export default function CartPage({mainMenu, footerMenu}: ICartPageProps) {
	const dispatch = useAppDispatch();
	const {cartInited, products} = useCart();
	const [items, setItems] = useState<IProductInCart[]>(products);
	const [loading] = useState(false);
	
	const total = useMemo(() => calcTotal(items.map(el => ({
		qty: el.qty,
		price: el.product?.price?.min!* el.qty
	}))), [items]);

	useEffect(() => {
		dispatch(setCartTotal({
			qty: total.qty,
			total: total.price
		}));
	}, [total]); //eslint-disable-line


	return (
		<MainLayout mainMenu={mainMenu} footerMenu={footerMenu} noIndex>
			<div className='container'>
				<div className='cart-page row'>
					<div className='col-lg-8 offset-lg-2'>
						<h1 className='page-heading page-heading_h1  page-heading_m-h1'>Shopping cart</h1>
						<div className='cart-page__content'>
							{(loading || cartInited === TCartInited.processing)
								? <CartLoader />
								: items.length > 0
									? <CartItems items={items} setItems={setItems} total={total}/>
									: <>
										<p className='cart-page__warning'>
											Your shopping cart is empty.
										</p>
										<p className='cart-page__warning'>
											<Link href='/'>
												<a className='btn btn-success'>Go shopping!</a>
											</Link>
										</p>
									</>}
						</div>
					</div>
				</div>
			</div>
		</MainLayout >
	);
}

export const getServerSideProps: GetServerSideProps<ICartPageProps> = async () => {
	const mainMenu: IMenuItem[] = await (await fetch('http://localhost:3000/api/menu/main')).json();
	const footerMenu: IMenuItem[] = await (await fetch('http://localhost:3000/api/menu/footer')).json();
	
	return {
		props: {
			mainMenu,
			footerMenu
		}
	};
};

interface ICartPageProps {
	mainMenu: IMenuItem[];
	footerMenu: IMenuItem[];
}