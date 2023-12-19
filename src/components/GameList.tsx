import GameCard from './GameCard';
import styles from './GameList.module.css';
import {Game} from "../types";


interface GameListProps {
	games: Game[]; // This will be the list of games to display
}

function GameList({games}: GameListProps) {
	return (
		<div className={styles.gameList}>
			{games.map((game) => (
				<GameCard
					//TODO
					image={""}
					key={game.id}
					name={game.name}
					releaseDate={game.released}
					reviewScore={game.metacritic}
					price={game.price}
					// Pass other properties as needed
				/>
			))}
		</div>
	);
}

export default GameList;