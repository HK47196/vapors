import {createServer, Model, Response} from 'miragejs';
import rawGames from './game_info.json';
import {ModelDefinition} from "miragejs/-types";
import {Game, SortOption} from "./types";
import {tryParseInt} from "./utils";

const GAMES_PER_PAGE = 20;
type RawGame = {
	name: string,
	metacritic: number,
	released: string,
	platforms: string[],
	developers: string[],
	genres: string[],
	publishers: string[],
	esrb_rating: string,
	id: number,
	price: number,
};

type GameExtra = Game & {
	rawDate: number,
};


const GameModel: ModelDefinition<Game> = Model.extend({});

const games: GameExtra[] = rawGames.map((rawGame: RawGame) => {
	return {
		name: rawGame.name,
		metacritic: rawGame.metacritic,
		released: rawGame.released,
		rawDate: new Date(rawGame.released).valueOf(),
		platforms: rawGame.platforms,
		developers: rawGame.developers,
		genres: rawGame.genres,
		publishers: rawGame.publishers,
		esrb_rating: rawGame.esrb_rating,
		id: rawGame.id,
		price: rawGame.price.toFixed(2),
	};
});
const numericCollator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});

const compareFns: Record<SortOption, (a: GameExtra, b: GameExtra) => number> = {
	//TODO: relevance?? Just sorting by score for now.
	[SortOption.relevance]: (a, b) => b.metacritic - a.metacritic,
	[SortOption.dateNewOld]: (a, b) => b.rawDate - a.rawDate,
	[SortOption.dateOldNew]: (a, b) => a.rawDate - b.rawDate,
	[SortOption.priceHighLow]: (a, b) => numericCollator.compare(b.price, a.price),
	[SortOption.priceLowHigh]: (a, b) => numericCollator.compare(a.price, b.price),
};

// TODO: this is for reference.
// Drop the fields we don't actually need to send.
// const processedGames = filteredGames.map((game) => {
// 	const {rawDate, ...rest} = game;
// 	return {
// 		...rest,
// 	};
// });
const sortedGames: Record<SortOption, Game[]> = {
	[SortOption.relevance]: Array.from(games).sort(compareFns[SortOption.relevance]),
	[SortOption.dateNewOld]: Array.from(games).sort(compareFns[SortOption.dateNewOld]),
	[SortOption.dateOldNew]: Array.from(games).sort(compareFns[SortOption.dateOldNew]),
	[SortOption.priceHighLow]: Array.from(games).sort(compareFns[SortOption.priceHighLow]),
	[SortOption.priceLowHigh]: Array.from(games).sort(compareFns[SortOption.priceLowHigh]),
};

const genres = rawGames.flatMap((game) => game.genres).filter((genre, index, self) => self.indexOf(genre) === index).sort();

export function makeServer({environment = 'development'} = {}) {
	return createServer({
		environment,

		models: {
			game: GameModel,
		},

		routes() {
			this.namespace = 'api';
			this.get('/search', (_, request) => {
				const searchString = request.url.substring(request.url.indexOf('?') + 1);
				const searchParams = new URLSearchParams(searchString);
				const tags = searchParams.getAll('tag');
				const maxPriceStr = searchParams.get('maxPrice');
				const maxPrice = maxPriceStr ? parseFloat(maxPriceStr) : 100;

				let term = searchParams.get('term') ?? '';
				const sortBy = searchParams.get('sort') as SortOption;
				const pgParam = request.queryParams.pg as string | null;
				const pg = Math.max(tryParseInt(pgParam, 0), 0);

				let filteredGames = sortedGames[sortBy];

				// TODO: Room for optimization: only need to filter up to pgSize * pg + pgSize

				// Implement search filtering
				if (term) {
					term = term.toLowerCase();
					filteredGames = filteredGames.filter((game) => game.name.toLowerCase().includes(term));
				}

				//TODO: genres, tags, …
				if (tags.length > 0) {
					filteredGames = filteredGames.filter((game) => tags.every((tag) => game.genres.includes(tag)));
				}
				filteredGames = filteredGames.filter((game) => Number(game.price) <= maxPrice);

				// Go through filteredGames, get number of games for each genre.
				const filteredGenreCounts: Record<string, number> = {};
				for (const genre of genres) {
					filteredGenreCounts[genre] = 0;
				}
				filteredGames.forEach((game) => {
					game.genres.forEach((genre) => {
						filteredGenreCounts[genre] = (filteredGenreCounts[genre] ?? 0) + 1;
					});
				});

				const pgSize = GAMES_PER_PAGE;
				const numPages = Math.floor(filteredGames.length / pgSize);
				const start = pgSize * pg;
				const processedGames = filteredGames.slice(start, start + pgSize);
				return new Response(200, {}, {games: processedGames, genres: filteredGenreCounts, numPages});
			});
		},
	});
}