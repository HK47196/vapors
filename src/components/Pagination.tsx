import styles from './Pagination.module.css';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination = ({currentPage, totalPages, onPageChange}: PaginationProps) => {
	const goToFirst = () => {
		onPageChange(0);
	};
	const goToLast = () => {
		onPageChange(totalPages);
	};
	const goToPrevious = () => {
		onPageChange(Math.max(0, currentPage - 1));
	};

	const goToNext = () => {
		onPageChange(Math.min(totalPages, currentPage + 1));
	};

	// You can also create page number buttons here if needed

	return (
		<div className={styles.pagination}>
			<button onClick={goToFirst} disabled={currentPage <= 0}>
				«
			</button>
			<button onClick={goToPrevious} disabled={currentPage <= 0}>
				Prev
			</button>
			<span>
				{/* Current page is 0-indexed, but users will expect it to be 1-indexed. */}
				Page {currentPage + 1} of {totalPages + 1}
      </span>
			<button onClick={goToNext} disabled={currentPage >= totalPages}>
				Next
			</button>
			<button onClick={goToLast} disabled={currentPage >= totalPages}>
				»
			</button>
		</div>
	);
};

export default Pagination;