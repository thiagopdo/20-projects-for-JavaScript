const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');
const navItems = [nav1, nav2, nav3, nav4, nav5];

//contro navigation animado
function navAnimation(dir1, dir2) {
  navItems.forEach((nav, i) => {
    nav.classList.replace(`slide-${dir1}-${i + 1}`, `slide-${dir2}-${i + 1}`);
  });
}

function toggleNav() {
  //Toggle: menu bar abrir fechar
  menuBars.classList.toggle('change');
  //toggle: menu ativo
  overlay.classList.toggle('overlay-active');
  if (overlay.classList.contains('overlay-active')) {
    //animar overlay
    overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
    //animção de entrada - nav item
    navAnimation('out', 'in');
  } else {
    //sair da animaçao
    overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');

    //animção de saida - nav item
    navAnimation('in', 'out');
  }
}

//Event Listeners
menuBars.addEventListener('click', toggleNav);
navItems.forEach((nav) => {
  nav.addEventListener('click', toggleNav);
});
