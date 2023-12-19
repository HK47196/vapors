export enum SortOption {
	relevance = 'relevance',
	dateNewOld = 'dateNewOld',
	dateOldNew = 'dateOldNew',
	priceLowHigh = 'priceLowHigh',
	priceHighLow = 'priceHighLow',
}

export type Game = {
	name: string,
	metacritic: number,
	released: string,
	platforms: string[],
	developers: string[],
	genres: string[],
	publishers: string[],
	esrb_rating: string,
	id: number,
	price: string,
};

export type Genres = Record<string, number>;