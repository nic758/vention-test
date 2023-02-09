import currency from 'currency.js';

export function formatMoney(amount: number|string|null): string {
	if (!amount) return '$0.00';

	return new currency(amount).format();
}

export function getCurrencySymbol() {
	return new currency(0, {pattern: '!'}).format();
}