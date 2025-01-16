document.querySelectorAll(".game__card").forEach((card) => {
	card.addEventListener("mousemove", (e) => {
		// Obtener las dimensiones y posición de la carta.
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left; // Posición X del mouse dentro de la carta.
		const y = e.clientY - rect.top; // Posición Y del mouse dentro de la carta.

		// Calcular valores de transformación
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		const rotateX = ((y - centerY) / centerY) * 20; // Máximo de 20 grados de inclinación.
		const rotateY = ((x - centerX) / centerX) * -20;

		// Aplicar transformación y sombra dinámicamente.
		card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
		card.style.boxShadow = `${(x - centerX) / 10}px ${(y - centerY) / 10}px 20px rgba(0, 0, 0, 0.4)`;
	});

	card.addEventListener("mouseleave", () => {
		// Restaurar la posición y sombra con transición suave.
		card.style.transform = "rotateX(0) rotateY(0)";
		card.style.boxShadow = "0 0px 0px rgba(0, 0, 0, 0)";
	});
});
