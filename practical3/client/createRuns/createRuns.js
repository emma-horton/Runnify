// import of the helper function and navbar
import * as helpers from '../helperFunctions.js';
import * as tabBar from '../RunningFeed/tabBar.js';

// Token for the apis

mapboxgl.accessToken = "pk.eyJ1IjoicGhpbGtvbGxpbmciLCJhIjoiY2x0dmo0ZjNsMW41NTJpbzNoc2UxbHl3OCJ9.gEa1CLRvnfd_uL5Ttzgm9g"

// global variables needed in this script
let coordinates = ""
let longitude = 0
let latitude = 0
let distanceManuel = 0
let distanceActualCalculated = 0
let storeCoordinates = ""
let allOptionsExecuted = false;
let temperatureForCard = 0
let icon = ""
let popUpEntries = { distance: 0, time: "", temperature: "", description: "" }


// creates layout for create runs page 
const createRunsLayout = () => {

	createRefreshButton()


	let cardContainer = helpers.createElement("div", "runInputs")
	let cardForm = helpers.createElement("form", "createRunForm")
	let distanceOptions = helpers.getDistances()

	let heading = helpers.createElement("h1")
	heading.innerHTML = "Create Run"

	cardForm.setAttribute("class", "prose flex flex--column");
	cardForm.method = "javascript: return false;"

	helpers.createLabelInput(cardForm, "date", "date", "Date")
	helpers.createLabelInput(cardForm, "time", "time", "Time of Run")
	helpers.createLabelInput(cardForm, "text", "street", "Street: ", "Street", ["input", "mb12"], "address", "shipping address-line1")
	helpers.createLabelInput(cardForm, "text", "city", "City: ", "City", ["input", "mb12"], "city", "shipping address-level2")

	
	helpers.createSelect(cardForm, distanceOptions, "distance", "Distance in km: ")
	let dropDownDiv = helpers.createElement("form", "dropDownDiv")
	helpers.createSelect(dropDownDiv, helpers.createPaceList(), "pace", "Pace in min/km : ")


	let postRun = helpers.createButton("Post Run", "postRunButton")
	let populateRun = helpers.createButton("Populate Run", "populateButton")
	let buttonContainer = helpers.createElement("div", "buttonDiv")

	let mapPlacerhold = helpers.createElement("div", "map")
	let weatherForecast = helpers.createElement("div", "temperature")
	let runs = helpers.getElement("createRuns")

	// append everything to the parent elements
	helpers.appendChildren(buttonContainer, populateRun, postRun)
	helpers.appendChildren(cardContainer, heading, cardForm, dropDownDiv)
	helpers.appendChildren(runs, cardContainer)
	helpers.appendChildren(runs, mapPlacerhold, buttonContainer, weatherForecast)


	//Adding Event Listener
	let populateClicked = false
	postRun.classList.add('grey')
	populateRun.addEventListener('click', () => {
		let fieldFilledOut = true
		let inputElements = document.querySelectorAll("input")
		for (let input of inputElements) {
			if (input.value == "") {
				fieldFilledOut = false
			}

		}
		// check if the typed in date is in the past
		let userDateInput = helpers.getElement("date").value
		let userTimeInput = helpers.getElement("time").value 

		let userInput = userDateInput + " "+userTimeInput+":00"
	
		userInput = new Date(userInput)

		let currentDate = new Date()

		
		if (userInput < currentDate) {
			Swal.fire({
				title: "Invalid date!",
				text: 'You cannot input a date in the past',
				icon: 'warning',
				confirmButtonText: 'OK',
				backdrop: false,
			});
		}
		else {
			//check if everything is filled out
			if (fieldFilledOut) {
				const mapElement = document.getElementById("map");
				mapElement.style.gridRow = "initial";

				populateClicked = true
				postRun.classList.remove('grey');
				allOptionsExecuted = false
				distanceManuel = helpers.getElement("distance").value

				// create the full address of the user for the API
				let streetOfUser = helpers.getElement("street").value
				let cityOfUser = helpers.getElement("city").value
				let fullAdressUser = streetOfUser + " " + cityOfUser

				// call the weather & map API
				calculateForecast()
				getCoordinatesOfStreet(fullAdressUser)

			}
			else { // 
				Swal.fire({
					title: "Inputs Missing!",
					text: 'Make sure all inputs are populated',
					icon: 'warning',
					confirmButtonText: 'OK',
					backdrop: false,
				});
			}
		}
	});


	//Adding pop up if user clicks post run before populate run
	postRun.addEventListener('click', () => {
		if (populateClicked === false) {
			Swal.fire({
				title: "Please click 'Populate Run' first",
				icon: 'warning',
				confirmButtonText: 'OK',
				backdrop: false,
			});

		} else if (populateClicked === true) {
			Swal.fire({
				title: "Your run has been added!",
				text: 'Go to the home page to see your run',
				icon: 'success',
				confirmButtonText: 'OK',
				backdrop: false,
			});
			addRun();
			setTimeout(function() {
				window.location.reload();
			}, 3000);

		}
	});
}

// Popover for the overview of the run populated
function runPopover() {
	let distance = parseFloat(popUpEntries.distance).toFixed(2);
	let pace = helpers.getElement("pace").value
	let time = `${popUpEntries.time.hours} hours ${popUpEntries.time.minutes} minutes and ${popUpEntries.time.seconds} seconds`
	//let weatherText = `The weather is forcasted to be ${popUpEntries.temperature} degrees. Weather conditions on that day: ${popUpEntries.description}`
	console.log(`This is the weather ${popUpEntries.temperature}`)

	let weatherText = "testfailed";
	let iconHTML = "testfailed";
	if (popUpEntries.temperature === "") {
		weatherText = "The weather cannot be forecasted for a run this far in the future.";
		iconHTML = `<img src="https://media3.giphy.com/media/THD7thMQZoOYoyZ3EK/200w.gif?cid=6c09b952cfwqdjo5hfd0d3xc7sk5mnkmn6y0eoihezg7l8c1&ep=v1_gifs_search&rid=200w.gif&ct=g" class="custom-icon">`;
	} else {
		weatherText = `The weather is forecasted to be ${popUpEntries.temperature}. Weather conditions on that day: ${popUpEntries.description}`;
		iconHTML = `<img class="custom-icon" src="${popUpEntries.iconUrl}">`
	}
	console.log("testing hello", weatherText, iconHTML)

	Swal.fire({
		position: "center-end",
		title: "Here is your calculated run",
		width: 470,
		iconHtml: iconHTML,
		text: `Your calculated run is ${distance}km long. At a pace of ${pace}, this will take ${time}. ${weatherText}`,
		showConfirmButton: false,
		backdrop: false,
		customClass: {
			icon: "custom-icon"
		}

	});
}

// function adds users created run to createRuns collection in the mainDatabase
function addRun() {
	let date = document.getElementById("date").value;
	let time = document.getElementById("time").value;
	let street = document.getElementById("street").value;
	let city = document.getElementById("city").value;

	let pace = document.getElementById("pace").value;
	let type = "flat"
	let data = { date: date, time: time, street: street, city: city, distance: distanceActualCalculated, pace: pace, type: type, coordinates: coordinates, weather: { temperature: temperatureForCard, icon: icon } };
	fetch(`/createruns/${city}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})
		.then(res => res.text())


}

// button to refresh the page - same as the one used on the feed 
const createRefreshButton = () =>{
let button = document.createElement('button');
button.type = 'button';
button.className = 'button';

let buttonText = document.createElement('span');
buttonText.className = 'button__text';
buttonText.textContent = 'Refresh';

let buttonIcon = document.createElement('span');
buttonIcon.className = 'button__icon';

let icon = document.createElement('i');
icon.className = 'fas fa-sync-alt';
buttonIcon.appendChild(icon);

button.appendChild(buttonText);
button.appendChild(buttonIcon);

document.body.appendChild(button);

button.addEventListener('click', function () {
    window.location.reload()
});
}


// convert the street name of the input to coordinates
const getCoordinatesOfStreet = (addressOfUser) => {
	fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${addressOfUser}.json?access_token=${mapboxgl.accessToken}`)
		.then(response => response.json())
		.then(data => {
			let coordinates = data.features[0].center
			longitude = coordinates[0]
			latitude = coordinates[1]
			getRouteInformation("case1")

		})
		.catch(error => { console.log("Error address coordinates", error) })
}



// function that gathers all inofmration needed to and acutally triggers the next functions
const getRouteInformation = async (routeCase) => {
	const route = calculateRoute(routeCase)
	const routeCoordinates = route.map(coord => coord.join(',')).join(';');
	await getRoute(routeCoordinates);
}

//------------------------------------------- algorithm ------------------------------------------------------------------------------

// function that return waypoints for given inputs (distance and starting point) - This generates coordinates which will result in the route of the user
// It can happen that no route will be found, especially in regions where less streets, path are available or at coasts. 
const calculateRoute = (routeCase) => {

	let distance = distanceManuel // get the distance
	let lat = latitude 
	let long = longitude

	var split = distance * 0.78 / 4; // split the route in 4 equally long quarters

	// circumference of earth divided by 360 (degrees) give the information about the delta between the different circles of long and lat
	var deltaLat = split / 110.574; // One minute of lattidude means 110km in distance (as the earth is not perfectly round lat and long differ slightly) -
	var deltaLong = split / (111.32 * Math.cos(lat * Math.PI / 180)); // longitdude is dependend of the value of the lattidude, therefore we have to that the cosinus of lattidude
	// as the computer needs radians instead of degrees, it had to be converted by (PI / 180)

	if (routeCase == "case1") { // case 1 will plot a route in the north west of the starting point as I can happen there is no route a second route will be caluclated
		// based on the longitude and lattidude of the starting point the other coordinates are calculated
		var lat2 = lat + deltaLat;
		var long2 = long;
		var lat3 = lat2;
		var long3 = long + deltaLong;
		var lat4 = lat3 - deltaLat;
		var long4 = long3;
		return [[long, lat], [long2, lat2], [long3, lat3], [long4, lat4], [long, lat]];
	}

	else { // this happens if the populated route does not match with the desired length ( +- 20%)
		// the second option calculates a route for the opposite direction
		var lat2 = lat - deltaLat;
		var long2 = long;
		var lat3 = lat2;
		var long3 = long - deltaLong;
		var lat4 = lat3 + deltaLat;
		var long4 = long3;
		return [[long, lat], [long2, lat2], [long3, lat3], [long4, lat4], [long, lat]];


	}
}

// -------------------------------------------------------- End algorithm -------------------------------------------------------------------

// MAP API that returns route coordinates for given inputs
const getRoute = async (routeCoordinates) => {

	coordinates = routeCoordinates

	let routeCoordinatesArray = routeCoordinates.split(";")

	let startLong = longitude;
	let startLat = latitude;

	// create the map from mapBox
	const map = new mapboxgl.Map({
		container: helpers.getElement("map"),
		style: "mapbox://styles/mapbox/streets-v12",
		center: [startLong, startLat],
		zoom: 12
	});

	// calculates the route based on the coordinates calculated
	map.on('style.load', () => {
		fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${routeCoordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`)
			.then(response => response.json())
			.then(json => {

				//extract the information needed
				let distances = (json.routes[0].distance / 1000);
				popUpEntries.distance = distances
				distanceActualCalculated = parseFloat(distances).toFixed(2);
				let estTime = getEstTime();
				popUpEntries.time = estTime
				console.log(distances)
				// check if length of calculated route matches with the input of the user
				if (distances >= 0.8 * helpers.getElement("distance").value && distances < helpers.getElement("distance").value * 1.2) {
					if (json.routes && json.routes.length > 0) {

						const data = json.routes[0];
						const route = data.geometry.coordinates;
						storeCoordinates = route;

						// draw the route
						const geojson = {
							type: 'Feature',
							properties: {},
							geometry: {
								type: 'LineString',
								coordinates: route
							}
						};
						// show it on the map
						plotMap(map, geojson, routeCoordinatesArray);
						runPopover()

					} else {
						console.error('No route found.');
					}

				} else if (!allOptionsExecuted) {
					getRouteInformation("case2");
					allOptionsExecuted = true;
					
				}else if(allOptionsExecuted){
					Swal.fire({ 
						title: "No Routes Found!",
						text: 'Try increasing the distance or choosing a different location',
						icon: 'warning',
						confirmButtonText: 'OK',
						backdrop: false,
					}).then(function(){
						window.location.reload()
					})
				}
			})
			.catch(error => {
				console.error('Error fetching route:', error);
			});
	});
};



// add a layer with the route and markers (waypoints) to the map 
const plotMap = (map, geojson, routeCoordinatesArray) => {
	for (let i = 0; i < routeCoordinatesArray.length; i++) {
		const coordinate = routeCoordinatesArray[i].split(",")
		let markerCoordinate = [coordinate[1], coordinate[0]]

		const marker = new mapboxgl.Marker()
			.setLngLat(coordinate)
			.addTo(map);
		const popup = new mapboxgl.Popup().setText(`Coordinate: ${markerCoordinate}`);
		marker.setPopup(popup);
		if (i > 0) {
			marker.getElement().id = 'waypoint';
		}
	}
	if (map.getSource('route')) {
		map.getSource('route').setData(geojson);
	} else {
		map.addLayer({
			id: 'route',
			type: 'line',
			source: {
				type: 'geojson',
				data: geojson
			},
			layout: {
				'line-join': 'round',
				'line-cap': 'round'
			},
			paint: {
				'line-color': '#3887be',
				'line-width': 5,
				'line-opacity': 0.75
			}
		});
	}
}



// functions that calculates the estTime for a run
const getEstTime = () => {
	let pace = helpers.getElement("pace").value
	let distance = distanceManuel

	const paceInSecondsPerKm = convertPace(pace);
	const totalTimeInSeconds = paceInSecondsPerKm * distance;
	const hours = Math.floor(totalTimeInSeconds / 3600);
	const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
	const seconds = Math.round(totalTimeInSeconds % 60);

	return { hours, minutes, seconds };
}


// convert the pace to seconds to calculate the estTime in the API
const convertPace = (pace) => {

	const [minutes, seconds] = pace.split('.').map(Number);
	return (minutes * 60 + seconds);
}

// calculate if a forecast is possible for a given date
const calculateForecast = () => {

	// get the current date
	let currentDate = getCurrentTime()
	currentDate = currentDate[0]
	const dateTime = `${currentDate.year}-${currentDate.month}-${currentDate.day} ${currentDate.hours}:${currentDate.minutes}:${currentDate.seconds}`;
	const hourOfRun = helpers.getElement("time").value.split(":")[0]
	let dateOfRun = helpers.getElement("date").value + " " + hourOfRun + ":00:00"

	// calculate the differences of the two dates
	const dateOfRunAsDate = new Date(dateOfRun);
	const currentDateTime = new Date(dateTime);
	const differenceInMilliseconds = dateOfRunAsDate.getTime() - currentDateTime.getTime();
	const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

	if (differenceInDays > 4) {
		return console.log("No weather forecast possible!")
	}
	else { // as the api outputs a forecast for every three hours, the start time needed to be adjusted to find a result
		if (hourOfRun % 3 != 0) { 
			let roundedHour = Math.ceil(hourOfRun / 3) * 3
			dateOfRun = helpers.getElement("date").value + " " + roundedHour + ":00:00"
		}
		getWeather(dateOfRun)
	}
};

// function that returns an object with the current Date including seconds
const getCurrentTime = () => {

	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');

	let currentDate = { year: year, month: month, day: day, hours: hours, minutes: minutes, seconds: seconds }

	return [currentDate]
}



//Function to communicate with weather api
const getWeather = (dateOfRun) => {

	let APIkey = "ef0be8741e4014fa14dca7ce0b59de51"
	const userlocation = document.getElementById("city").value.toLowerCase()

	// 1. Retrieve the long and lat of the users starting point
	fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userlocation}&limit=1&appid=${APIkey}`)
		.then(response => {

			if (!response.ok) {
				throw new Error("response not ok");
			}
			return response.json();
		})
		// 2. Fetch the weather forecast for this specific place
		.then(data => {
			fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${APIkey}`)
				.then(response => response.json())
				.then(weatherData => {
					// it outputs weather for the next days for every 3 hours
					// find the right time for our run
					for (let day of weatherData.list) {
						if (day.dt_txt == dateOfRun) {

							let temperature = day.main.temp
							popUpEntries.temperature = temperature
							let weathertype = day.weather[0].description
							console.log("Description: ", weathertype)
							popUpEntries.description = weathertype
							let iconCode = day.weather[0].icon;
							icon = iconCode
							temperatureForCard = temperature

							//getting the image from the website
							let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
							popUpEntries.iconUrl = iconUrl

							const imgElement = document.createElement("img");
							imgElement.src = iconUrl;
						}
					}
				})
				.catch(error => {
					console.error("Error fetching weather data: ", error);
				});
		})
		.catch(error => {
			console.error("Error fetching location data: ", error);
		});
}


const ACCESS_TOKEN = 'pk.eyJ1IjoicGhpbGtvbGxpbmciLCJhIjoiY2x0dmo0ZjNsMW41NTJpbzNoc2UxbHl3OCJ9.gEa1CLRvnfd_uL5Ttzgm9g';

//when the page loads
window.onload = () => {
	createRunsLayout()
	document.getElementById("city").setAttribute("disabled","true")
	const collection = mapboxsearch.autofill({
		accessToken: ACCESS_TOKEN
	})
}

// create navigation bar 
let navigationBar = tabBar.createNavigationBar();
document.body.insertBefore(navigationBar, document.body.firstChild);