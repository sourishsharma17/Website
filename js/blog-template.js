//document.querySelector(".post .scroll-top.unseen").animation = "plane-out 0.5s ease-in";
document.addEventListener("scroll", plane);

var scroll = document.querySelector(".post .scroll-top");
let goingUp = false

let rWidth = screen.width;
let rSHeight = screen.height;
let rHeight = parseFloat(window.getComputedStyle(document.querySelector(".post")).height);

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

for (var i = 0; i < rHeight/400; i ++ ) {

	var blob = document.createElement("div");
	blob.classList.add("blob");

	bWidth = rand(rWidth/10, rWidth/3);
	bHeight = rand(rSHeight/10, rSHeight/2);
	bLeft = rand(-1*(rWidth/3), rWidth*0.9);
	bTop = rand(5, rHeight-(bHeight/2));
	b1 = rand(30, 70);
	b2 = rand(30, 70);
	b3 = rand(30, 70);
	b4 = rand(30, 70);
	g0 = rand(0, 360);
	g1 = rand(0, 255);
	g2 = rand(0, 255);
	g3 = rand(0, 255);
	g4 = rand(0, 255);
	g5 = rand(0, 255);
	g6 = rand(0, 255);

	g7 = rand(20, 80);
	g8 = rand(40, 55);

	blob.style.width = bWidth + "px";
	blob.style.height = bHeight + "px";
	blob.style.left = bLeft + "px";
	blob.style.top = bTop + "px";
	blob.style.borderRadius = `${b1}% ${100-b1}% ${b2}% ${100-b2}% / ${b3}% ${b4}% ${100-b4}% ${100-b3}%`;
	//blob.style.background = `linear-gradient(${g0}deg, rgba(${g1}, ${g2}, ${g3}, 1) 0%, rgba(${g4}, ${g5}, ${g6}, 1) 100%)`;
	blob.style.background = `linear-gradient(${g0}deg, hsl(${g0}deg, 100%, ${g8}%) 0%, hsl(${g0 + g7}deg, 100%, ${g8}%) 100%)`;
	document.querySelector(".post").appendChild(blob);
}





function plane() {

	var fromTop = document.documentElement.scrollTop;
	
	if (fromTop >= 250) {
		scroll.classList.remove("unseen");
		scroll.classList.add("seen");
	} else if (!goingUp && scroll.classList.contains("seen")) {
		scroll.classList.remove("seen");
		scroll.classList.add("unseen");
	}

}

function toTop() {

	//html.style.overflow = "hidden";
	//html.style.height = "100vh";

	//document.body.scrollTop = 0;
	goingUp = true;
	
	setTimeout(function () {
		document.documentElement.scrollTop = 0;
		window.planeRight = setInterval(check, 10);
	}, 150);

	scroll.classList.add("swoosh");

	/*
	setTimeout(function() {
		scroll.classList.remove("swoosh");
		scroll.classList.remove("seen");
		goingUp = false;
	}, 500);
	*/

	function check() {
		if (document.documentElement.scrollTop == 0) {
			window.clearInterval(planeRight);
			scroll.classList.remove("swoosh");
			scroll.classList.remove("seen");
			goingUp = false;
			//html.style.overflow = "auto";
			//html.style.height = "revert";
		}
	}

}




