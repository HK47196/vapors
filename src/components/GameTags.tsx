import styles from "./GameTags.module.css";
import {Genres} from "../types.ts";

interface GameTagsProps {
	tags: Genres;
	onTagSelect: (tag: string) => void; // Function to call when a tag is selected
	selectedGenres: Set<string>;
}

function GameTags({tags, onTagSelect, selectedGenres}: GameTagsProps) {
	const keys = Object.keys(tags);
	keys.sort((a, b) => {
		if (selectedGenres.has(a) && !selectedGenres.has(b)) {
			return -1;
		} else if (!selectedGenres.has(a) && selectedGenres.has(b)) {
			return 1;
		}
		return a.localeCompare(b);
	});
	return (
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
	);
}

export default GameTags;