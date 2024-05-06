import * as tabBar from './tabBar.js';

// join
export function joinPopup() {
    let popup = document.createElement('div');
    popup.id = 'joinPopup';
    popup.className = 'join-popup';

    let card = document.createElement('div');
    card.className = 'join-card';

    let iconContainer = document.createElement('div');
    iconContainer.className = 'join-icon-container';

    let icon = document.createElement('i');
    icon.className = 'fas fa-check join-icon';
    icon.style.color = '#4CAF50';

    iconContainer.appendChild(icon);
    card.appendChild(iconContainer);

    let header = document.createElement('div');
    header.className = 'join-header';
    header.textContent = 'JOINED';

    let content = document.createElement('div');
    content.className = 'join-content';

    let message = document.createElement('p');
    message.className = 'join-message';
    message.textContent = 'You have successfully joined!';

    content.appendChild(message);
    card.appendChild(header);
    card.appendChild(content);

    let okButton = document.createElement('button');
    okButton.id = 'joinOkButton';
    okButton.className = 'join-ok-button';
    okButton.textContent = 'OK';

    card.appendChild(okButton);
    popup.appendChild(card);

    // for close animation
    okButton.addEventListener('click', function () {
        card.classList.add('slide-out');
        setTimeout(function() {
            popup.classList.remove('show');
            document.body.removeChild(popup);
        }, 200);
    });

    return popup;
}

// cancle join
export function cancelJoinPopup() {
    let popup = document.createElement('div');
    popup.id = 'cancelJoinPopup';
    popup.className = 'join-popup';

    let card = document.createElement('div');
    card.className = 'join-card';

    let iconContainer = document.createElement('div');
    iconContainer.className = 'join-icon-container';

    let icon = document.createElement('i');
    icon.className = 'fas fa-times join-icon'; // use cross icon for cancel
    icon.style.color = 'gray';

    iconContainer.appendChild(icon);
    card.appendChild(iconContainer);

    let header = document.createElement('div');
    header.className = 'join-header';
    header.textContent = 'CANCELLED';
    header.style.color = 'gray';

    let content = document.createElement('div');
    content.className = 'join-content';

    let message = document.createElement('p');
    message.className = 'join-message';
    message.textContent = 'You have cancelled your join.';

    content.appendChild(message);
    card.appendChild(header);
    card.appendChild(content);

    let okButton = document.createElement('button');
    okButton.id = 'joinOkButton';
    okButton.className = 'join-ok-button';
    okButton.textContent = 'OK';

    card.appendChild(okButton);
    popup.appendChild(card);

    // for close animation
    okButton.addEventListener('click', function () {
        card.classList.add('slide-out');
        setTimeout(function () {
            popup.classList.remove('show');
            document.body.removeChild(popup);
        }, 200);
    });

    return popup;
}

let navigationBar = tabBar.createNavigationBar();
document.body.insertBefore(navigationBar, document.body.firstChild);

fetch('/updateToPastRun')
        .then(res => res.json())
        .then(jsn => console.log(jsn))
        .catch(err=> console.log('oh dear!', err))