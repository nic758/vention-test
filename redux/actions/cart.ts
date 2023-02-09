import {
	addToCart,
	setCartInited,
	setInitStatus,
	showVariantModal,
	TCartInited
} from '../reducers/cart';
import {AppThunk} from '../store';
import Cookie from 'js-cookie';
import {showErrorAlert} from '../reducers/alert';
import {IProduct} from 'boundless-api-client';

export const initCart = (): AppThunk => async (dispatch, getState) => {
	const {cartInited} = getState().cart;
	if ([TCartInited.yes, TCartInited.processing].includes(cartInited)) {
		return;
	}

	dispatch(setInitStatus(TCartInited.processing));
	try {
		const cartInfo = await getCartByCookieOrRetrieve();
		Cookie.set('boundless_cart_id', cartInfo.id, {expires: 365, sameSite: 'None', secure: true});

		dispatch(setCartInited(cartInfo));
	} catch (err) {
		console.error(err);
		dispatch(setInitStatus(TCartInited.no));
	}
};

export const getCartByCookieOrRetrieve = async () => {
	const id = Math.random().toString(36).substring(2, 8);
	Cookie.set('boundless_cart_id', id);

	return {
		id: id,
		created_at: Date.now(),
		total: {
			qty: 0,
			total: 0
		}
	};
};

export const addItem2Cart = (product: IProduct): AppThunk => async (dispatch, getState) => {
	try {
		const cart = getState().cart;
		
		if (!cart.cartId) {
			dispatch(showErrorAlert('Error loading cart'));
			return;
		}


		dispatch(showVariantModal({product}));
	} catch (err) {
		console.error(err);
	}
};

export const updateItem2Cart = (product: IProduct, qty: number =1) : AppThunk => async (dispatch) => {
	let newPrice = 0;
	if (product != null && product.price != null){
		newPrice = product.price.min == null ? 0 : product.price.min;
	}
	const price = newPrice * qty;
	dispatch(addToCart({total: price, qty: qty, product: product}));	
};