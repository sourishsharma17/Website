let blogs = document.querySelectorAll(".panel .grid .blog-post");
window.addEventListener("load", blogOrder);
window.addEventListener("resize", blogOrder);
var prevWidth = 0;

//document.querySelector(".panel").style.height = window.innerHeight - document.querySelector(".intro").style.height + "px";

function blogOrder() {

	if (screen.width == prevWidth) {
		return;
	}

	prevWidth = screen.width;

	let columnsB = document.querySelectorAll(".panel .grid .column");
	let heights = [];
	let dists = [];
	//  var columns = getComputedStyle(document.querySelector(".panel .grid")).columnCount;
	// columns = parseInt(columns);

	let widthB = screen.width;
	if (widthB >= 1050) {
		var columns = 3;
	} else if (widthB >= 700) {
		var columns = 2;
	} else {
		var columns = 1;
	}


	let fixedBlogs = {};
	let fixedHeights = [];

	for (var i = 0; i < columns; i ++) {

		fixedBlogs[i] = [];
		fixedHeights.push(0);
		dists.push(0);

		var column = document.createElement("div");
		column.classList.add("column");
		document.querySelector(".panel .grid").appendChild(column);

	}

	for (var i = 0; i < columnsB.length; i ++) {
		columnsB[i].remove();
	}

	for (var postNo = 0; postNo < blogs.length; postNo ++) {

		var post = blogs[postNo];
		post.remove();

		if (postNo >= blogs.length-2 && blogs.length % columns != 0) {
			var ind = fixedHeights.indexOf(Math.min(...fixedHeights));
			// fixedBlogs[ind].push(post);
		} else {
			var ind = postNo%columns;
			// fixedBlogs[ind].push(post);
		}

		column = document.querySelectorAll(".panel .grid .column")[ind];
		column.appendChild(post);
		fixedHeights[ind] += post.offsetHeight;

	}

	for (var i = 0; i < columns; i ++) {
		dists[i] =  window.pageYOffset + document.querySelectorAll(".panel .grid .column")[i].lastChild.getBoundingClientRect().bottom;
	}

	while (!dists.every(i => i == dists[0])) {

		let maxC = dists.indexOf(Math.max(...dists));
		let minC = dists.indexOf(Math.min(...dists));

		if (dists[minC] + 100.0 >= dists[maxC]) {
			break;
		}

		var column = document.querySelectorAll(".panel .grid .column")[minC];
		var filler = document.createElement("div");
		filler.classList.add("blog-post");
		filler.style.width = "100%";
		//filler.style.background = "blue";
		//filler.style.height = "calc(" + Math.floor(dists[maxC] - dists[minC]) + "px - 2rem)";
		filler.style.flexGrow = 1;
		column.appendChild(filler);
		
		dists[minC] = dists[maxC];


		/*
		let maxC = document.querySelectorAll(".panel .grid .column")[fixedHeights.indexOf(Math.max(...fixedHeights))].lastChild;
		maxC = window.pageYOffset + maxC.getBoundingClientRect().top;
		let minC = document.querySelectorAll(".panel .grid .column")[fixedHeights.indexOf(Math.min(...fixedHeights))];
		minCV = window.pageYOffset + minC.lastChild.getBoundingClientRect().top;

		console.log(maxC, minCV);
		var filler = document.createElement("div");
		filler.classList.add("blog-post");
		filler.style.width = "100%";
		filler.style.height = "calc(" + (maxC - minCV) + "px)";
		minC.appendChild(filler);
		*/


	}


	/*
for (var i = 0; i < columns; i ++) {

	let column = document.querySelectorAll(".panel .grid .column")[i];

	for (item in fixedBlogs[i]) {
		column.appendChild(fixedBlogs[i][item]);
	}

}
*/

};


























