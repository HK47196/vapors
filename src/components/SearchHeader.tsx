import React from 'react';
import styles from './SearchHeader.module.css';
import {SortOption} from "../types";

interface SearchHeaderProps {
	onSearch: (searchTerm: string) => void,
	onSortChange: (sortOption: string) => void,
	searchTerm: string,
	sortOption: SortOption
}

const SearchHeader = ({onSearch, onSortChange, searchTerm, sortOption}: SearchHeaderProps) => {
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onSearch(event.target.value);
	};

	const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const searchTerm = formData.get("searchTerm") as string;
		onSearch(searchTerm);
	};

	const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onSortChange(event.target.value);
	};
	return (
		<header className={styles.header}>
			<form onSubmit={handleSearchSubmit} className={styles.searchForm}>
				<input
					type="text"
					placeholder="Enter search term"
					value={searchTerm}
					onChange={handleSearchChange}
					className={styles.searchInput}
					name={"searchTerm"}
				/>
				<button type="submit" className={`${styles.searchButton}`}>Search</button>
			</form>
			<div>
				<label htmlFor="sortSelect" className={styles.sortLabel}>
					Sort By
				</label>
				<select value={sortOption} onChange={handleSortChange} className={styles.sortSelect} name={"sortSelect"}>
					<option value={SortOption.relevance}>Relevance</option>
					<option value={SortOption.dateNewOld}>Release Date Newest</option>
					<option value={SortOption.dateOldNew}>Release Date Oldest</option>
					<option value={SortOption.priceLowHigh}>Price: Low to High</option>
					<option value={SortOption.priceHighLow}>Price: High to Low</option>
					{/* Add other sort options as needed */}
				</select>
			</div>
		</header>
	);
};

export default SearchHeader;