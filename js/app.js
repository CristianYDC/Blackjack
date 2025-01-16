let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0;
let puntosIa = 0;

// Referencias Html.
const btnNewGame = document.querySelector(".new-game");
const btnAskCard = document.querySelector(".ask-card");
const btnStopCard = document.querySelector(".stop-card");
const sumarPuntosJugador = document.getElementById("puntosJugador");
const sumarPuntosIa = document.getElementById("puntosIa");
const cardsJugador = document.getElementById("cardsJugador");
const cardsIa = document.getElementById("cardsIa");

// Crea baraja;
const crearDeck = () => {
	for (let i = 2; i <= 10; i++) {
		for (let tipo of tipos) {
			deck.push(i + tipo);
		}
	}
	for (let tipo of tipos) {
		for (let esp of especiales) {
			deck.push(esp + tipo);
		}
	}
	deck = _.shuffle(deck);
};

crearDeck();

// Pedir carta
const pedirCarta = () => {
	if (deck.length === 0) {
		throw "No hay mas cartas en el deck";
	}
	const carta = deck.pop();
	return carta;
};

// Toma valor carta.
const valorCarta = (carta) => {
	const valor = carta.substring(0, carta.length - 1);
	return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

// Turno IA

const turnoIA = (puntosMinimo) => {
	do {
		const carta = pedirCarta();
		puntosIa += valorCarta(carta);
		let creaCarta = document.createElement("img");
		creaCarta.src = `./assets/cards/${carta}.png`;
		creaCarta.classList.add("game__card");
		sumarPuntosIa.textContent = puntosIa;
		cardsIa.append(creaCarta);
		if (puntosMinimo > 21) {
			break;
		}
	} while (puntosIa < puntosMinimo && puntosMinimo <= 21);

	setTimeout(() => {
		if (puntosJugador === puntosIa) {
			alert("Nadie Gana!!!");
		} else if (puntosJugador > 21) {
			alert("Gana la IA!!!");
		} else if (puntosIa > 21) {
			alert("El jugador Gana!!!");
		} else {
			alert("La IA Gana!!!");
		}
	}, 100);
};

// Eventos.

btnAskCard.addEventListener("click", () => {
	const carta = pedirCarta();
	puntosJugador += valorCarta(carta);
	sumarPuntosJugador.textContent = puntosJugador;
	let creaCarta = document.createElement("img");
	creaCarta.src = `./assets/cards/${carta}.png`;
	cardsJugador.append(creaCarta);
	creaCarta.classList.add("game__card");

	if (puntosJugador > 21) {
		console.warn("Jugador Perdio");
		btnAskCard.disabled = true;
		btnStopCard.disabled = true;
		turnoIA(puntosJugador);
	} else if (puntosJugador === 21) {
		console.warn("Ganaste!!!");
		pedirCarta.disabled = true;
		btnStopCard.disabled = true;
		turnoIA(puntosJugador);
	}
});

btnStopCard.addEventListener("click", () => {
	btnAskCard.disabled = true;
	btnStopCard.disabled = true;
	turnoIA(puntosJugador);
});

// Reiniciar.
btnNewGame.addEventListener("click", () => {
	deck = [];
	crearDeck();
	puntosJugador = 0;
	puntosIa = 0;
	sumarPuntosJugador.textContent = "0";
	sumarPuntosIa.textContent = "0";
	btnAskCard.disabled = false;
	btnStopCard.disabled = false;
	cardsJugador.innerHTML = "";
	cardsIa.innerHTML = "";
});
