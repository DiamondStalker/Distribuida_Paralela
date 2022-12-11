const specialLetters = {
    ACE: "1",
    JACK: "11",
    QUEEN: "12",
    KING: "13"
}

const specialNumbers = {
    "1" : "A",
    "11": "J",
    "12": "Q",
    "13": "K"
}

/**
 * 
 * @param {Object} player Informacion del jugador
 * @param {Object} card Informacion de la carta a insertar
 * @returns 
 */
export async function sortCards(player, card) {

    const tempInfo = { ...player }

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

export async function validateCollectCards(player) {

    const tempInfo = { ...player };

    Object.keys(tempInfo.listCards).forEach((temp) => {

        if (tempInfo.listCards[temp].length === 3) {


            if (temp.search(/\d/gim) > -1) {// Validation for a third or fourth by letter value
                console.log('Se encontro una terna')

                if (Object.keys(tempInfo.threesomes1).length === 0 && Object.keys(tempInfo.threesomes2).shift() !== temp) {
                    tempInfo.threesomes1[`${temp}`] = tempInfo.listCards[temp];
                } else if (Object.keys(tempInfo.threesomes2).length === 0 && Object.keys(tempInfo.threesomes1).shift() !== temp) {
                    tempInfo.threesomes2[`${temp}`] = tempInfo.listCards[temp];
                }
            }
        }
        /* ------------- Validacion cuando hay mas de 4 cartas posibles ------------- */
        else if (tempInfo.listCards[temp].length > 3) {
            if (temp.search(/\d/gim) > -1) {// Validation for a third or fourth by letter value
                console.log('Se encontro una cuarta')

                if (Object.keys(tempInfo.quartet).length === 0) {
                    tempInfo.quartet[`${temp}`] = tempInfo.listCards[temp];

                    console.log('VaKeylor de terna 1')
                    console.log(Object.keys(tempInfo.threesomes1).shift())

                    console.log('Key de terna 2')
                    console.log(Object.keys(tempInfo.threesomes2).shift())

                    console.log('Key actual')
                    console.log(temp)
                    /* ----- En caso de encontrar una cuarta validamos la ternas anteriores ----- */
                    /* ------------ en caso de que coincida una, reiniciamos su valor ----------- */
                    if (Object.keys(tempInfo.threesomes1).shift() === temp) {
                        console.log('Reiniciamos el valor de la terna 1')
                        delete tempInfo.threesomes1[`${temp}`]
                    }
                    if (Object.keys(tempInfo.threesomes2).shift() === temp) {
                        console.log('Reiniciamos el valor de la terna 2')
                        delete tempInfo.threesomes2[`${temp}`]
                    }
                }
            }
        }

    });
    return tempInfo
}
/**
 * 
 * @param {Object} list of winning cards
 * @returns String with the html of the calculated images
 */
export function calculateUrlImg(list) {

    const key = Object.keys(list).shift()

    let text = "";

    list[key].forEach(x => {
        if (key.search(/d/gmi) == -1) {
            text += `<img src="https://deckofcardsapi.com/static/img/${(() => { return key === "1"||key === "11"|key === "12" ? specialNumbers[key] : key})()}${x.charAt(0)}.png" alt="Girl in a jacket" height="50">  \t   `
        }
    })

    return text;

}