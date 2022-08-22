let scrolled = true;
let landing = document.querySelector(".landing");
let header = document.querySelector("header");
landing.style.minHeight = "calc(100vh - " + header.offsetHeight + "px )";

window.onscroll = function() {justScrolledW()};

var navbar = document.querySelector(".navbar");
var intFrameHeight = window.innerHeight;
let navbarBackground = document.querySelector(".navbar-background");
let wrapper = document.querySelector(".wrapper");
wrapper.style.height = window.innerHeight + "px";

wrapper.onscroll = function() {justScrolledW()};

function justScrolledW() {
	if (scrolled) {
		document.querySelectorAll(".landing .scrolldown > span").forEach(thing => thing.animate([{opacity: 0}], {duration: 1000}));
		setTimeout(function() {
			document.querySelectorAll(".landing .scrolldown > span").forEach(thing => thing.style.animation = "none");
		}, 990);
	}
	scrolled = false;
	if (wrapper.scrollTop >= (0.5*intFrameHeight)) {
		navbar.style.top = "0";
		navbarBackground.style.top = "0";
	} else {
		navbar.style.top = "-20rem";
		navbarBackground.style.top = "-50rem";
	}
};

/*
function justScrolled() {
	console.log("yes");
	scrolled = false;
	if (body.scrollTop >= (0.3*intFrameHeight)) {
		navbar.style.top = "0";
		navbarBackground.style.top = "0";
	} else {
		navbar.style.top = "-20rem";
		navbarBackground.style.top = "-50rem";
	}
}
*/

let body = document.querySelector(".body");

if (window.innerWidth < 600) {
	document.querySelector(".landing").style.height = window.innerHeight + "px";
	document.querySelector(".preloader-mobile").style.height = window.innerHeight + "px";
}

function beginMobile() {
	setTimeout(function() {
		document.querySelector(".preloader-mobile").remove();
	}, 1400);
}

document.addEventListener("mousemove", function(e) {
	if (landing.matches(":hover") && scrolled) {
		//pass
	} else {
		return;
	}
	let bubble = document.createElement("span");
	bubble.classList.add("bubble");
	let x = e.clientX;
	let y = e.clientY;
	bubble.style.left = x + "px";
	// bubble.style.top = "calc( " + y + "px" + " - " + header.offsetHeight + "px)";
	bubble.style.top = y + "px";
	let size = Math.random() * 100;
	bubble.style.width = 20 + size + "px";
	bubble.style.height = 20 + size + "px";
	landing.appendChild(bubble);
	setTimeout(function() {
		bubble.remove();
	}, 2000);
});


let achievements = document.querySelectorAll(".achievements div");
let hobbies = document.querySelectorAll(".hobbies div");
let keyEvents = document.querySelectorAll(".key-events div");

/*
window.addEventListener("resize", fadePos);
function fadePos() {
	document.querySelector(".landing .landing-img #first-image-fade").style.bottom = getComputedStyle(document.querySelector(".landing .landing-img .first-img")).bottom;
	console.log(getComputedStyle(document.querySelector(".landing .landing-img .first-img")).bottom);
}
*/

window.addEventListener("resize", repos);
window.addEventListener("load", repos);
var prevWidth = 0;

function repos() {

	let width = screen.width;
	//console.log(width);
	//console.log(document.querySelector(".helium").offsetWidth);
	
	if (width == prevWidth) {
		return;
	}

	prevWidth = width;

	if (width <= 1200) {
		let height = document.querySelector(".years").offsetHeight - 100;
		height *= 0.5;

		//height = 6600

		var counter = 0;
		var achievementHeight = height/achievements.length + 180;
		for (const achievement of achievements) {

			var mod = document.querySelector("."+achievement.className);
			var topVal = Math.floor(Math.random() * (achievementHeight-mod.offsetHeight) +1+counter*achievementHeight);
			mod.style.top = topVal + "px";

			var min = 5;
			var max = width-mod.clientWidth -(screen.height/25);
			var sideVal = Math.floor(Math.random() * (max - min + 1)) + min; 
			//console.log(sideVal, mod.offsetWidth);

			mod.style.left = "auto";
			mod.style.right = sideVal + "px";
			counter ++;
		}


		var counter = 0;
		var hobbyHeight = height/hobbies.length;
		for (const hobby of hobbies) {

			var mod = document.querySelector("."+hobby.className);
			var topVal = Math.floor(Math.random() * (hobbyHeight-mod.offsetHeight) +1+counter*hobbyHeight);
			mod.style.top = topVal + "px";

			var min = 5;
			var max = width-mod.offsetWidth -(screen.height/22);
			var sideVal = Math.floor(Math.random() * (max - min + 1)) + min; 

			mod.style.right = sideVal + "px";
			mod.style.left = "auto";
			counter ++;
		}



		//	var counter = 0;
		for (const keyEvent of keyEvents) {

			var mod = document.querySelector("."+keyEvent.className);
			var topVal = parseFloat((getComputedStyle(mod).top).slice(0, -2)) * (65/30);
			mod.style.top = topVal + "px";

			var min = 5;
			var max = width-mod.offsetWidth - (screen.height/75);
			var sideVal = Math.floor(Math.random() * (max - min + 1)) + min; 

			mod.style.right = sideVal + "px";
			mod.style.left = "auto";

			//		counter ++;
		}


	} else {


		let height = document.querySelector(".years").offsetHeight - 100;
		if (width <= 1366) {
			height = 2850;
		} else if (width <= 1920) {
			height = 3250;
		} else {
			height = 3750;
		}

		var counter = 0;
		var achievementHeight = height/achievements.length + 80;
		for (const achievement of achievements) {

			var mod = document.querySelector("."+achievement.className);
			var topVal = Math.floor(Math.random() * (achievementHeight-mod.offsetHeight) +1+counter*achievementHeight);
			mod.style.top = topVal + "px";

			var min = width/2 +15;
			var max = width-mod.offsetWidth -20;
			var sideVal = Math.floor(Math.random() * (max - min + 1)) + min; 

			if (Math.floor(Math.random() * 2) == 0) {
				mod.style.right = sideVal + "px";
				mod.style.left = "auto";
			} else {
				mod.style.left = sideVal + "px";
				mod.style.right = "auto";
			}

			counter ++;
		}


		var counter = 0;
		var hobbyHeight = height/hobbies.length;
		for (const hobby of hobbies) {

			var mod = document.querySelector("."+hobby.className);
			var topVal = Math.floor(Math.random() * (hobbyHeight-mod.offsetHeight) +1+counter*hobbyHeight);
			mod.style.top = topVal + "px";

			var min = width/2 +15;
			var max = width-mod.offsetWidth -50;
			var sideVal = Math.floor(Math.random() * (max - min + 1)) + min; 

			if (Math.floor(Math.random() * 2) == 0) {
				mod.style.right = sideVal + "px";
				mod.style.left = "auto";
			} else {
				mod.style.left = sideVal + "px";
				mod.style.right = "auto";
			}

			counter ++;
		}



		//	var counter = 0;
		for (const keyEvent of keyEvents) {

			var mod = document.querySelector("."+keyEvent.className);
			//		var topVal = (Math.floor(Math.random() * 39)+1+counter*39);
			//		mod.style.top = topVal + "rem";

			var min = width/2 +15;
			var max = width-mod.offsetWidth - width/4;
			var sideVal = Math.floor(Math.random() * (max - min + 1)) + min; 

			if (Math.floor(Math.random() * 2) == 0) {
				mod.style.right = sideVal + "px";
				mod.style.left = "auto";
			} else {
				mod.style.left = sideVal + "px";
				mod.style.right = "auto";
			}

			//		counter ++;
		}
	}

}

function closeMobileNav() {
	document.querySelector(".hamburger").toggleAttribute("active");
	toggleThemes.toggleAttribute("mobile-menu-seen");
	html.style.overflow = "auto";
	html.style.height = "auto";
	document.querySelector("#about").scrollIntoView();
}

function amoled() {
	event.target.toggleAttribute("active");
	body.toggleAttribute("amoled");
	body.removeAttribute("dark-mode");

	themes = document.querySelector("#toggle-themes");
	themeIcon = document.querySelector("#toggle-themes .fas");
	themes.toggleAttribute("rocket-mode");
	themeIcon.classList.remove("fa-sun");
	themeIcon.classList.toggle("fa-rocket");
}

/*
window.addEventListener("load", (event) => {
	if (document.body.hasAttribute("dark-mode")) {
		document.querySelector(".landing .landing-img .first-img").src = "../media/landing/portrait-dark.png";
	} else {
		document.querySelector(".landing .landing-img .first-img").src = "../media/landing/portrait-light.png";
	}
});

function switchImage() {
	if (document.body.hasAttribute("dark-mode")) {
		document.querySelector(".landing .landing-img .first-img").src = "../media/landing/portrait-light.png";
	} else {
		document.querySelector(".landing .landing-img .first-img").src = "../media/landing/portrait-dark.png";
	}
}
*/

window.addEventListener("load", (event) => {
	if (document.body.hasAttribute("dark-mode")) {
		document.querySelectorAll(".landing .landing-img .first-img")[0].toggleAttribute("hidden");
		document.querySelectorAll(".landing .landing-text.small .signature")[0].toggleAttribute("hidden");
	} else {
		document.querySelectorAll(".landing .landing-img .first-img")[1].toggleAttribute("hidden");
		document.querySelectorAll(".landing .landing-text.small .signature")[1].toggleAttribute("hidden");
	}
});

function switchImage() {
	document.querySelectorAll(".landing .landing-img .first-img").forEach(thing => {thing.style.animationDuration = "0s", thing.style.animationDelay = "0s", thing.toggleAttribute("hidden")});
	document.querySelectorAll(".landing .landing-text.small .signature").forEach(thing => {thing.style.animationDuration = "0s", thing.style.animationDelay = "0s", thing.toggleAttribute("hidden")});
	
}






























