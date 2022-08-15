let toggleThemes = document.querySelector("#toggle-themes");
let icon = document.querySelector("#toggle-themes .fas");
let html = document.querySelector("html");

function themeToggle() {

	if (toggleThemes.hasAttribute("rocket-mode")) {
		toggleThemes.removeAttribute("rocket-mode")
		icon.classList.remove("fa-rocket");
		icon.classList.remove("fa-sun");
		document.querySelector(".about .key-events .launch span").removeAttribute("active");
		document.body.removeAttribute("amoled");
		document.body.removeAttribute("dark-mode");
		return;
	}

	if (document.body.hasAttribute("dark-mode")) {
		document.querySelector(".landing .landing-img .first-img").src = "../media/landing/portrait-light.png";
	} else {
		document.querySelector(".landing .landing-img .first-img").src = "../media/landing/portrait-dark.png";
	}

	icon.classList.toggle("fa-sun");
	document.body.toggleAttribute("dark-mode");

};

function mobileMenu() {
	document.querySelector(".hamburger").toggleAttribute("active");
	toggleThemes.toggleAttribute("mobile-menu-seen");
	if (toggleThemes.hasAttribute("mobile-menu-seen")) {
		html.style.overflow = "hidden";
		html.style.height = "100%";
	} else {
		html.style.overflow = "auto";
		html.style.height = "auto";
	}

}
