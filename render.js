if (window.location.pathname.includes('chat.html')) {
    window.AI.start();

    function createSymbol() {
        const Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЫЭЮЯ';
        const matrix = document.getElementById('matrix');

        if (!matrix) return;

        const symbol = document.createElement('div');
        symbol.classList.add('symbol');
        symbol.textContent = Chars[Math.floor(Math.random() * Chars.length)];
        matrix.appendChild(symbol);

        symbol.style.left = `${Math.random() * 17.5}vw`;
        symbol.style.top = `0px`;
        symbol.style.fontSize = `2vw`;

        const speed = 2 + (Math.random() * 1.5);

        function fall() {
            const currentTop = parseFloat(symbol.style.top);
            symbol.style.top = `${currentTop + speed}px`;

            if (currentTop < window.innerHeight / 2) {
                requestAnimationFrame(fall);
            } else {
                symbol.remove();
            }
        }

        requestAnimationFrame(fall);
    }

    setInterval(createSymbol, 100);

    const input = document.getElementById('input');
    input.addEventListener('keyup', async e => {
        if (e.key === 'Enter') {
            const value = input.value;
            input.value = '';
            await window.AI.send(value);
        }
    })
}