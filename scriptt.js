if ('serviceWorker' in navigator) {
  // Register service worker
  navigator.serviceWorker
    .register('sw.js')
    .then(function (reg) {
      console.log('SW registration succeeded. Scope is ' + reg);
    })
    .catch(function (err) {
      console.error('SW registration failed with error ' + err);
    });
}
//Initializing Variables
let savedClientList = [];
let savedClientHours = [];
let clients = [];

////NAVIGATION DOM
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');
const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');
const navItems = [nav1, nav2, nav3, nav4, nav5];

// Clients Section DOM
const newClientButton = document.getElementById('new-client-button');
const addClientButton = document.getElementById('add-client-button');
const modalElement = document.getElementById('modal');
const modalElementClientList = document.getElementById('modalList');
const addClientForm = document.getElementById('client-form');
const clientNameElement = document.getElementById('client-name');
const clientContainer = document.getElementById('client-container');
const modalClientList = document.getElementById('modal-content-list');

// Week Hours DOM
const thisWeekHoursList = document.getElementById('hours-container');
const timeButtons = document.getElementsByClassName('add-time-buttons');
const sixtyMin = document.getElementById('60min');
const fourtyfiveMin = document.getElementById('45min');
const thirtyMin = document.getElementById('30min');
///////// addHoursButtonsFunctionality
sixtyMin.setAttribute('value', 1);
fourtyfiveMin.setAttribute('value', 0.75);
thirtyMin.setAttribute('value', 0.5);
[].forEach.call([sixtyMin, fourtyfiveMin, thirtyMin], (button) => {
  button.addEventListener('click', (e) => addHour(savedClientHours, e));
});

const addHoursButtonsFunctionality = (button) => {
  button.setAttribute('value', 1);
  button.addEventListener('click', (e) => addThirty(savedClientHours));
};

const showPopup = (modalInput) => {
  modalInput.classList.remove('hide');
  modalInput.classList.add('popup-open');
};
const hidePopup = (modalInput) => {
  modalInput.classList.add('hide');
  modalInput.classList.remove('popup-open');
};
const showClientListToBeAddedToThisWeek = (savedClientList) => {
  {
    modalClientList.childNodes.length !== clientContainer.childNodes.length
      ? savedClientList.forEach((client) => {
          const { clientName } = client;
          const clientListName = document.createElement('div');
          clientListName.classList.add('item');
          clientListName.appendChild(document.createTextNode(clientName));
          clientListName.addEventListener('click', (e) =>
            selectClientFromPopUpToBeAddedToThisWeekHours(e, savedClientHours)
          );
          modalClientList.appendChild(clientListName);
        })
      : null;
  }
};

const selectClientFromPopUpToBeAddedToThisWeekHours = (e, savedClientHours) => {
  if (!localStorage.getItem('thisWeek')) {
    let selectedClient = {
      thisWeekClientName: e.target.outerText,
      hours: 0,
    };
    savedClientHours.push(selectedClient);
    localStorage.setItem('thisWeek', JSON.stringify(savedClientHours));
    buildThisWeekHoursList();
  }
  if (localStorage.getItem('thisWeek')) {
    let savedhours = JSON.parse(localStorage.getItem('thisWeek'));
    let clientExisits = savedhours.filter((saved) => saved.thisWeekClientName === e.target.textContent);
    if (clientExisits.length) {
    } else {
      let selectedClient = {
        thisWeekClientName: e.target.outerText,
        hours: 0,
      };
      savedClientHours.push(selectedClient);
      localStorage.setItem('thisWeek', JSON.stringify(savedClientHours));
      buildThisWeekHoursList();
    }
    hidePopup(modalElementClientList);
  }
};

window.addEventListener('click', (e) => {
  let selected = document.querySelectorAll('.selected-item');
  e.target.className === 'column-container'
    ? [].forEach.call(selected, (el) => el.classList.remove('selected-item'))
    : false;
});

const addHoursToClientThisWeek = (e) => {
  let thisWeelTarget = e.target; //the entire node
  let selectedElm = e.target.attributes[2].nodeValue; //grab  name of client from local storage object
  [thisWeelTarget, sixtyMin, fourtyfiveMin, thirtyMin].forEach((element) => element.classList.add('selected-item'));
  [].forEach.call(timeButtons, (el) => el.classList.remove('hide'));
  let selectedClientData = savedClientHours.find((client) => client.thisWeekClientName === selectedElm);
  return selectedClientData, selectedElm;
};

const addHour = (selectedClientData, e) => {
  let buttonValue = e.target.attributes[2].nodeValue;
  buttonValue = Number(buttonValue);
  let clientAddTo = document.getElementsByClassName('selected-item')[0].attributes.name.value;
  let selectedData = savedClientHours.find((client) => client.thisWeekClientName === clientAddTo);
  selectedData.hours += buttonValue;
  localStorage.setItem('thisWeek', JSON.stringify(selectedClientData));
  let elms = document.querySelectorAll('.selected-item');
  [].forEach.call(elms, (el) => el.classList.remove('selected-item'));
  buildThisWeekHoursList();
};

const buildThisWeekHoursList = () => {
  thisWeekHoursList.textContent = '';
  if (localStorage.getItem('thisWeek')) {
    let thisWeekList = JSON.parse(localStorage.getItem('thisWeek'));
    thisWeekList.forEach((thisWeek, i) => {
      const { thisWeekClientName, hours } = thisWeek;
      const thisWeekClientItem = document.createElement('div');
      thisWeekClientItem.setAttribute('id', `clientHours-${i}`);
      thisWeekClientItem.setAttribute('value', hours);
      thisWeekClientItem.setAttribute('name', thisWeekClientName);
      thisWeekClientItem.classList.add('item');
      // thisWeekClientItem.insertAdjacentHTML(
      //   'afterend',
      //   `<div id="clientHours-${i}">${thisWeekClientName}<span>Hours : ${hours}</span></div>`
      // );
      thisWeekClientItem.textContent = `${thisWeekClientName}, Hours : ${hours}`;
      thisWeekClientItem.addEventListener('click', (e) => addHoursToClientThisWeek(e));
      thisWeekHoursList.appendChild(thisWeekClientItem);
    });
    const totalItem = document.createElement('div');
    totalItem.classList.add('total-item');
    totalItem.textContent = `Total Hours : ${totalHoursThisWeek(thisWeekList)}`;
    thisWeekHoursList.appendChild(totalItem);
  }
};
const totalHoursThisWeek = (array) => {
  let total = 0;
  array.forEach((value) => (total += value.hours));
  return total;
};

newClientButton.addEventListener('click', () => showPopup(modalElement));
addClientButton.addEventListener('click', () => {
  showPopup(modalElementClientList);
  showClientListToBeAddedToThisWeek(savedClientList);
});

const buildClientList = () => {
  clientContainer.textContent = '';
  savedClientList
    ? savedClientList.forEach((client) => {
        const { clientName } = client;
        const clientItem = document.createElement('div');
        clientItem.classList.add('item');
        clientItem.textContent = clientName;
        clientContainer.appendChild(clientItem);
      })
    : null;
};

const addClient = () => {
  let date = new Date();
  date = date.toLocaleDateString();
  const nameValue = clientNameElement.value;
  const newClient = {
    date,
    clientName: nameValue,
  };
  savedClientList.push(newClient);
  localStorage.setItem('clients', JSON.stringify(savedClientList));
  buildClientList();
  addClientForm.reset();
  clientNameElement.focus();
  hidePopup(modalElement);
};

const fetchClientListFromLocalStorage = () => {
  if (localStorage.getItem('clients')) savedClientList = JSON.parse(localStorage.getItem('clients'));
  if (localStorage.getItem('thisWeek')) savedClientHours = JSON.parse(localStorage.getItem('thisWeek'));
  buildClientList();
  buildThisWeekHoursList();
};

///////NAVIGATION JS
const navAnimation = (direction1, direction2) => {
  navItems.forEach((nav, i) => {
    nav.classList.replace(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`);
  });
};

const toggleNav = () => {
  menuBars.classList.toggle('change');
  overlay.classList.toggle('overlay-active');
  if (overlay.classList.contains('overlay-active')) {
    overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
    navAnimation('out', 'in');
  } else {
    overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
    navAnimation('in', 'out');
  }
};
addClientForm.addEventListener('submit', addClient);
menuBars.addEventListener('click', toggleNav);
navItems.forEach((nav) => {
  nav.addEventListener('click', toggleNav);
});

// fetchClientListFromLocalStorage();
// const makeHashTableForLocalStorage = () => {}
