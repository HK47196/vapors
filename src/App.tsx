import React, {useCallback, useEffect, useState} from 'react';
import SearchArea from './components/SearchArea';
import GameList from './components/GameList'; // Let's assume you have a component for listing games
import styles from './App.module.css';
import {Game, Genres, SortOption} from "./types";
import Sidebar from "./components/Sidebar";
// import Footer from './components/Footer'; // And a footer component


const formatter = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric', year: 'numeric'});

function fetchGamesFn() {
	let ac = new AbortController();
	return async function (url: string, setGamesList: (value: React.SetStateAction<Game[]>) => void, setGenres: (value: React.SetStateAction<Genres>) => void) {
		ac.abort();
		ac = new AbortController();
		const signal = ac.signal;
		try {
			const response = await fetch(url, {signal});
			const data = await response.json();
			const games = data.games;
			for (const game of games) {
				game.released = formatter.format(new Date(game.released));
			}
			setGamesList(data.games); // Update state with fetched data
			setGenres(data.genres);
		} catch (error) {
			//
		}
	};
}

const fetchGames = fetchGamesFn();

function getSearchUrl(searchTerm: string, sortOption: SortOption, genres: Set<string>, maxPrice: number) {
	if (genres.size === 0) {
		return `/api/search?term=${searchTerm}&sort=${sortOption}&maxPrice=${maxPrice}`;
	}
	const tags = Array.from(genres).map((tag) => `&tag=${tag}`).join('');
	return `/api/search?term=${searchTerm}&sort=${sortOption}&maxPrice=${maxPrice}${tags}`;
}

const App = () => {
	const [gamesList, setGamesList] = useState<Game[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [sortOption, setSortOption] = useState<SortOption>(SortOption.relevance);
	const [genres, setGenres] = useState<Genres>({});
	const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set<string>());
	const [maxSelectedPrice, setMaxSelectedPrice] = useState(100);

	// Called on mounting component, load our games.
	useEffect(() => {
		void fetchGames(getSearchUrl('', SortOption.relevance, selectedGenres, maxSelectedPrice), setGamesList, setGenres);
	}, []);


	const handleSearch = useCallback(function handleSearch(searchTerm: string) {
		setSearchTerm(searchTerm);
		void fetchGames(getSearchUrl(searchTerm, sortOption, selectedGenres, maxSelectedPrice), setGamesList, setGenres);
	}, [maxSelectedPrice, selectedGenres, sortOption]);

	const handleSortChange = useCallback(function handleSortChange(sortOption: string) {
		const sort = sortOption as SortOption;
		setSortOption(sort);
		void fetchGames(getSearchUrl(searchTerm, sort, selectedGenres, maxSelectedPrice), setGamesList, setGenres);
	}, [maxSelectedPrice, searchTerm, selectedGenres]);
	const onSidebarGenreSelect = useCallback((tag: string) => {
		if (!selectedGenres.delete(tag)) {
			selectedGenres.add(tag)
		}
		setSelectedGenres(new Set(selectedGenres));
		void fetchGames(getSearchUrl(searchTerm, sortOption, selectedGenres, maxSelectedPrice), setGamesList, setGenres);
	}, [maxSelectedPrice, searchTerm, selectedGenres, sortOption]);

	const handleMaxPriceChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const maxPrice = parseFloat(event.target.value);
		setMaxSelectedPrice(maxPrice);
		void fetchGames(getSearchUrl(searchTerm, sortOption, selectedGenres, maxPrice), setGamesList, setGenres);
	}, [searchTerm, selectedGenres, sortOption]);


	return (
		<div className={styles.appWrapper}>
			<div className={styles.app}>
				<SearchArea handleSearch={handleSearch} handleSortChange={handleSortChange} searchTerm={searchTerm}
										sortOption={sortOption}/>
				<main className={styles.mainContent}>
					<GameList games={gamesList}/>
					<Sidebar tags={genres} onTagSelect={onSidebarGenreSelect} selectedGenres={selectedGenres}
									 handleMaxPriceChange={handleMaxPriceChange} maxSelectedPrice={maxSelectedPrice}/>
				</main>
				{/*<Footer />*/}
			</div>
		</div>
	);
};

export default App;