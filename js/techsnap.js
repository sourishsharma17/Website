window.addEventListener("DOMContentLoaded", setup);
if (window.getComputedStyle(document.querySelector(".hover-check")).color == "rgb(255, 0, 0)") {
	window.addEventListener("DOMContentLoaded", mobileSetup);
}

function setup() {

	var fromTop = 99999999;
	var moreOne = true;

	const options = {
		rootMargin: "0px 0px -25% 0px"
	};

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {

				entry.target.style.animation = "in 0.3s ease-in forwards";

				if (moreOne && entry.target.getBoundingClientRect().top > fromTop) {
					entry.target.style.animationDelay = 0.1 + "s";
				} else {
					fromTop = entry.target.getBoundingClientRect().top;
					entry.target.style.animation = "in-fade 0.3s ease-in forwards";
				}

				observer.unobserve(entry.target);

			} else {
				var transDelay = 0;
				moreOne = false;
				return;
			}
		})
		transDelay = 0;
	}, options);

	const things = document.querySelectorAll(".panel > .card");
	things.forEach(thing => observer.observe(thing));

}

function mobileSetup() {

	const options = {
		rootMargin: "-50% 0px -50% 0px"
	};

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("active");
			} else {
				entry.target.classList.remove("active");
			}
		})
	}, options);

	const things = document.querySelectorAll(".panel > .card");
	things.forEach(thing => observer.observe(thing));
}



var carousels = document.querySelectorAll(".panel .card .carousel");
carousels.forEach((i) => i.parentNode.innerHTML += "<div class=\"indicators\"><div class=\"indicator active\"></div>" + "<div class=\"indicator\"></div>".repeat(i.childElementCount-1) + "</div>");


function left() {

	var ponies = Array.from(event.target.nextElementSibling.children);
	var indicators = Array.from(event.target.parentNode.lastElementChild.children);

	for (var i = 0; i < ponies.length; i ++) {
		if (ponies[i].classList.contains("active")) {
			var active = i;
			break;
		}
	}

	active --;
	if (active < 0) {
		active = ponies.length - 1;
	}
	active %= ponies.length;

	ponies[i].classList.remove("active");
	ponies[active].classList.add("active");

	indicators[i].classList.remove("active");
	indicators[active].classList.add("active");

}


function right() {

	var ponies = Array.from(event.target.previousElementSibling.children);
	var indicators = Array.from(event.target.parentNode.lastElementChild.children);

	for (var i = 0; i < ponies.length; i ++) {
		if (ponies[i].classList.contains("active")) {
			var active = i;
			break;
		}
	}

	active ++;
	active %= ponies.length;

	ponies[i].classList.remove("active");
	ponies[active].classList.add("active");

	indicators[i].classList.remove("active");
	indicators[active].classList.add("active");

}



async function serveSnap(snapNo) {

	var node = event.target;
	node.parentNode.parentNode.classList.add("clicked");

	node.parentNode.parentNode.parentNode.classList.add("id" + snapNo);
	
	links = `<div><span class="fas fa-clock-rotate-left" tooltip="00:00"></span></div>
	<div><a href="" target="_blank"><span class="fas fa-up-right-from-square" tooltip="source"></span></a></div>
	<div><span onclick="takeSnap(` + snapNo + `)" class="fas fa-arrow-right-from-bracket" tooltip="back"></span></div>
	<div><span onclick="fullscreen(` + snapNo + `)" class="fas fa-expand" tooltip="fullscreen"></span></div>`;

	var temp = document.createElement("div");
	temp.classList.add("links");
	temp.classList.add("hide");
	temp.innerHTML = links.trim();

	node.parentNode.parentNode.parentNode.prepend(temp);

	var toChange = Array.from(node.parentNode.parentNode.parentNode.children);

	toChange[1].classList.add("hide");
	toChange[3].classList.add("hide");
	toChange[4].classList.add("hide");
	

	//fetch('0.txt')
	  //.then(response => response.text())
	  //.then(text => text.split("---"))
	  //.then(text => node.parentNode.parentNode.innerHTML += text[0])
	  //.then(text => console.log(text[1]))
	
	async function getSnap(url) {
		const response = await fetch(url);
		return response.text();
	}

	async function updateSnap(text) {

		text = text.split("---");
		node.parentNode.parentNode.innerHTML += text[0];
		text = text[1].split("\n");

		for (var i = 1; i < text.length-1; i++ ) {

			thing = text[i].split(" ");

			if (thing[0] == "TIME") {
				document.querySelector(".panel .card.id" + snapNo + " .links .fa-clock-rotate-left").setAttribute("tooltip", thing[1]);
			} else if (thing[0] == "SOURCE") {
				document.querySelector(".panel .card.id" + snapNo + " .links > div > a").setAttribute("href", thing[1]);
			}

		}

	}

	await updateSnap(await getSnap(snapNo + ".txt"));


	setTimeout(function() {
		toChange[0].classList.remove("hide");
	}, 100);

}

function takeSnap(number) {

	var node = event.target.parentNode.parentNode;
	node.parentNode.children[2].classList.remove("clicked");
	var toChange = Array.from(node.parentNode.children);

	toChange[1].classList.remove("hide");
	toChange[3].classList.remove("hide");
	toChange[4].classList.remove("hide");
	toChange[0].remove();

	setTimeout(function() {
		document.querySelector(".panel .card.id" + number + " .carousel .story").remove();
		document.querySelector(".panel .card.id" + number).classList.remove("id" + number);
	}, 200);

}

function fullscreen(number) {

	var node = event.target.parentNode.parentNode;
	var story = document.querySelector(".panel .card.id" + number + " .carousel .story");
	var links = document.querySelector(".panel .card.id" + number + " .links");
	var blurContainer = document.createElement("div");
	blurContainer.classList.add("blur-container");
	var colourContainer = document.createElement("div");
	colourContainer.classList.add("colour-container");

	document.body.appendChild(blurContainer);
	document.body.appendChild(colourContainer);
	document.body.appendChild(story.cloneNode(true));
	document.body.appendChild(links.cloneNode(true));

	var left = document.querySelector("body > .story").getBoundingClientRect().left;
	document.querySelector("body > .links").style.left = left + "px";
	document.querySelector("body > .links").children[2].remove();
	document.querySelector("body > .links").children[2].children[0].classList.add("fa-compress");
	document.querySelector("body > .links").children[2].children[0].classList.remove("fa-expand");
	document.querySelector("body > .links").children[2].children[0].setAttribute("onclick", "minimise(" + number + ")");
	document.querySelector("body > .links").children[2].children[0].setAttribute("tooltip", "minimise");

	document.body.style.overflow = "hidden";
	document.body.style.height = "100vh";

}

function minimise(number) {

	var node = event.target.parentNode.parentNode;
	document.querySelector("body > .blur-container").remove();
	document.querySelector("body > .colour-container").remove();
	document.querySelector("body > .story").remove();
	document.querySelector("body > .links").remove();

	document.body.style.overflow = "revert";
	document.body.style.height = "revert";

}

var fireworks = false;

function fireworksToggle() {
	fireworks = !fireworks
	document.body.toggleAttribute("cross");
}

document.addEventListener("click", mousePos);

function mousePos(event) {

	if (fireworks) {

		var posX = event.clientX;
		var posY = event.clientY;

		var pop = document.createElement("div");
		pop.classList.add("pop");
		pop.style.top = posY + "px";
		pop.style.left = posX + "px";

		for (var i = 0; i < 12; i ++ ) {
			let line = document.createElement("div");
			line.classList.add("line");
			line.style.transform = "rotate(" + i*30 + "deg) translateY(-15px)";
			pop.appendChild(line);
		}

		document.body.appendChild(pop);

		setTimeout(function() {
			pop.remove();
		}, 1000);

	} else {
		return;
	}

}




























