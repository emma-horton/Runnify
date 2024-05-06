import { joinPopup, cancelJoinPopup } from './join.js';
import createCommentsPopup from './comment.js';

// for getting map in the card
const getRoute = async (coordinatesString, mapContainer) => {

    let coordinatesArray = coordinatesString.split(';').map(coord => coord.split(',').map(Number));
    console.log(coordinatesArray);

    let startLong = coordinatesArray[0][0];
    let startLat = coordinatesArray[0][1];

    const map = new mapboxgl.Map({
        container: mapContainer,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [startLong, startLat],
        zoom: 12
    });

    map.on('style.load', () => {
        fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${coordinatesString}?geometries=geojson&access_token=${mapboxgl.accessToken}`)
            .then(response => response.json())
            .then(json => {
                if (json.routes && json.routes.length > 0) {
                    const data = json.routes[0];
                    const route = data.geometry.coordinates;
                    const geojson = {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: route
                        }
                    };
                    plotMap(map, geojson, coordinatesArray);
                    map.resize();
                } else {
                    console.error('No route found.');
                }
            })
            .catch(error => {
                console.error('Error fetching route:', error);
            });
    });
};


// for creating card
function createCard(runningData, coordinate, profileImgSrc, title, name, joinCount, likesCount, likesUser, participant, commentsData, weather, cardId, finished, currentUser) {
    // console.log(currentUser);

    // card wrapper which contains card and comments popup
    let cardWrapper = document.createElement("div");
    cardWrapper.className = "card-wrapper";

    // card container
    let cardContainer = document.createElement("div");
    cardContainer.className = "card-container";
    cardContainer.dataset.finished = finished;

    // card
    let card = document.createElement("div");
    card.className = "card";
    card.id = cardId;

    // card image container
    let cardImage = document.createElement("div");
    cardImage.className = "card_image";

    // left part for showing running data
    let leftPart = createLeftPart(runningData);

    // right part for showing map 
    let rightPart = document.createElement("div");
    rightPart.className = "right_part";

    let mapContainer = document.createElement("div");
    mapContainer.id = `map-container`;
    rightPart.appendChild(mapContainer);

    // console.log(coordinate)
    getRoute(coordinate, mapContainer);


    // add weather
    if (weather) {
        let weatherContainer = document.createElement("div");
        weatherContainer.className = "weather-container";

        let weatherIcon = document.createElement("img");
        weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
        weatherIcon.className = "weather-icon";

        let weatherTempContainer = document.createElement("div");
        weatherTempContainer.className = "weather-temp-container";

        let weatherTemp = document.createElement("span");
        weatherTemp.textContent = `${weather.temperature}°C`;
        weatherTemp.className = "weather-temp";

        weatherTempContainer.appendChild(weatherTemp);
        weatherContainer.appendChild(weatherIcon);
        weatherContainer.appendChild(weatherTempContainer);

        rightPart.appendChild(weatherContainer);
    } else {
        let noWeatherText = document.createElement("div");
        noWeatherText.className = "no-weather-text";
        noWeatherText.textContent = "No weather data available";

        rightPart.appendChild(noWeatherText);
    }

    cardImage.appendChild(leftPart);
    cardImage.appendChild(rightPart);

    // card content container
    let cardContent = document.createElement("div");
    cardContent.className = "card_content";

    // data container
    let data = document.createElement("div");
    data.className = "data";

    // image container
    let imgContainer = document.createElement("div");
    imgContainer.className = "img";

    fetchUserInfo(name)
        .then(userData => {
            let emoji = document.createElement('div');
            emoji.textContent = userData.userEmoji;
            emoji.classList.add('user-emoji');
            imgContainer.appendChild(emoji);
        })
        .catch(err => {
            console.error('Error fetching user info:', err);
        });

    // text container
    let text = document.createElement("div");
    text.className = "text";

    let textM = document.createElement("div");
    textM.className = "title";
    textM.textContent = title;

    let textS = document.createElement("div");
    textS.className = "name";
    textS.textContent = name;

    text.appendChild(textM);
    text.appendChild(textS);

    // add image and text
    data.appendChild(imgContainer);
    data.appendChild(text);

    // buttons container
    let btns = document.createElement("div");
    btns.className = "btns";

    // join button
    let join = document.createElement("div");
    join.className = "join";
    join.title = "Join"; // tooltip
    join.setAttribute("joined", participant.some(p => p.name === currentUser) ? "true" : "false");  // track the state of the button

    // icon
    let joinIcon = document.createElement("i");
    // set icon according to the state of the button
    joinIcon.className = participant.some(p => p.name === currentUser) ? "fa-solid fa-check" : "fa-regular fa-plus";

    // count
    let joinText = document.createElement("span");
    joinText.className = "join_text";
    joinText.textContent = joinCount;

    join.appendChild(joinIcon);
    join.appendChild(joinText);

    // popup for join button
    join.addEventListener('click', function () {
        let joined = this.getAttribute("joined") === "true";
        let count = parseInt(joinText.textContent);

        if (joined) {
            this.setAttribute("joined", "false");
            joinIcon.className = "fa-regular fa-plus";
            count--;

            let popup = cancelJoinPopup(); // popup for cancel join
            document.body.appendChild(popup);
            popup.classList.add('show');

            // update database
            participant = participant.filter(p => p.name !== currentUser);  // remove current user
            
            // update client side
            updateParticipantList(participant, peoplePopup);
            peopleText.textContent = participant.length;

            updateRun(cardId, null, participant, null);
        } else {
            this.setAttribute("joined", "true");
            joinIcon.className = "fa-solid fa-check";
            count++;

            let popup = joinPopup(); // popup for join
            document.body.appendChild(popup);
            popup.classList.add('show');
            join.title = "Joined"; // tooltip

            participant.push({ avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg', name: currentUser });  // add current user

            updateParticipantList(participant, peoplePopup);
            peopleText.textContent = participant.length;

            updateRun(cardId, null, participant, null);
        }

        joinText.textContent = count;
    });

    // likes button
    let likes = document.createElement("div");
    likes.className = "likes";
    likes.title = "Likes";
    // likes.setAttribute("liked", liked);  // track the state of the button
    likes.setAttribute("liked", likesUser.some(p => p.name === currentUser) ? "true" : "false");

    let likesIcon = document.createElement("i");
    likesIcon.className = likesUser.some(p => p.name === currentUser) ? "fas fa-heart" : "far fa-heart";

    let likesText = document.createElement("span");
    likesText.className = "likes_text";
    likesText.textContent = likesCount;

    likes.appendChild(likesIcon);
    likes.appendChild(likesText);

    // add like count
    likes.addEventListener('click', function () {
        console.log("likes clicked")

        let liked = this.getAttribute("liked") === "true";
        let count = parseInt(likesText.textContent);

        if (liked) {
            this.setAttribute("liked", "false");
            likesIcon.className = "far fa-heart";
            count--;
            likesUser = likesUser.filter(p => p.name !== currentUser);  // remove current user
            updateRun(cardId, likesUser, null, null);
        } else {
            this.setAttribute("liked", "true");
            likesIcon.className = "fas fa-heart";
            count++;
            likesUser.push({ name: currentUser });  // add current user
            updateRun(cardId, likesUser, null, null);
        }

        likesText.textContent = count;
    });

    // comments button
    let comments = document.createElement("div");
    comments.className = "comments";
    comments.title = "Comments";

    let commentsIcon = document.createElement("i");
    commentsIcon.className = "fa-regular fa-comment";

    let commentsText = document.createElement("span");
    commentsText.className = "comments_text";
    commentsText.textContent = commentsData.length;  // according to the number of comments

    comments.appendChild(commentsIcon);
    comments.appendChild(commentsText);

    // create comments popup
    let commentsPopup = createCommentsPopup(card, commentsData, cardId, currentUser);
    let isCommentsOpen = false;  // it is open or not

    comments.addEventListener('click', function () {
        isCommentsOpen = !isCommentsOpen;
        commentsPopup.classList.toggle('show', isCommentsOpen);
        card.classList.toggle('comments-open', isCommentsOpen);

        // for not being covered by other cards
        if (isCommentsOpen) {
            card.style.zIndex = 1000;
        } else {
            card.style.zIndex = ''; // restore
        }
    });

    // close button
    let closeButton = document.createElement("button");
    closeButton.className = "close-button";
    closeButton.innerHTML = "&times;";  // simple cross

    closeButton.addEventListener('click', function () {
        isCommentsOpen = false;
        commentsPopup.classList.remove('show');
        card.classList.remove('comments-open');
        card.style.zIndex = '';
    });

    commentsPopup.appendChild(closeButton);


    // people button
    let people = document.createElement("div");
    people.className = "people";
    people.title = "Participants";

    let peopleIcon = document.createElement("i");
    peopleIcon.className = "fa-solid fa-user-group";

    let peopleText = document.createElement("span");
    peopleText.className = "people_text";
    peopleText.textContent = participant.length;

    people.appendChild(peopleIcon);
    people.appendChild(peopleText);

    // create popup showing participants
    let peoplePopup = createPeoplePopup(participant, peopleText, card);
    let isPeopleOpen = false;  // it is open or not

    people.addEventListener('click', function () {
        isPeopleOpen = !isPeopleOpen;
        peoplePopup.classList.toggle('show', isPeopleOpen);
        card.classList.toggle('people-open', isPeopleOpen);

        // for not being covered by other cards
        if (isPeopleOpen) {
            card.style.zIndex = 1000;
        } else {
            card.style.zIndex = ''; // restore
        }
    });

    btns.appendChild(join);
    btns.appendChild(likes);
    btns.appendChild(comments);
    btns.appendChild(people);

    cardContent.appendChild(data);
    cardContent.appendChild(btns);

    card.appendChild(cardImage);
    card.appendChild(cardContent);
    card.appendChild(commentsPopup);
    card.appendChild(peoplePopup);

    cardContainer.appendChild(card);

    rowContainer.addEventListener('mouseover', function (event) {
        if (isPeopleOpen && !card.contains(event.target)) {
            isPeopleOpen = false;
            peoplePopup.classList.remove('show');
            card.classList.remove('people-open');
            card.style.zIndex = '';
        }
    });

    rowContainer.appendChild(cardContainer);

    return cardContainer;
}

// big container to contain all cards
let rowContainer = document.createElement("div");
rowContainer.id = "rowContainer";
rowContainer.className = "row";
rowContainer.style.display = "flex";
rowContainer.style.flexDirection = "column";

document.body.appendChild(rowContainer);

// get the data from the server to create the cards
window.onload = function () {
    fetchRouteData();
};

function getPaceFire(pace) {
    if (pace > 7) {
        return ' 🔥';
    } else if (pace <= 7 && pace > 4) {
        return ' 🔥 🔥';
    } else {
        return ' 🔥 🔥 🔥';
    }
}

function fetchRouteData() {
    fetch('/api/fetchRuns')
        .then(response => response.json())
        .then(responseData => {
            const currentUser = responseData[0];  // who is the current user?
            const data = responseData[1];  // get the second which is "data"
            const rowContainer = document.getElementById('rowContainer');

            data.forEach(d => {
                console.log(d);

                const runningData = [
                    { label: 'Date', value: d.date },
                    { label: 'Street', value: d.street },
                    { label: 'City', value: d.city },
                    { label: 'Start Time', value: d.time },
                    { label: 'Distance', value: `${d.distance} km` },
                    {
                        label: 'Pace',
                        value: `${d.pace} min/km ${getPaceFire(d.pace)}`
                    }
                ];

                const card = createCard(
                    runningData,
                    d.coordinates || [], // map
                    // 'https://raw.githubusercontent.com/Alleluia23/picbed/b1605a20bfb7d5bfa454e61670e14fcb0048bc35/uPic/Screenshot%20from%202024-03-31%2023-54-04.png'
                    d.profileImage || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg', // profile image
                    `Run in ${d.city} on ${d.date}`, // title
                    d.username || "Runner", // username who created the run
                    d.participants.length || 0, // initial join count
                    d.likes.length || 0, // initial likes count
                    d.likes || [],  // initial likes users (who click like)
                    d.participants || [], // initial participant
                    d.comments || [], // initial comments
                    d.weather,
                    d._id,  // run id
                    d.finished || false,  // is the run finished?
                    currentUser,
                );

                rowContainer.appendChild(card);
            });
        })
        .catch(err => {
            console.error('Error fetching runs:', err);
        });
}

function fetchUserInfo(user) {
    return fetch(`/fetchUserInfo/${user}`)
        .then(res => res.json())
        .then(userData => {
            console.log(userData);
            return userData;
        });
}

export function updateRun(cardId, likes, participants, comments) {
    fetch('/api/updateRun', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId, likes, participants, comments })
    })
        .then(response => response.json())
        .then(updatedRun => {
            // rowContainer.innerHTML = '';
            // fetchRouteData();
        })
        .catch(err => {
            console.error('Error updating run:', err);
        });
}


// refresh button 
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
    fetchUpdates()
});

export function fetchUpdates() {
    fetch('/api/fetchRuns')
        .then(response => {
            return response.json();
        })
        .then(data => {
            handleUpdates(data);
        })
        .catch(err => {
            console.error('Error fetching data:', err);
        });
}

function handleUpdates(data) {
    const currentUser = data[0];
    const newData = data[1];

    const currentCards = document.querySelectorAll('.card');
    const currentCardIds = Array.from(currentCards).map(card => card.dataset.id);

    newData.forEach(run => {
        const runId = run.id;
        const existingCardIndex = currentCardIds.indexOf(runId);

        if (existingCardIndex === -1) {
            const newCard = createCard(run, run.mapImage, run.profileImgSrc, run.title, run.name, run.joinCount, run.likesCount, run.likesUser, run.participant, run.commentsData, runId, currentUser);
            cardsContainer.appendChild(newCard);
        } else {
            const existingCard = currentCards[existingCardIndex];
            updateCard(existingCard, run, currentUser);
        }
    });

    currentCards.forEach(card => {
        const cardId = card.dataset.id;
        if (!newData.some(run => run.id === cardId)) {
            card.remove();
        }
    });
}

// use for updating some critical data on the card 
function updateCard(card, runningData, currentUser) {
    // console.log(runningData);

    // update join count
    card.querySelector('.join_text').textContent = runningData.participants.length;

    // update likes count
    card.querySelector('.likes_text').textContent = runningData.likes.length;

    // update like state
    const likeButton = card.querySelector('.likes');
    likeButton.dataset.liked = runningData.likes.includes(currentUser) ? 'true' : 'false';

    // update participant list
    const participantList = card.querySelector('.people-content');
    participantList.innerHTML = '';
    runningData.participants.forEach(participant => {
        const participantItem = document.createElement('li');
        participantItem.textContent = participant;
        participantList.appendChild(participantItem);
    });

    // update comment
    const commentList = card.querySelector('.comments-content');
    commentList.innerHTML = '';
    runningData.comments.forEach(comment => {
        const commentItem = document.createElement('li');
        commentItem.textContent = `${comment.user}: ${comment.text}`;
        commentList.appendChild(commentItem);
    });
}

