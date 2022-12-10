import { useState } from 'react';
import DeckOfCardsAPI from '../services/deckofcardsapi';
import GameContext from './GameContext';
import Swal from 'sweetalert2';
import 'animate.css';

const GameProvider = ({ children }) => {
	const [idGame, setIdGame] = useState(null);
	const [win, setWin] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [winName, setWinName] = useState('');
	const [alert, setAlert] = useState(false);

	/* --------------------------------- PLAYERS -------------------------------- */

	const [playerOne, setPlayerOne] = useState({
		name: '',
		cards: [],
		currentCards: 0,
	});
	const [playerTwo, setPlayerTwo] = useState({
		name: '',
		cards: [],
		currentCards: 0,
	});

	/* ---------------------------------- INIT ---------------------------------- */

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
console.log(idGame)
		if (idGame == null || !idGame) {
			window.location = window.location.origin
		}

		const currentreRemainingCards = await DeckOfCardsAPI.validateRemainingCards(idGame)
		if (currentreRemainingCards === 0) {
			Swal.fire({
				icon: 'info',
				title: 'There are no more cards in the pool, no player managed to win.',
				showConfirmButton: true,
				timer: 2500,
				showClass: {
					popup: 'animate__animated animate__fadeInDown'
				},
				hideClass: {
					popup: 'animate__animated animate__fadeOutUp'
				}
			}).then((result) => {
				if (result.isDismissed || result.isConfirmed) {
					window.location = window.location.origin
				}
			});
		} else {
				const cards = await DeckOfCardsAPI.getCards(idGame);
				setPlayerOne({
					...playerOne,
					cards: [...playerOne.cards, cards[0]],
					currentCards: (() => {
						return playerOne.currentCards + 1;
					})(),
				});
				setPlayerTwo({
					...playerTwo,
					cards: [...playerTwo.cards, cards[1]],
					currentCards: (() => {
						return playerTwo.currentCards + 1;
					})(),
				});

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
				alert,
				setAlert,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
