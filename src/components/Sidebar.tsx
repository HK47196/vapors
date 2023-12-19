import styles from './Sidebar.module.css';
import {Genres} from "../types.ts";
import PriceSlider from "./PriceSlider.tsx";
import GameTags from "./GameTags.tsx";

interface SidebarProps {
	tags: Genres;
	onTagSelect: (tag: string) => void; // Function to call when a tag is selected
	selectedGenres: Set<string>;
}

function Sidebar({tags, onTagSelect, selectedGenres}: SidebarProps) {
	const handlePriceChange = (maxPrice: number) => {
		console.log(`Price range selected: ${maxPrice}`);
	};

	return (
		<aside className={styles.sidebar}>
			<PriceSlider maxPrice={100} onPriceChange={handlePriceChange}/>
			<GameTags tags={tags} onTagSelect={onTagSelect} selectedGenres={selectedGenres}/>
		</aside>
	);
}

export default Sidebar;