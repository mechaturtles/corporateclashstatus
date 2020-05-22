let request = new XMLHttpRequest();
request.open('get', 'https://corporateclash.net/api/v1/districts.js');
request.send();

const loadDistrict = (obj, index, district) => {
	let div = document.createElement("div")
	div.className = "district";
	div.id = "district_" + index;

	
	let text = "";

	if (obj.invasion_online) {
		let cogName = obj.cogs_attacking.replace(/ /g,"_");
		var icon = `<div class="icon"> <img src = "images/${cogName}.png" alt = "${obj.cogs_attacking}" align = "center" onerror="this.src='images/FlippedFlippy.png'"/> </div>`;
		text += `<p style="color: red;"> <b>${obj.name}</b> is being attacked by <b>${obj.cogs_attacking}</b> cogs! </p>`;
		
	}
	else {
		var icon = `<div class="icon"> <img src = "images/Flippy.png" alt = "Flippy" align = "center"/> </div>`;
		text += `<p style="color: green;"> <b>${obj.name}</b> is currently safe!</p>`;
	}
	text += `<p> There are currently <b>${obj.population}</b> Toons defending this district. </p>`;
	text = `<div class="details"> ${text} </div>`;

	div.innerHTML = icon + text;
	document.body.appendChild(div);
};

request.onload = function() {
	let ccData = JSON.parse(request.response);
	ccData.forEach(loadDistrict);
};