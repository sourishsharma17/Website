const canvas = document.querySelector('.glitch .matrix');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width/fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x ++ ) {
	rainDrops[x] = 1;
}

const draw = () => {
	context.fillStyle = 'rgba(0, 0, 0, 0.05)';
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = '#0F0';
	context.font = fontSize + 'px monospace';

	if (rainDrops[0]*fontSize >= canvas.height*0.95) {
		window.clearInterval(matrix);
		clear();
		return;
	}

	for(let i = 0; i < rainDrops.length; i++) {
		const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
		context.fillText(text, i*fontSize, rainDrops[i]*fontSize);

		if (rainDrops[i]*fontSize > canvas.height && i == rainDrops.length-1) {
			rainDrops[i] = 0;
		}

		rainDrops[i]++;
	}
};

function begin() {
	window.matrix = setInterval(draw, 1800/(canvas.height/fontSize));
}

function clear() {
	document.querySelector(".glitch").remove();
}
