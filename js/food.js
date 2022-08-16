window.addEventListener("load", setup);

function setup() {

	var transDelay = 0;
	
	const options = {
		rootMargin: "0px 0px -50px 0px"
	};

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.transitionDelay = transDelay + "s";
				transDelay += 0.1;
				entry.target.classList.add("show");
				observer.unobserve(entry.target);
			} else {
				return;
			}
		})
		transDelay = 0;
	}, options);

	const things = document.querySelectorAll(".images > *");
	things.forEach(thing => observer.observe(thing));
}


function enlarge() {

//	let cross = document.querySelector(".images .close");
//	cross.classList.add("activated");
//	cross.classList.remove("close");

	let cross = document.createElement("div");
	cross.classList.add("cross");
	cross.classList.add("fas");
	cross.classList.add("fa-xmark");
	cross.onclick = function close() {
		cross.classList.add("fade-out");
		colourOverlay.classList.add("fade-out-colour");
		enlarged.classList.add("fade-out");

		html.style.overflow = "auto";
		html.style.height = "auto";


		setTimeout(function() {
			cross.parentNode.removeChild(cross);
			colourOverlay.parentNode.removeChild(colourOverlay);
			enlarged.parentNode.removeChild(enlarged);
		}, 200);

	};
	document.body.appendChild(cross);

	if (event.target.tagName == "DIV") {
		var source = event.target.nextElementSibling.src;
		var image = event.target.nextElementSibling;
	} else {
		var source = event.target.parentNode.nextSibling.nextSibling.src;
		var image = event.target.parentNode.nextSibling.nextSibling;
	}

	source = source.replace("compressed", "semicompressed");

	let colourOverlay = document.createElement("div");
	colourOverlay.classList.add("colour-overlay");
	colourOverlay.onclick = function close() {
		cross.classList.add("fade-out");
		colourOverlay.classList.add("fade-out-colour");
		enlarged.classList.add("fade-out");

		html.style.overflow = "auto";
		html.style.height = "auto";


		setTimeout(function() {
			cross.parentNode.removeChild(cross);
			colourOverlay.parentNode.removeChild(colourOverlay);
			enlarged.parentNode.removeChild(enlarged);
		}, 200);
	};
	document.body.appendChild(colourOverlay);

	let enlarged = document.createElement("img");
	enlarged.classList.add("enlarge");
	enlarged.src=source;
	if (image.naturalWidth > image.naturalHeight) {
		enlarged.classList.add("landscape");
	} else {
		enlarged.classList.add("portrait");
	}
	document.body.appendChild(enlarged);

	html.style.overflow = "hidden";
	html.style.height = "100%";

}


































