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

// Clients Section
const clientButton = document.getElementById('add-client-button');
const modalElement = document.getElementById('modal');
const addClientForm = document.getElementById('client-form');
const clientNameElement = document.getElementById('client-name');
const clientContainer = document.getElementById('client-container');

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

//make add client form work with: add to dom: add to local storage
// Adding Clients to Client List
// Build Client List
const buildClientList = () => {
  clientContainer.textContent = '';
  clients.forEach((client) => {
    const { name } = client;
    const clientItem = document.createElement('div');
    clientItem.classList.add('item');
    clientItem.textContent = name;
    clientContainer.appendChild(clientItem);
  });
};

const addClient = (e) => {
  console;
  e.preventDefault();
  const nameValue = clientNameElement.value;
  const client = {
    name: nameValue,
    // hours: clientHoursValue,
  };
  clients.push(client);
  localStorage.setItem('clients', JSON.stringify(clients));
  fetchClientList();
  addClientForm.reset();
  clientNameElement.focus();
  hidePopup();
};
const fetchClientList = () => {
  if (localStorage.getItem('clients')) {
    console.log('yes');
    clients = JSON.parse(localStorage.getItem('clients'));
  } else {
    clients = [
      {
        name: 'Choza ',
      },
    ];
    localStorage.setItem('clients', JSON.stringify(clients));
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
