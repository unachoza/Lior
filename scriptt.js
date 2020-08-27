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

const openModal = () => {
  modalElement.classList.add('open-modal');
};

const showPopup = () => {
  modalElement.classList.remove('hide');
  modalElement.classList.add('popup-open');
};
const hidePopup = (element) => {
  element.classList.add('hide');
  element.classList.remove('popup-open');
};

clientButton.addEventListener('click', showPopup);

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
