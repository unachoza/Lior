//KANBAN DOM
const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogListElement = document.getElementById('backlog-list');
const progressListElement = document.getElementById('progress-list');
const completeListElement = document.getElementById('complete-list');
const onHoldListElement = document.getElementById('on-hold-list');

//NAVIGATION DOM
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
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');

let updatedOnLoad = false;
let onHoldListArray = [];
let listArrays = [];

let draggedItem;
let dragging = false;
let currentColumn;
let totalClientHoursArray = [];

const getSavedColumnsFromLocalStorageOrSetDefault = () => {
  localStorage.getItem('onHoldItems')
    ? (onHoldListArray = JSON.parse(localStorage.onHoldItems))
    : (onHoldListArray = ['Josh']);
};

const updateSavedColumnsInLocalStorage = () => {
  listArrays = [onHoldListArray];
  const arrayNames = ['onHold'];
  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]));
  });
};

const removeEmptyValues = (array) => (filteredArray = array.filter((item) => item !== null));

const createItemElements = (columnElement, column, item, index) => {
  const listElement = document.createElement('li');
  listElement.textContent = item;
  listElement.id = index;
  listElement.classList.add('drag-item');
  listElement.contentEditable = true;
  columnElement.appendChild(listElement);
};

const updateDOM = () => {
  if (!updatedOnLoad) getSavedColumnsFromLocalStorageOrSetDefault();
  onHoldListElement.textContent = '';
  onHoldListArray.forEach((onHoldItem, index) => createItemElements(onHoldListElement, 0, onHoldItem, index));
  onHoldListArray = removeEmptyValues(onHoldListArray);
  updatedOnLoad = true;
  updateSavedColumnsInLocalStorage();
};

const addToColumn = (column) => {
  const itemText = addItems[column].textContent;
  const selectedArray = listArrays[column];
  selectedArray.push(itemText);
  addItems[column].textContent = '';
  updateDOM(column);
};

//delete item
const updateItem = (id, column) => {
  const selectedArray = listArrays[column];
  const selectedColumn = listColumns[column].children;
  if (!dragging) {
    !selectedColumn[id].textContent ? delete selectedArray[id] : (selectedArray[id] = selectedColumn[id].textContent);
    updateDOM();
  }
};

const showInputBox = (column) => {
  addBtns[column].style.visibility = 'hidden';
  saveItemBtns[column].style.display = 'flex';
  addItemContainers[column].style.display = 'flex';
};

const hideInputBox = (column) => {
  addBtns[column].style.visibility = 'visible';
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';
  addToColumn(column);
};
// const createItemElements = (columnElement, column, item, index) => {
//   const listElement = document.createElement('li');
//   listElement.textContent = item;
//   listElement.id = index;
//   listElement.classList.add('drag-item');
//   listElement.contentEditable = true;
//   columnElement.appendChild(listElement);
// };
const displayClientHours = (client, columnElement, index) => {
  console.log('clicked');
  // const
  const clientHoursElement = document.createElement('li');
  clientHoursElement.innerHTML = `
  <div class="client-title">
  <div>Josh</div>
  <div class="client-hours">0</div>
  </div>
  <div class="button-group">
  <div class="add-btn" onclick="">
    <span class="plus-sign">+</span>
    <span>1hr</span>
  </div>
  <div class="add-btn" onclick="">
    <span class="plus-sign">+</span>
    <span>30 min</span>
  </div>
  </div>
`;
  // clientHoursElement.textContent = 0;
  clientHoursElement.id = index;
  clientHoursElement.classList.add('client-hours-container');
  columnElement.appendChild(clientHoursElement);
  modal;
  modal.classList.remove('show-modal');
  totalClientHoursArray.push();

  console.log(clientHoursElement);
  // let;
  // localStorage.setItem('countdown', JSON.stringify(savedCountdown));
  // // Check if no date entered
  // if (countdownDate === '') {
  //   alert('Please select a date for the countdown.');
  // } else {
  //   // Get number version of current Date, updateDOM
  //   countdownValue = new Date(countdownDate).getTime();
  //   updateDOM();
  // }
};
const displayWeekTotal = (array) => {
  let sum = array.reduce((pv, cv) => pv + cv, 0);
};

updateDOM();

// Control Navigation Animation
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

// Show Modal, Focus on Input
const showModal = () => {
  modal.classList.add('show-modal');
};

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));
// Navigation Event Listeners
menuBars.addEventListener('click', toggleNav);
navItems.forEach((nav) => {
  nav.addEventListener('click', toggleNav);
});
