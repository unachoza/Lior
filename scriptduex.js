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
console.log('this is the modal', modal);

const openButton = document.getElementById('open-model-button');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const addClientForm = document.getElementById('client-form');
const clientNameElement = document.getElementById('client-name');
const clientContainer = document.getElementById('client-container');

// Array for list of clients
let clients = [];

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

openButton.addEventListener('click', showModal);
// modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => {
  console.log('clicked');
  modal.classList.remove('show-modal');
});
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));

// Build Client List
const buildClientList = () => {
  clientContainer.textContent = '';
  clients.forEach((client) => {
    const { name } = client;
    const clientItem = document.createElement('div');
    clientItem.classList.add('drag-item');
    clientItem.textContent = name;
    clientContainer.appendChild(clientItem);
  });
};
const fetchClientList = () => {
  if (localStorage.getItem('clients')) {
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

// Adding Clients to Client List
const addClient = (e) => {
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
};

addClientForm.addEventListener('submit', addClient);
