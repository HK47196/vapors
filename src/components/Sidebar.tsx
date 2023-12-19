import styles from './Sidebar.module.css';
import {Genres} from "../types.ts";
import PriceSlider from "./PriceSlider.tsx";
import GameTags from "./GameTags.tsx";
import React from "react";

interface SidebarProps {
	tags: Genres,
	onTagSelect: (tag: string) => void,
	selectedGenres: Set<string>,
	handleMaxPriceChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
	maxSelectedPrice: number
}

function Sidebar({tags, onTagSelect, selectedGenres, handleMaxPriceChange, maxSelectedPrice}: SidebarProps) {
	return (
		<aside className={styles.sidebar}>
			<PriceSlider maxPrice={100} handleMaxPriceChange={handleMaxPriceChange} maxSelectedPrice={maxSelectedPrice}/>
			<GameTags tags={tags} onTagSelect={onTagSelect} selectedGenres={selectedGenres}/>
		</aside>
	);
}

export default Sidebar;