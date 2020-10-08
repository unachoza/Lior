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
sixtyMin.setAttribute('value', 1);
sixtyMin.addEventListener('click', () => addHour(savedClientHours));
sixtyMin.addEventListener('click', (e) => addThirty(savedClientHours));
thirtyMin.setAttribute('value', 0.5);

//Initializing Variables
let savedClientList = [];
let savedClientHours = [];
let answer;
let theSelectedClient = answer;

const showPopup = (modalInput) => {
  modalInput.classList.remove('hide');
  modalInput.classList.add('popup-open');
};
const hidePopup = (modalInput) => {
  modalInput.classList.add('hide');
  modalInput.classList.remove('popup-open');
};
const showClientList = (savedClientList) => {
  //if not equal then run the list
  {
    modalClientList.childNodes.length !== clientContainer.childNodes.length
      ? savedClientList.forEach((client) => {
          const { clientName } = client;
          const clientListName = document.createElement('div');
          clientListName.classList.add('item');
          // let node = document.createTextNode(clientName);
          clientListName.appendChild(document.createTextNode(clientName));
          clientListName.addEventListener('click', (e) => selectClient(e, savedClientHours));
          modalClientList.appendChild(clientListName);
        })
      : console.log('show client list:  equal');
  }
};
const superSelector = (e) => {
  let thisClickedVariable = e.target;
  return thisClickedVariable;
};

const selectClient = (e, savedClientHours) => {
  if (localStorage.getItem('thisWeek')) {
    let savedhours = JSON.parse(localStorage.getItem('thisWeek'));
    let clientExisits = savedhours.filter((saved) => saved.thisWeekClientName === e.target.textContent);
    console.log(savedhours[0].thisWeekClientName === e.target.textContent);
    if (clientExisits.length) {
      console.log('already here let us move on');
    } else {
      console.log('need to add');
      let selectedClient = {
        thisWeekClientName: e.target.outerText,
        hours: 0,
      };
      savedClientHours.push(selectedClient);
      localStorage.setItem('thisWeek', JSON.stringify(savedClientHours));
      buildThisWeekHoursList();
    }
    hidePopup(modalElementClientList);
    // if not create element to append to this weeks hours
    //if so access their hours
  }
};
///////// not being used currentlly////////
const selectClientToAddHours = (e) => {
  console.log(e.target);
  addSelectedstyle(e.target);

  //select client add highlighted client styles
  //make add 30 and add hr button available (remove disable)
  //grab this week client hours  and add selected buttons time
  //update local storage
  // able to deselect client and not add hours
};

///////// not being used currentlly////////
const addSelectedstyle = (element) => {
  element.classList.add('selected-item');
  let select = document.getElementsByClassName('selected-item');
  console.log(select);
};
const addHoursToClient = (e) => {
  console.log(e.target.attributes[2].nodeValue);
  let target = e.target;
  let selectedElm = e.target.attributes[2].nodeValue;
  [target, sixtyMin, fourtyfiveMin, thirtyMin].forEach((element) => element.classList.add('selected-item'));
  [].forEach.call(timeButtons, function (el) {
    el.classList.remove('hide');
  });

  /////////loop here
  console.log(savedClientHours, selectedElm);
  //change css to commiunicate that client was selected
  let selectedClientData = savedClientHours.find((client) => client.thisWeekClientName === selectedElm);
  console.log(selectedClientData);
  return selectedClientData, selectedElm;
  // re render dom BUILD THIS WEEK HIU
};
// answer = addHoursToClient(e);

const addHour = (selectedClientData, selectedElm) => {
  console.log(selectedClientData, selectedElm);
  let clientAddTo = document.getElementsByClassName('selected-item')[0].attributes.name.value;
  console.log(clientAddTo, 'gragged');
  let selectedData = savedClientHours.find((client) => client.thisWeekClientName === clientAddTo);
  console.log(selectedData);
  selectedData.hours += 1;
  console.log(selectedData, selectedClientData);
  localStorage.setItem('thisWeek', JSON.stringify(selectedClientData));
  let elms = document.querySelectorAll('.selected-item');
  console.log(elms, 'these sparkel');
  [].forEach.call(elms, function (el) {
    el.classList.remove('selected-item');
  });
  buildThisWeekHoursList();
};
// selectedClientData.hour + hour.value;
const addThirty = (selectedClientData) => {
  selectedClientData[0].hours += 0.5;
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
      thisWeekClientItem.textContent = `${thisWeekClientName}, Hours : ${hours}`;
      console.log(thisWeekClientItem.textContent, 'text content');
      thisWeekClientItem.addEventListener('click', (e) => addHoursToClient(e));
      // () => addHoursToClient(e)
      thisWeekHoursList.appendChild(thisWeekClientItem);
    });
  }
};

newClientButton.addEventListener('click', () => showPopup(modalElement));
addClientButton.addEventListener('click', () => {
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
