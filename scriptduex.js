// //NAVIGATION DOM
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

//MODAL DOM
const modal = document.getElementById('modal');
//Client Variables
let savedClientList;
// const openButton = document.getElementById('open-model-button');
// Clients Section DOM
const clientButton = document.getElementById('add-client-button');
const modalElement = document.getElementById('modal');
const addClientForm = document.getElementById('client-form');
const clientNameElement = document.getElementById('client-name');
const clientContainer = document.getElementById('client-container');

//Client Variables

const openModal = () => {
  modalElement.classList.add('open-modal');
};

const showPopup = () => {
  console.log('clicked');
  modalElement.classList.remove('hide');
  modalElement.classList.add('popup-open');
};
const hidePopup = () => {
  modalElement.classList.add('hide');
  modalElement.classList.remove('popup-open');
};

clientButton.addEventListener('click', showPopup);

// Array for list of clients

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

// Show Modal, Focus on Input
const showModal = () => {
  modal.classList.add('show-modal');
};

// Modal Event Listeners
// openButton.addEventListener('click', showModal);
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));

const buildClientList = () => {
  console.log('who are the', savedClientList);
  clientContainer.textContent = '';
  savedClientList
    ? savedClientList.forEach((client) => {
        console.log(client);
        const { clientName, clientHours } = client;
        const clientItem = document.createElement('div');
        clientItem.classList.add('item');
        clientItem.textContent = clientName;
        clientContainer.appendChild(clientItem);
      })
    : null;
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
  localStorage.setItem('clients', JSON.stringify(clients));
  fetchClientListFromLocalStorage();
  addClientForm.reset();
  clientNameElement.focus();
  hidePopup();
};

const fetchClientListFromLocalStorage = () => {
  if (localStorage.getItem('clients')) savedClientList = JSON.parse(localStorage.getItem('clients'));
  buildClientList();
};

fetchClientListFromLocalStorage();
addClientForm.addEventListener('submit', addClient);

// add time to client
const addTimeToClient = (client, time) => {
  client.hours = +-time;
  console.log(client);
};
