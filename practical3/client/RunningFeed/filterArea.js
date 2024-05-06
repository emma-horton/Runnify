
let filterContainer = document.createElement('div');
filterContainer.classList.add('filter-container');

// sort
let sortingArea = document.createElement('div');
sortingArea.classList.add('sorting-area');

let sortingTitle = document.createElement('h3');
sortingTitle.textContent = 'Sort ⏳';

// option
let sortingOptions = document.createElement('div');
sortingOptions.classList.add('sorting-options');

// sort by newest
let sortBtnNewest = document.createElement('button');
sortBtnNewest.textContent = 'Newest';
sortBtnNewest.addEventListener('click', () => {
  sortByNewest();
});

// sort by oldest
let sortBtnOldest = document.createElement('button');
sortBtnOldest.textContent = 'Soonest';
sortBtnOldest.addEventListener('click', () => {
  sortByOldest();
});

sortingOptions.appendChild(sortBtnNewest);
sortingOptions.appendChild(sortBtnOldest);

sortingArea.appendChild(sortingTitle);
sortingArea.appendChild(sortingOptions);

// filter
let filteringArea = document.createElement('div');
filteringArea.classList.add('filtering-area');

let filteringTitle = document.createElement('h3');
filteringTitle.textContent = 'Filter 🔍';

// option
let filteringOptions = document.createElement('div');
filteringOptions.classList.add('filtering-options');

// pace option
let paceOptions = document.createElement('div');
paceOptions.classList.add('pace-options');

let paceTitle = document.createElement('h4');
paceTitle.textContent = 'Pace 🏃🏽‍♂️';

let filterBtnPaceAll = document.createElement('button');
filterBtnPaceAll.textContent = 'All';
filterBtnPaceAll.addEventListener('click', () => {
  filterByPace('all');
});

let filterBtnPaceSlow = document.createElement('button');
filterBtnPaceSlow.textContent = '🔥 ( > 7 min/km )';
filterBtnPaceSlow.addEventListener('click', () => {
  filterByPace('slow');
});

let filterBtnPaceMedium = document.createElement('button');
filterBtnPaceMedium.textContent = '🔥🔥 ( 7 - 4 min/km )';
filterBtnPaceMedium.addEventListener('click', () => {
  filterByPace('medium');
});

let filterBtnPaceFast = document.createElement('button');
filterBtnPaceFast.textContent = '🔥🔥🔥 ( < 4 min/km )';
filterBtnPaceFast.addEventListener('click', () => {
  filterByPace('fast');
});

paceOptions.appendChild(paceTitle);
paceOptions.appendChild(filterBtnPaceAll);
paceOptions.appendChild(filterBtnPaceSlow);
paceOptions.appendChild(filterBtnPaceMedium);
paceOptions.appendChild(filterBtnPaceFast);

// distance option
let distanceOptions = document.createElement('div');
distanceOptions.classList.add('distance-options');

let distanceTitle = document.createElement('h4');
distanceTitle.textContent = 'Distance 🚩';

let filterBtnDistanceAll = document.createElement('button');
filterBtnDistanceAll.textContent = 'All';
filterBtnDistanceAll.addEventListener('click', () => {
  filterByDistance('all');
});

let filterBtnDistanceShort = document.createElement('button');
filterBtnDistanceShort.textContent = '< 5km';
filterBtnDistanceShort.addEventListener('click', () => {
  filterByDistance('short');
});

let filterBtnDistanceMedium = document.createElement('button');
filterBtnDistanceMedium.textContent = '5km - 10km';
filterBtnDistanceMedium.addEventListener('click', () => {
  filterByDistance('medium');
});

let filterBtnDistanceLong = document.createElement('button');
filterBtnDistanceLong.textContent = '> 10km';
filterBtnDistanceLong.addEventListener('click', () => {
  filterByDistance('long');
});

distanceOptions.appendChild(distanceTitle);
distanceOptions.appendChild(filterBtnDistanceAll);
distanceOptions.appendChild(filterBtnDistanceShort);
distanceOptions.appendChild(filterBtnDistanceMedium);
distanceOptions.appendChild(filterBtnDistanceLong);

filteringOptions.appendChild(paceOptions);
filteringOptions.appendChild(distanceOptions);

filteringArea.appendChild(filteringTitle);
filteringArea.appendChild(filteringOptions);

filterContainer.appendChild(sortingArea);
filterContainer.appendChild(filteringArea);

document.body.appendChild(filterContainer);

document.querySelectorAll('.filtering-options button').forEach(button => {
  button.addEventListener('click', function () {
    const section = this.closest('.pace-options') ? 'pace' : 'distance';
    const selectedValue = this.textContent.trim();
    updateButtonState(section, selectedValue);
    applyFilters();
  });
});

const sortButtons = document.querySelectorAll('.sorting-options button');

sortButtons.forEach(button => {
  button.addEventListener('click', function () {
    sortButtons.forEach(btn => btn.classList.remove('selected'));
    this.classList.add('selected');

    const sortType = this.textContent.toLowerCase();

    if (sortType === 'newest') {
      sortByNewest();
    } else if (sortType === 'soonest') {
      sortByOldest();
    }
  });
});


// sort by id because it shows the order when the run is created
function sortByNewest() {
  location.reload();
  const cards = document.querySelectorAll('.card-container');

  const sortedCards = Array.from(cards).sort((a, b) => {
    const idA = getIdValue(a);
    const idB = getIdValue(b);

    console.log(idA, idB);

    return idB.localeCompare(idA);
  });

  const rowContainer = document.getElementById('rowContainer');
  rowContainer.innerHTML = '';

  sortedCards.forEach(card => {
    rowContainer.appendChild(card);
  });
}

// sort by date
function sortByOldest() {
  const cards = document.querySelectorAll('.card-container');

  const sortedCards = Array.from(cards)
    .filter(card => card.dataset.finished !== "true")
    .sort((a, b) => {
      const dateA = getDateValue(a);
      const dateB = getDateValue(b);

      return new Date(dateA) - new Date(dateB);
    });

  const rowContainer = document.getElementById('rowContainer');
  rowContainer.innerHTML = '';

  sortedCards.forEach(card => {
    rowContainer.appendChild(card);
  });
}


// simply look for the date label in html
function getDateValue(card) {
  const labelElements = card.querySelectorAll('.data_label');
  for (const labelElement of labelElements) {
    if (labelElement.textContent === 'Date') {
      const valueElement = labelElement.nextElementSibling;
      if (valueElement && valueElement.classList.contains('data_value')) {
        return valueElement.textContent;
      }
    }
  }
  return '';
}

// look for id
function getIdValue(cardContainer) {
  const card = cardContainer.firstElementChild;
  return card ? card.id : '';
}

// filter by distance
function filterByDistance(distanceRange) {
  filterState.distance = distanceRange;
  updateButtonState('distance', distanceRange);
  applyFilters();
}

function getDistanceValue(card) {
  const labelElements = card.querySelectorAll('.data_label');
  for (const labelElement of labelElements) {
    if (labelElement.textContent === 'Distance') {
      const valueElement = labelElement.nextElementSibling;
      if (valueElement && valueElement.classList.contains('data_value')) {
        return valueElement.textContent;
      }
    }
  }
  return '';
}

function checkDistance(distance, distanceRange) {
  const distanceValue = parseFloat(distance);

  switch (distanceRange) {
    case 'short':
      return distanceValue < 5;
    case 'medium':
      return distanceValue >= 5 && distanceValue <= 10;
    case 'long':
      return distanceValue > 10;
    case 'all':
      return true;
  }
}


// sort by pace
function filterByPace(paceCategory) {
  filterState.pace = paceCategory;
  updateButtonState('pace', paceCategory);
  applyFilters();
}

function getPaceValue(card) {
  const labelElements = card.querySelectorAll('.data_label');
  for (const labelElement of labelElements) {
    if (labelElement.textContent === 'Pace') {
      const valueElement = labelElement.nextElementSibling;
      if (valueElement && valueElement.classList.contains('data_value')) {
        return valueElement.textContent;
      }
    }
  }
  return '';
}

function checkPace(pace, paceRange) {
  const paceValue = parseFloat(pace);

  switch (paceRange) {
    case 'all':
      return true;
    case 'slow':
      return paceValue > 7;
    case 'medium':
      return paceValue <= 7 && paceValue >= 4;
    case 'fast':
      return paceValue < 4;
    default:
      return true;
  }
}

let filterState = {
  distance: 'all',
  pace: 'all'
};

updateButtonState('distance', 'All');
updateButtonState('pace', 'All');

function updateButtonState(section, selectedValue) {
  const buttons = document.querySelectorAll(`.${section}-options button`);
  buttons.forEach(button => {
    const buttonText = button.textContent.toLowerCase();
    const selectedValueLowerCase = selectedValue.toLowerCase();
    if (selectedValueLowerCase === 'all' && buttonText.includes('all')) {
      button.classList.add('selected');
    } else if (buttonText === selectedValueLowerCase) {
      button.classList.add('selected');
    } else {
      button.classList.remove('selected');
    }
  });
}


function applyFilters() {
  const cards = document.querySelectorAll('.card-container');
  cards.forEach(card => {
    const distance = getDistanceValue(card);
    const pace = getPaceValue(card);
    const shouldShow = checkDistance(distance, filterState.distance) && checkPace(pace, filterState.pace);

    card.style.display = shouldShow ? 'block' : 'none';
  });
}
