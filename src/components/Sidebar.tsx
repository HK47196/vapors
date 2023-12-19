import styles from './Sidebar.module.css';
import {Genres} from "../types.ts";
import PriceSlider from "./PriceSlider.tsx";

interface SidebarProps {
	tags: Genres;
	onTagSelect: (tag: string) => void; // Function to call when a tag is selected
	selectedGenres: Set<string>;
}

function Sidebar({tags, onTagSelect, selectedGenres}: SidebarProps) {
	const keys = Object.keys(tags);
	keys.sort((a, b) => {
		if (selectedGenres.has(a) && !selectedGenres.has(b)) {
			return -1;
		} else if (!selectedGenres.has(a) && selectedGenres.has(b)) {
			return 1;
		}
		return a.localeCompare(b);
	});
	const handlePriceChange = (maxPrice: number) => {
		console.log(`Price range selected: ${maxPrice}`);
		// Update the state or perform actions based on the price change
	};

	return (
		<aside className={styles.sidebar}>
			<PriceSlider maxPrice={100} onPriceChange={handlePriceChange}/>
			<div className={styles.tagSection}>
				<div className={styles.tagHeader}>Narrow by tag</div>
				<div className={styles.tagsWrapper}>
					{keys.map((tag, ix) => (
						<button
							key={ix}
							onClick={() => onTagSelect(tag)}
							role={"checkbox"}
							aria-checked={selectedGenres.has(tag)}
							className={`${styles.tagButton}`}
						>
							{tag} ({tags[tag]})
						</button>
					))}
				</div>
			</div>
		</aside>
	);
}

export default Sidebar;