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

//Client Variables
let savedClientList = [];
let savedClientHours = [];

const showPopup = (modalInput) => {
  modalInput.classList.remove('hide');
  modalInput.classList.add('popup-open');
};
const hidePopup = (modalInput) => {
  modalInput.classList.add('hide');
  modalInput.classList.remove('popup-open');
};
const showClientList = (savedClientList, e) => {
  savedClientList.forEach((client) => {
    const { clientName } = client;
    const clientListName = document.createElement('div');
    clientListName.classList.add('item');
    var node = document.createTextNode(clientName);
    clientListName.appendChild(node);
    clientListName.addEventListener('click', (e) => selectClient(e));
    modalClientList.appendChild(clientListName);
  });
};
const selectClient = (e) => {
  //from local storagesavedClientHours
  savedClientHours;
  let thisWeekClientName = e.target.outerText;
  console.log(thisWeekClientName.outerText, savedClientList[0].clientName);
  console.log(thisWeekHoursList.attributes[1]);
  //need to check array in local storage too
  if (thisWeekHoursList.attributes[1].childNodes.length > 1) {
    console.log(true, 'length exisits');
  } else {
    let selectedClient = {
      thisWeekClientName,
      hours: 0,
    };

    //array that is in local storage
    savedClientHours.push(selectedClient);
    localStorage.setItem('thisWeek', JSON.stringify(savedClientHours));
  }
  buildThisWeekHoursList();
  hidePopup(modalElementClientList);
  //check if NOT alredy rendered client
  // thisWeekHoursList
  // if not create element to append to this weeks hours
  //if so access their hours
};

const addHoursToClient = (e) => {
  // let selectedClient = thisWeekHoursList.childNodes[0].textContent
  let selected = e.target.innerHTML;
  console.log('this client was clicked on', selected);
  //change css to commiunicate that client was selected
  //find client in localstorage array  thisWeek.thisWeekClientName and save the entire obj
  // access hours from obj, allow add hours add 30min button to function
  // add thier value to current value and update obj
  // add updatedobj to localstorage this week arrayName
  //re render dom BUILD THIS WEEK HOURS
};

const buildThisWeekHoursList = () => {
  let thisWeekList = JSON.parse(localStorage.getItem('thisWeek'));
  console.log('this is the list for this week', thisWeekList);
  thisWeekList
    ? thisWeekList.forEach((thisWeek) => {
        const { thisWeekClientName, hours } = thisWeek;
        const thisWeekClientItem = document.createElement('div');
        thisWeekClientItem.classList.add('item');
        thisWeekClientItem.textContent = thisWeek.thisWeekClientName;
        thisWeekClientItem.addEventListener('click', (e) => addHoursToClient(e));
        thisWeekHoursList.appendChild(thisWeekClientItem);
      })
    : null;
};

newClientButton.addEventListener('click', () => showPopup(modalElement));
addClientButton.addEventListener('click', (e) => {
  showPopup(modalElementClientList);
  showClientList(savedClientList);
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
  console.log(savedClientList);
  localStorage.setItem('clients', JSON.stringify(savedClientList));
  fetchClientListFromLocalStorage();
  addClientForm.reset();
  clientNameElement.focus();
  hidePopup(modalElement);
};

const fetchClientListFromLocalStorage = () => {
  console.log('running');
  if (localStorage.getItem('clients')) {
    console.log(true, 'totally');
    savedClientList = JSON.parse(localStorage.getItem('clients'));
    console.log('in localStorage this list needs to appear', savedClientList);
  }
  buildClientList();
};

addClientForm.addEventListener('submit', addClient);

///////NAVIGATION JS
const navAnimation = (direction1, direction2) => {
  navItems.forEach((nav, i) => {
    nav.classList.replace(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`);
  });
};

const toggleNav = () => {
  console.log('clike');
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

menuBars.addEventListener('click', toggleNav);
navItems.forEach((nav) => {
  nav.addEventListener('click', toggleNav);
});

fetchClientListFromLocalStorage();
