import styles from './Sidebar.module.css';
import {Genres} from "../types.ts";

interface SidebarProps {
	tags: Genres;
	onTagSelect: (tag: string) => void; // Function to call when a tag is selected
	selectedGenres: Set<string>;
}

function Sidebar({tags, onTagSelect, selectedGenres}: SidebarProps) {
	const keys = Object.keys(tags);
	return (
		<aside className={styles.sidebar}>
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