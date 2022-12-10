import { ENV } from "../utils";

const getIdGame = async () => {
	const url = `${ENV.BASE_API}/${ENV.API_ROUTES.NEW_GAME}`;

	console.log(url)
	const res = await fetch(url);
	const data = await res.json();
	return data?.deck_id;
};

const getCards = async deckId => {
	const url = `${ENV.BASE_API}/${deckId}/draw/?count=2`;
	const res = await fetch(url);
	const data = await res.json();
	return data?.cards;
};

const DeckOfCardsAPI = {
	getIdGame,
	getCards,
};

export default DeckOfCardsAPI;
