function createPeoplePopup(participant, peopleText, card) {
    let popup = document.createElement('div');
    popup.className = 'people-popup';

    let content = document.createElement('div');
    content.className = 'people-content';

    let title = document.createElement('div');
    title.className = 'people-title';
    title.textContent = 'Participants';
    content.appendChild(title);

    updateParticipantList(participant, content);

    popup.appendChild(content);

    return popup;
}

function updateParticipantList(participant, peopleContent) {
    peopleContent.innerHTML = '';

    participant.forEach(function (person) {
        let personDiv = document.createElement('div');
        personDiv.className = 'person';

        let emojiContainer = document.createElement('div');
        emojiContainer.className = 'emoji-container';

        fetchUserInfo(person.name)
            .then(userData => {
                let emoji = document.createElement('div');
                emoji.textContent = userData.userEmoji;
                emoji.classList.add('user-emoji');
                emojiContainer.appendChild(emoji);
            })
            .catch(err => {
                console.error('Error fetching user info:', err);
            });

        let personInfo = document.createElement('div');
        personInfo.className = 'person-info';

        let nameSpan = document.createElement('span');
        nameSpan.className = 'person-name';
        nameSpan.textContent = person.name;

        let statusSpan = document.createElement('span');
        statusSpan.className = 'person-status';
        statusSpan.textContent = 'joined this run';

        personInfo.appendChild(nameSpan);
        personInfo.appendChild(statusSpan);

        personDiv.appendChild(emojiContainer);
        personDiv.appendChild(personInfo);
        peopleContent.appendChild(personDiv);
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