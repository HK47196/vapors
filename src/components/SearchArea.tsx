import SearchHeader from './SearchHeader';
import styles from './SearchArea.module.css';
import {SortOption} from "../types";

interface SearchAreaProps {
	handleSearch: (searchTerm: string) => void,
	handleSortChange: (sortOption: string) => void,
	searchTerm: string,
	sortOption: SortOption
}

const SearchArea = ({handleSearch, handleSortChange, searchTerm, sortOption}: SearchAreaProps) => {
	return (
		<div className={styles.searchArea}>
			<SearchHeader onSearch={handleSearch} onSortChange={handleSortChange} searchTerm={searchTerm}
										sortOption={sortOption}/>
			{/* Any other search-related components will go here */}
		</div>
	);
};

export default SearchArea;