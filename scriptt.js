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

//Client Variables
let savedClientList;

// const openModal = () => {
//   modalElement.classList.add('open-modal');
// };

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
    clientListName.textContent = clientName;
    modalClientList.appendChild(clientListName);
  });
};
const selectClient = () => {
  //append this
  console.log('stuff');
};

newClientButton.addEventListener('click', () => showPopup(modalElement));
addClientButton.addEventListener('click', (e) => {
  showPopup(modalElementClientList);
  showClientList(savedClientList);
});

const buildClientList = () => {
  console.log('who are the', savedClientList);
  clientContainer.textContent = '';
  savedClientList
    ? savedClientList.forEach((client) => {
        console.log(client);
        const { clientName } = client;
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
