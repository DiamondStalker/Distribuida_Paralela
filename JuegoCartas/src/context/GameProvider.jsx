import { useState } from 'react';
import DeckOfCardsAPI from '../services/deckofcardsapi';
import GameContext from './GameContext';

const GameProvider = ({ children }) => {
	const [idGame, setIdGame] = useState(null);
	const [win, setWin] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [winName, setWinName] = useState('');
	const [playerOne, setPlayerOne] = useState({
		name: '',
		cards: [],
	});
	const [playerTwo, setPlayerTwo] = useState({
		name: '',
		cards: [],
	});

	/**
	 * @async {DeckOfCardsAPI} Peticion que crea un juego nuevo 
	 * @global{SetIdGame} Guardamos el ID del juego en curso
	 */
	const playGame = async () => {
		setIdGame(await DeckOfCardsAPI.getIdGame());
	};

	/**
	 * Se realiza peticion a la api
	 * la cual devovlera 2 cartas las cuales seran
	 * repartidas entre ambos jugadores
	 */
	const requestCards = async () => {
		const cards = await DeckOfCardsAPI.getCards(idGame);
		setPlayerOne({ ...playerOne, cards: [...playerOne.cards, cards[0]] });
		setPlayerTwo({ ...playerTwo, cards: [...playerTwo.cards, cards[1]] });

		const findCardPlayerOne = playerOne.cards.find(
			card => card.value === cards[0].value
		);

		const findCardPlayerTwo = playerTwo.cards.find(
			card => card.value === cards[1].value
		);

		if (findCardPlayerOne || findCardPlayerTwo) {
			setWin(true);
			setShowToast(true);
			setWinName(findCardPlayerOne ? playerOne.name : playerTwo.name);
		}
	};

	return (
		<GameContext.Provider
			value={{
				playGame,
				requestCards,
				playerOne,
				setPlayerOne,
				playerTwo,
				setPlayerTwo,
				showToast,
				setShowToast,
				winName,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
