var activated = true;

//var images = document.querySelectorAll(".content img");
//for (let i = 1; i < images.length; i++) {
//	images[i].setAttribute("loading", "lazy");
//}

function subtleScroll() {
	if (window.location.href.includes("=")) {
		document.documentElement.scrollTop = window.pageYOffset + document.getElementById(window.location.href.split("=")[1]).getBoundingClientRect().top;
	} else {
		document.documentElement.scrollTop = 0;
	}
	setTimeout(function() {
		activated = true;
	}, 1000)
}

function subtleScroll1() {
	if (window.location.href.includes("=")) {
		//document.location.href = "#" + window.location.href.split("=")[1];
		document.documentElement.scrollTop = window.pageYOffset + document.getElementById(window.location.href.split("=")[1]).getBoundingClientRect().top;
	} else {
		activated = true;
	}
	setTimeout(function() {
		activated = true;
	}, 1000)
}

if (screen.width > 600 && document.documentElement.scrollTop == 0) {
	var activated = false;
	window.scrollTo({top: screen.height/5, behavior: "instant"});
	window.addEventListener("load", subtleScroll);
} else if (screen.width <= 600 && document.documentElement.scrollTop == 0) {
	var activated = false;
	window.addEventListener("load", subtleScroll1);
}

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

for (var i = 0; i < rHeight/450; i ++ ) {

	var blob = document.createElement("div");
	blob.classList.add("blob");

	bWidth = rand(rWidth/10, rWidth/3);
	bHeight = rand(rSHeight/10, rSHeight/2);
	if  (rWidth <= 600) {
		bWidth = rand(rWidth/8, rWidth/1.5);
		bHeight = rand(bWidth/2, bWidth*2);
	}
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

	if (fromTop >= 250 && activated) {
		scroll.classList.remove("unseen");
		scroll.classList.add("seen");
	} else if (!goingUp && scroll.classList.contains("seen")) {
		scroll.classList.remove("seen");
		scroll.classList.add("unseen");
	}

}

var scrolling;

window.addEventListener("scroll", function (event) {

	window.clearTimeout(scrolling); 
	scrolling = setTimeout(function() {
		if (goingUp) {
			goingUp = false;
		}
	}, 69);

}, false);

function toTop() {

	//html.style.overflow = "hidden";
	//html.style.height = "100vh";

	//document.body.scrollTop = 0;
	goingUp = true;

	scroll.classList.add("swoosh");

	setTimeout(function () {
		document.documentElement.scrollTop = 0;
		goingUp = true;
		window.planeRight = setInterval(check, 10);
	}, 150);


	/*
	setTimeout(function() {
		scroll.classList.remove("swoosh");
		scroll.classList.remove("seen");
		goingUp = false;
	}, 500);
	*/

	function check() {
		if (document.documentElement.scrollTop == 0 || !goingUp) {
			window.clearInterval(planeRight);
			scroll.classList.remove("swoosh");
			scroll.classList.remove("seen");
			goingUp = false;
			//html.style.overflow = "auto";
			//html.style.height = "revert";
		}


	}

}

var checker = false

function copyHeading() {
	try {
		navigator.clipboard.writeText(window.location.href.split("=")[0]+"="+event.target.offsetParent.id);
		document.querySelector(".post .copy.success").classList.add("copy-done");
		checker = true;
	} catch (error) {
		console.error(error);
		document.querySelector(".post .copy.error").classList.add("copy-done");
		checker = true;
	}
}

document.addEventListener("scroll", removeCopyToast);


function removeCopyToast() {

	if (!checker) {
		return;
	}

	document.querySelector(".post .copy.success").classList.add("copy-remove");
	document.querySelector(".post .copy.error").classList.add("copy-remove");

	setTimeout(function() {
		document.querySelector(".post .copy.success").classList.remove("copy-remove");
		document.querySelector(".post .copy.error").classList.remove("copy-remove");
		document.querySelector(".post .copy.success").classList.remove("copy-done");
		document.querySelector(".post .copy.error").classList.remove("copy-done");
	}, 130);

	checker = false

}











