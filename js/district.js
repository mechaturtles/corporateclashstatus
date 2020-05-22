let request = new XMLHttpRequest();
request.open('get', 'https://corporateclash.net/api/v1/districts.js');
// request.open('get', 'https://mechaturtles.com/corporateclashstatus/js/testdistrict.js');
request.send();

const loadDistrict = (data, index, district) => {
	let div = document.createElement("div")
	div.className = "district";
	div.id = "district_" + index;

	
	let text = "";

	if (data.invasion_online) {
		let cogName = data.cogs_attacking.replace(/ /g,"_");
		var icon = `<div class="icon"> <img src = "images/${cogName}.png" alt = "${data.cogs_attacking}" align = "center" onerror="this.src='images/Unknown.png'"/> </div>`;
		text += `<p style="color: red;"> <b>${data.name}</b> is being attacked by <b>${data.cogs_attacking}</b> cogs! </p>`;
		
	}
	else {
		var icon = `<div class="icon"> <img src = "images/Flippy.png" alt = "Flippy" align = "center"/> </div>`;
		text += `<p style="color: green;"> <b>${data.name}</b> is currently safe!</p>`;
	}
	text += `<p> There are currently <b>${data.population}</b> Toons defending this district. </p>`;
	text = `<div class="details"> ${text} </div>`;

	div.innerHTML = icon + text;

	div.style.cursor = "pointer";
	div.onclick = () => {
		loadDistrictModal(data);
	};
	document.body.appendChild(div);
};

const loadDistrictModal = (data) => {
	let modal = document.getElementById("modal");
	modal.style.display = "block";

	modal.onclick = (event) => {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}

	let modalBox = document.createElement("div");
	modalBox.className = "modalBox";
	

	let text = "";

	if (data.invasion_online) {
		let cogName = data.cogs_attacking.replace(/ /g,"_");
		var icon = `<div class="icon"> <img src = "images/${cogName}.png" alt = "${data.cogs_attacking}" align = "center" onerror="this.src='images/FlippedFlippy.png'"/> </div>`;
		text += `<p style="color: red;"> <b>${data.name}</b> is being attacked by <b>${data.cogs_attacking}</b> cogs! </p>`;
		
	}
	else {
		var icon = `<div class="icon"> <img src = "images/Flippy.png" alt = "Flippy" align = "center"/> </div>`;
		text += `<p style="color: green;"> <b>${data.name}</b> is currently safe!</p>`;
	}
	text += `<p> There are currently <b>${data.population}</b> Toons defending this district. </p>`;
	text = `<div class="details"> ${text} </div>`;

	modalBox.innerHTML = icon + text;

	modal.innerHTML = modalBox.outerHTML;
}

request.onload = function() {
	
	let ccData = JSON.parse(request.response);
	ccData.forEach(loadDistrict);
};