import currency from 'currency.js';

export const calcTotal = (items: ICalcTotalItem[]) => {
	let totalQty = 0;
	let totalPrice = 0;

	for (const {qty, price} of items) {
		totalQty += qty;
		totalPrice += price;
	}
	return {
		qty: totalQty,
		price: totalPrice
	};
};

export const calcFinalPrice = (basicPrice: string|number, discountAmount:number|string|null = null, discountPercent:number|string|null = null) => {
	let finalPrice = currency(basicPrice);

	if (discountPercent) {
		const multiply = currency(1).subtract(currency(discountPercent,{fromCents: true}));
		finalPrice = finalPrice.multiply(multiply);
	}

	if (discountAmount) {
		finalPrice = finalPrice.subtract(discountAmount);
	}

	return finalPrice;
};

export const calcTotalPrice = (finalPrice: number|string, qty: number) => {
	return currency(finalPrice).multiply(qty * 1).format();
};

interface ICalcTotalItem {
	qty: number;
	price: number;
}