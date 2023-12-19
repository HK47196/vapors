import React, {useCallback, useEffect, useState} from 'react';
import SearchArea from './components/SearchArea';
import GameList from './components/GameList'; // Let's assume you have a component for listing games
import styles from './App.module.css';
import {Game, Genres, SortOption} from "./types";
import Sidebar from "./components/Sidebar";
import Pagination from "./components/Pagination.tsx";
// import Footer from './components/Footer'; // And a footer component


const formatter = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
const GAMES_PER_PAGE = 20;

function fetchGamesFn() {
	let ac = new AbortController();
	return async function (url: string, setGamesList: (value: React.SetStateAction<Game[]>) => void,
												 setGenres: (value: React.SetStateAction<Genres>) => void,
												 setTotalPages: (value: React.SetStateAction<number>) => void) {
		ac.abort();
		ac = new AbortController();
		const signal = ac.signal;
		try {
			const response = await fetch(url, {signal});
			const data = await response.json();
			const games: Game[] = data.games as Game[];
			for (const game of games) {
				game.released = formatter.format(new Date(game.released));
			}
			setGamesList(games); // Update state with fetched data
			setGenres(data.genres);

			const totalPages = data.numPages as number;
			setTotalPages(totalPages);
		} catch (error) {
			//
		}
	};
}

const fetchGames = fetchGamesFn();

function getSearchUrl(searchTerm: string, sortOption: SortOption, genres: Set<string>, maxPrice: number, page: number) {
	let tags = '';
	if (genres.size !== 0) {
		tags = Array.from(genres).map((tag) => `&tag=${tag}`).join('');
	}
	return `/api/search?term=${searchTerm}&sort=${sortOption}&maxPrice=${maxPrice}&pg=${page}${tags}`;
}

const App = () => {
	const [gamesList, setGamesList] = useState<Game[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [sortOption, setSortOption] = useState<SortOption>(SortOption.relevance);
	const [genres, setGenres] = useState<Genres>({});
	const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set<string>());
	const [maxSelectedPrice, setMaxSelectedPrice] = useState(100);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(1);

	// Called on mounting component, load our games.
	useEffect(() => {
		void fetchGames(getSearchUrl(searchTerm, sortOption, selectedGenres, maxSelectedPrice, currentPage), setGamesList, setGenres, setTotalPages);
	}, [currentPage, maxSelectedPrice, searchTerm, selectedGenres, sortOption]);

	useEffect(() => {
		if (currentPage > totalPages) {
			setCurrentPage(totalPages);
		}
	}, [currentPage, totalPages]);


	const handleSearch = useCallback(function handleSearch(searchTerm: string) {
		setSearchTerm(searchTerm);
	}, []);

	const handleSortChange = useCallback(function handleSortChange(sortOption: string) {
		const sort = sortOption as SortOption;
		setSortOption(sort);
	}, []);
	const onSidebarGenreSelect = useCallback((tag: string) => {
		if (!selectedGenres.delete(tag)) {
			selectedGenres.add(tag)
		}
		setSelectedGenres(new Set(selectedGenres));
	}, [selectedGenres]);

	const handleMaxPriceChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const maxPrice = parseFloat(event.target.value);
		setMaxSelectedPrice(maxPrice);
	}, []);

	const onPaginationPageChange = useCallback((page: number) => {
		setCurrentPage(page);
	}, []);


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
				<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPaginationPageChange}/>
			</div>
		</div>
	);
};

export default App;