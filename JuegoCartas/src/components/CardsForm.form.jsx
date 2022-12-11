/**
 * 
 * @param {Object} player Informacion del jugador
 * @param {Object} card Informacion de la carta a insertar
 * @returns 
 */
export async function sortCards(player, card) {

    const tempInfo = { ...player }

    const specialLetters = {
        ACE: 1,
        JACK: 11,
        QUEEN: 12,
        KING: 13
    }

    switch (card.suit) {
        case "SPADES":
            tempInfo.listCards.SPADES.push((() => {
                return card.value.search(/\d/) > -1 ? card.value : specialLetters[card.value]
            })());
            tempInfo.listCards.SPADES = tempInfo.listCards.SPADES.sort((a, b) => a - b);
            break;

        case "CLUBS":
            tempInfo.listCards.CLUBS.push((() => {
                return card.value.search(/\d/) > -1 ? card.value : specialLetters[card.value]
            })());
            tempInfo.listCards.CLUBS = tempInfo.listCards.CLUBS.sort((a, b) => a - b);

            break;

        case "DIAMONDS":
            tempInfo.listCards.DIAMONDS.push((() => {
                return card.value.search(/\d/) > -1 ? card.value : specialLetters[card.value]
            })());
            tempInfo.listCards.DIAMONDS = tempInfo.listCards.DIAMONDS.sort((a, b) => a - b);

            break;

        case "HEARTS":
            tempInfo.listCards.HEARTS.push((() => {
                return card.value.search(/\d/) > -1 ? card.value : specialLetters[card.value]
            })());
            tempInfo.listCards.HEARTS = tempInfo.listCards.HEARTS.sort((a, b) => a - b);

            break;
        default:
            break;
    }


    switch (card.value) {
        case "ACE":
            tempInfo.listCards["1"].push(card.suit);
            break;

        case "2":
            tempInfo.listCards["2"].push(card.suit);
            break;

        case "3":
            tempInfo.listCards["3"].push(card.suit);
            break;

        case "4":
            tempInfo.listCards["4"].push(card.suit);
            break;

        case "5":
            tempInfo.listCards["5"].push(card.suit);
            break;

        case "6":
            tempInfo.listCards["6"].push(card.suit);
            break;

        case "7":
            tempInfo.listCards["7"].push(card.suit);
            break;

        case "8":
            tempInfo.listCards["8"].push(card.suit);
            break;

        case "9":
            tempInfo.listCards["9"].push(card.suit);
            break;

        case "10":
            tempInfo.listCards["10"].push(card.suit);
            break;

        case "JACK":
            tempInfo.listCards["11"].push(card.suit);
            break;
        case "QUEEN":
            tempInfo.listCards["12"].push(card.suit);
            break;
        case "KING":
            tempInfo.listCards["13"].push(card.suit);
            break;
        default:
            break;
    }

    return tempInfo

}

export async function validateCollectCards(player){

}