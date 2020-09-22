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
const clientButton = document.getElementById('add-client-button');
const modalElement = document.getElementById('modal');
const addClientForm = document.getElementById('client-form');
const clientNameElement = document.getElementById('client-name');
const clientContainer = document.getElementById('client-container');

//Client Variables
let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedClientList;

const openModal = () => {
  modalElement.classList.add('open-modal');
};

const showPopup = () => {
  modalElement.classList.remove('hide');
  modalElement.classList.add('popup-open');
};
const hidePopup = () => {
  modalElement.classList.add('hide');
  modalElement.classList.remove('popup-open');
};

clientButton.addEventListener('click', showPopup);

const buildClientList = () => {
  console.log('who are the', savedClientList);
  clientContainer.textContent = '';
  savedClientList.forEach((client) => {
    const { clientName, clientHours } = client;
    const clientItem = document.createElement('div');
    clientItem.classList.add('item');
    clientItem.textContent = clientName;
    clientContainer.appendChild(clientItem);
  });
};

const addClient = (e) => {
  console.log('add client func');
  e.preventDefault();
  const nameValue = clientNameElement.value;
  const newClient = {
    clientName: nameValue,
    clientHours: 0,
  };
  clients.push(newClient);
  console.log(clients);
  localStorage.setItem('cliens', JSON.stringify(clients));
  fetchClientListFromLocalStorage();
  addClientForm.reset();
  clientNameElement.focus();
  hidePopup();
};

// function restorePreviousCountdown() {
//   // Get countdown from localStorage if available
//   if (localStorage.getItem('countdown')) {
//     inputContainer.hidden = true;
//     savedCountdown = JSON.parse(localStorage.getItem('countdown'));
//     countdownTitle = savedCountdown.title;
//     countdownDate = savedCountdown.date;
//     countdownValue = new Date(countdownDate).getTime();
//     updateDOM();
//   }
// }

// clientName = savedClientList.name;
// clientHours = savedClientList.hours;
const fetchClientListFromLocalStorage = () => {
  if (localStorage.getItem('clients')) {
    console.log('yes');
    savedClientList = JSON.parse(localStorage.getItem('clients'));
    console.log(savedClientList);
  } else {
    savedClientList = {
      clientName: 'Choza',
      hours: 0,
    };
    localStorage.setItem('clients', JSON.stringify(savedClientList));
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
