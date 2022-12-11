import { useState } from 'react';
import DeckOfCardsAPI from '../services/deckofcardsapi';
import GameContext from './GameContext';
import Swal from 'sweetalert2';
import 'animate.css';
import { sortCards, validateCollectCards , calculateUrlImg } from '../components/CardsForm.form';

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
		listCards: {
			SPADES: [],
			DIAMONDS: [],
			HEARTS: [],
			CLUBS: [],
			1: [],
			2: [],
			3: [],
			4: [],
			5: [],
			6: [],
			7: [],
			8: [],
			9: [],
			10: [],
			11: [],
			12: [],
			13: []
		},
		threesomes1: {},
		threesomes2: {},
		quartet: {},
	});
	const [playerTwo, setPlayerTwo] = useState({
		name: '',
		cards: [],
		currentCards: 0,
		listCards: {
			SPADES: [],
			DIAMONDS: [],
			HEARTS: [],
			CLUBS: [],
			1: [],
			2: [],
			3: [],
			4: [],
			5: [],
			6: [],
			7: [],
			8: [],
			9: [],
			10: [],
			11: [],
			12: [],
			13: []
		},
		threesomes1: {},
		threesomes2: {},
		quartet: {},
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
	 * Request is made to api
	 * which will return 2 cards which will be
	 * shared by both players
	 */
	const requestCards = async () => {
		if (idGame == null || !idGame) {
			window.location = window.location.origin;
		}

		const currentreRemainingCards = await DeckOfCardsAPI.validateRemainingCards(
			idGame
		);

		/* ------------------- Si ya no hay mas cartas en el maso ------------------- */
		if (currentreRemainingCards === 0) {
			Swal.fire({
				icon: 'info',
				title: 'There are no more cards in the pool, no player managed to win.',
				showConfirmButton: true,
				timer: 2500,
				showClass: {
					popup: 'animate__animated animate__fadeInDown',
				},
				hideClass: {
					popup: 'animate__animated animate__fadeOutUp',
				},
			}).then(result => {
				if (result.isDismissed || result.isConfirmed) {
					window.location = window.location.origin;
				}
			});
		} else {

			/* ------------------ Aun hay cartas en el maso para jugar ------------------ */
			const cards = await DeckOfCardsAPI.getCards(idGame);

			if (playerOne.currentCards === 10) {
				console.log(
					'Los jugadores ya tienen 10 cartas y no pueden tener mas de 10'
				);
			}

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


			await sortCards(playerOne, cards[0]);
			await sortCards(playerTwo, cards[1]);


			await validateCollectCards(playerOne);
			await validateCollectCards(playerTwo);


			if (Object.keys(playerOne.threesomes1).length !== 0 && Object.keys(playerOne.threesomes2).length !== 0 && Object.keys(playerOne.quartet).length !== 0) {
				setWin(true);
				setShowToast(true);
				setWinName(playerOne.name);

				Swal.fire({
					icon: 'success',
					title: 'Winner',
					text: `El jugador ${playerOne.name} es el ganador`,
					html : `<h1>Player name ${playerOne.name}</h1> <hr>threesomes1 ${calculateUrlImg(playerOne.threesomes1)} <br> threesomes2 ${calculateUrlImg(playerOne.threesomes2)} <br> quartet ${calculateUrlImg(playerOne.quartet)} <br>`,
					showConfirmButton: true,
					timer: 10000,
					showClass: {
						popup: 'animate__animated animate__fadeInDown',
					},
					hideClass: {
						popup: 'animate__animated animate__fadeOutUp',
					},
				}).then(result => {
					if (result.isDismissed || result.isConfirmed) {
						window.location = window.location.origin;
					}
				});

			}else if (Object.keys(playerTwo.threesomes1).length !== 0 && Object.keys(playerTwo.threesomes2).length !== 0 && Object.keys(playerTwo.quartet).length !== 0) {
				setWin(true);
				setShowToast(true);
				setWinName(playerTwo.name);

				Swal.fire({
					icon: 'success',
					title: 'Winner',
					text: `<h1>Player name ${playerTwo.name}</h1> <hr>El jugador ${playerTwo.name} es el ganador <br> jajaj`,
					html : ` threesomes1 ${calculateUrlImg(playerTwo.threesomes1)} <br> threesomes2 ${calculateUrlImg(playerTwo.threesomes2)} <br> quartet ${calculateUrlImg(playerTwo.quartet)} <br>`,
					showConfirmButton: true,
					timer: 10000,
					showClass: {
						popup: 'animate__animated animate__fadeInDown',
					},
					hideClass: {
						popup: 'animate__animated animate__fadeOutUp',
					},
				}).then(result => {
					if (result.isDismissed || result.isConfirmed) {
						window.location = window.location.origin;
					}
				});
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
