let toggleThemes = document.querySelector("#toggle-themes");
let icon = document.querySelector("#toggle-themes .fas");
let html = document.querySelector("html");

if (document.cookie.split(";").some((item) => item.trim().startsWith("darkmode="))) {
	if (document.cookie.split(";").some((item) => item.includes("darkmode=1"))) {
		themeToggle();
	} else {
	}
} else {
	document.cookie = "darkmode=0; SameSite=None; Secure; max-age=1800";
}



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

	icon.classList.toggle("fa-sun");
	document.body.toggleAttribute("dark-mode");
	if (document.body.hasAttribute("dark-mode")) {
		document.cookie = "darkmode=1; SameSite=None; Secure; max-age=1800";
	} else {
		document.cookie = "darkmode=0; SameSite=None; Secure; max-age=1800";
	}

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
