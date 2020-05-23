let request = new XMLHttpRequest();
request.open('get', 'https://corporateclash.net/api/v1/districts.js');
//request.open('get', 'https://mechaturtles.com/corporateclashstatus/js/testdistrict.js');
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
		
		var countID = `timer_${index}`
		var countdown = `<div class="countdown"><div><p>Remaining Time</p><h1 id=${countID}></h1></div></div>`
		// const endTime = new Date(); //Testing purposes only
		const endTime = new Date(data.last_update * 1000);
		endTime.setSeconds(endTime.getSeconds() + data.remaining_time);
		timer(countID, endTime);
	}
	else {
		var icon = `<div class="icon"> <img src = "images/Flippy.png" alt = "Flippy" align = "center"/> </div>`;
		text += `<p style="color: green;"> <b>${data.name}</b> is currently safe!</p>`;
		var countdown = `<div class="countdown"><div><h1 style="color: green;">SAFE</h1></div></div>`
	}
	text += `<p> There are currently <b>${data.population}</b> Toons defending this district. </p>`;
	text = `<div class="details"> ${text} </div>`;



	div.innerHTML = icon + text + countdown;

	div.style.cursor = "pointer";
	div.onclick = () => {
		loadDistrictModal(data);
	};
	document.getElementById("districtList").appendChild(div);
};

const loadDistrictModal = (data) => {
	let modal = document.getElementById("modal");
	modal.style.display = "block";

	modal.onclick = (event) => {
		if (event.target == modal) {
			modal.style.display = "none";
			clearInterval(modalTimer);
		}
	}

	let modalBox = document.createElement("div");
	modalBox.className = "modalBox";
	

	let text = "";

	if (data.invasion_online) {
		let cogName = data.cogs_attacking.replace(/ /g,"_");
		var icon = `<div class="icon"> <img src = "images/${cogName}.png" alt = "${data.cogs_attacking}" align = "center" onerror="this.src='images/Unknown.png'"/> </div>`;
		text += `<p style="color: red;"> <b>${data.name}</b> is being attacked by <b>${data.cogs_attacking}</b> cogs! </p>`;
		
		var defeat = `<p> <b>${data.count_defeated}</b> out of <b>${data.count_total}</b> cogs have been defeated during this invasion. </p>`;

		var countID = `modalTimer`
		var countdown = `<div class="countdown"><div><p>Remaining Time</p><h1 id=${countID}></h1></div></div>`
		// const endTime = new Date(); //Testing purposes only
		const endTime = new Date(data.last_update * 1000);
		endTime.setSeconds(endTime.getSeconds() + data.remaining_time);
		var modalTimer = timer(countID, endTime);
	}
	else {
		var icon = `<div class="icon"> <img src = "images/Flippy.png" alt = "Flippy" align = "center"/> </div>`;
		text += `<p style="color: green;"> <b>${data.name}</b> is currently safe!</p>`;
		var defeat = `<p> <b>${data.count_defeated}</b> cogs have been defeated since the last invasion. </p>`;
		var countdown = `<div class="countdown"><div><h1 style="color: green;">SAFE</h1></div></div>`
	}
	text += `<p> There are currently <b>${data.population}</b> Toons defending this district. </p>`;
	text = `<div class="details"> ${text} </div>`;

	modalBox.innerHTML = icon + text + defeat + countdown;

	modal.innerHTML = modalBox.outerHTML;
}

request.onload = function() {
	
	let ccData = JSON.parse(request.response);
	ccData.forEach(loadDistrict);
};


/** Used to perform a countdown for each item
 * @param id		Tag ID to pass in the time.
 * @param endTime	Date object that describes when the countdown stops.
 */
const timer = (id, endTime) => {
	let interval = setInterval(() => {
		let currentTime = new Date();
		let timeLeft = endTime - currentTime;

		let timeString = new Date(timeLeft).toISOString();
		document.getElementById(id).innerHTML = timeString.slice(11,19);

		if(timeLeft < 0 ) {
			clearInterval(interval);
			document.getElementById(id).innerHTML = "OVER";
		}
	}, 100);
	return interval;
};