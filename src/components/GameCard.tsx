import styles from './GameCard.module.css';

interface GameCardProps {
	name: string;
	image: string;
	releaseDate: string;
	reviewScore: number;
	price: string;
}

const GameCard = ({name, image, releaseDate, reviewScore, price}: GameCardProps) => {
	const reviewStyle = {
		color: "#B84B47"
	};
	if (reviewScore >= 75) {
		reviewStyle.color = "rgb(118 155 112)";
	} else if (reviewScore >= 50) {
		reviewStyle.color = "#D19B73";
	}
	return (
		<div className={styles.gameCard}>
			<img src={image} alt={name} className={styles.gameImage}/>
			<span className={styles.gameName}>{name}</span>
			<span className={styles.gameReleaseDate}>{releaseDate}</span>
			<span className={styles.reviewScore} style={reviewStyle}>{reviewScore}%</span>
			<span className={styles.gamePrice}>${price}</span>
			{/* Add more details if needed */}
		</div>
	);
};

export default GameCard;