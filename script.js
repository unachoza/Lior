const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogListElement = document.getElementById('backlog-list');
const progressListElement = document.getElementById('progress-list');
const completeListElement = document.getElementById('complete-list');
const onHoldListElement = document.getElementById('on-hold-list');

let updatedOnLoad = false;

let onHoldListArray = [];
let listArrays = [];

let draggedItem;
let dragging = false;
let currentColumn;

const getSavedColumnsFromLocalStorageOrSetDefault = () => {
  if (localStorage.getItem('onHoldItems')) {
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    onHoldListArray = ['Josh'];
  }
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
  listElement.draggable = true;
  listElement.setAttribute('onfocusout', `updateItem(${index}, ${column})`);
  listElement.setAttribute('ondragstart', 'drag(event)');
  listElement.contentEditable = true;
  columnElement.appendChild(listElement);
};

const updateDOM = () => {
  if (!updatedOnLoad) getSavedColumnsFromLocalStorageOrSetDefault();
  onHoldListElement.textContent = '';
  onHoldListArray.forEach((onHoldItem, index) => createItemElements(onHoldListElement, 0, onHoldItem, index));
  onHoldListArray = removeEmptyValues(onHoldListArray);
  updatedOnLoad = true;
  console.log('here');
  updateSavedColumnsInLocalStorage();
};

const updateItem = (id, column) => {
  const selectedArray = listArrays[column];
  const selectedColumn = listColumns[column].children;
  if (!dragging) {
    !selectedColumn[id].textContent ? delete selectedArray[id] : (selectedArray[id] = selectedColumn[id].textContent);
    updateDOM();
  }
};

const addToColumn = (column) => {
  const itemText = addItems[column].textContent;
  const selectedArray = listArrays[column];
  selectedArray.push(itemText);
  addItems[column].textContent = '';
  updateDOM(column);
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

updateDOM();
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

// Control Navigation Animation
function navAnimation(direction1, direction2) {
  navItems.forEach((nav, i) => {
    nav.classList.replace(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`);
  });
}

function toggleNav() {
  // Toggle: Menu Bars Open/Closed
  menuBars.classList.toggle('change');
  // Toggle: Menu Active
  overlay.classList.toggle('overlay-active');
  if (overlay.classList.contains('overlay-active')) {
    // Animate In - Overlay
    overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
    // Animate In - Nav Items
    navAnimation('out', 'in');
  } else {
    // Animate Out - Overlay
    overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
    // Animate Out - Nav Items
    navAnimation('in', 'out');
  }
}

// Event Listeners
menuBars.addEventListener('click', toggleNav);
navItems.forEach((nav) => {
  nav.addEventListener('click', toggleNav);
});
