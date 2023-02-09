import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICartProduct, ICartTotal, IProduct, IVwItem} from 'boundless-api-client';

export interface CartState {
	cartId: string;
	total: any | null;
	showVariantModal: boolean;
	variantModalData: any;
	showCall2Order: boolean;
	call2OrderData: ICall2OrderData;
	submitting: boolean;
	cartInited: TCartInited;
	products: IProductInCart[];
}

export enum TCartInited {
	'no',
	'processing',
	'yes'
}

const initialState: CartState = {
	cartId: 'undefined',
	total: null,
	showVariantModal: false,
	variantModalData: {},
	showCall2Order: false,
	call2OrderData: {},
	submitting: false,
	cartInited: TCartInited.no,
	products:[]
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		removeProduct: (state, action) => {
			state.products = state.products.filter(p => p.product?.item_id != action.payload);
		},
		addToCart: (state, action: PayloadAction<any>) => {
			if(state.total == null){
				state.total = {
					total:0,
					qty:0,
				};
				return;
			}

			state.total.qty += action.payload.qty;
			state.total.total += action.payload.total;

			for(let i=0; i<state.products.length; i++){
				if (state.products[i].product?.item_id == action.payload.product?.item_id){
					state.products[i].qty += action.payload.qty;
					return;
				}
			}

			state.products.push({
				qty:action.payload.qty,
				product:action.payload.product
			});
		},
		setCartTotal: (state, action: PayloadAction<ICartTotal>) => {
			state.total = action.payload;
		},
		showVariantModal: (state, action: PayloadAction<any>) => {
			state.showVariantModal = true;
			state.variantModalData = action.payload;
		},
		hideVariantModal: (state) => {
			state.showVariantModal = false;
			state.variantModalData = {};
		},
		showCall2Order: (state, action: PayloadAction<any>) => {
			state.showCall2Order = true;
			state.call2OrderData = action.payload;
		},
		hideCall2Order: (state) => {
			state.showCall2Order = false;
			state.call2OrderData = {};
		},
		setCartSubmitting: (state, action: PayloadAction<boolean>) => {
			state.submitting = action.payload;
		},
		setInitStatus: (state, action: PayloadAction<TCartInited>) => {
			state.cartInited = action.payload;
		},
		setCartInited: (state, action: PayloadAction<{id: string, total: ICartTotal}>) => {
			state.cartId = action.payload.id;
			state.total = action.payload.total;
			state.cartInited = TCartInited.yes;
		}
	},
});

export const {
	addToCart,
	removeProduct,
	setCartTotal,
	showVariantModal,
	hideVariantModal,
	showCall2Order,
	hideCall2Order,
	setCartSubmitting,
	setInitStatus,
	setCartInited
} = cartSlice.actions;

export default cartSlice.reducer;

export interface IVariantModalData {
	product?: ICartProduct;
}

export interface ICall2OrderData {
	qty?: number;
	item?: IVwItem;
}

export interface IProductInCart {
	qty:number,
	product: IProduct | null
}