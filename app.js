// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
// select span
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  // linksContainer.classList.toggle("show-links");

  const linksHeight = links.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
  // console.log(linksContainer.getBoundingClientRect());
});

// ********** fixed navbar ************

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }
  // setup back to top link

  if (scrollHeight > 500) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // prevent default
    e.preventDefault();
    // navigate to specific spot
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    // close
    linksContainer.style.height = 0;
  });
});
// calculate heights

function loadPage() {
  var t = setTimeout(loadHome, 1000);
}

function loadHome() {
  document.getElementById("main").classList.remove('d-none');
  document.getElementById("loader").classList.add('d-none');

}

let currentlyActiveProject;
const allrocards = document.querySelectorAll('.rotating-cards');

function playPauseAnimations(){
  // console.log(allrocards[0].parentElement.classList.toggle('.pause-animation'));
  allrocards[0].parentElement.classList.toggle('pause-animation')
}

function toggleProjects(ProjectDesc){
  if(currentlyActiveProject==undefined){
    currentlyActiveProject = ProjectDesc;  
    currentlyActiveProject.classList.remove('d-none');
    
  }
  else if(currentlyActiveProject === ProjectDesc){
    currentlyActiveProject.classList.add('d-none');
    currentlyActiveProject = undefined;
  }
  else{
    currentlyActiveProject.classList.add('d-none');
    currentlyActiveProject = ProjectDesc;
    currentlyActiveProject.classList.remove('d-none');
  }
  playPauseAnimations();
}

window.addEventListener("DOMContentLoaded", function(){
  loadHome();
  // setTimeout(loadHome, 2000);
  Array.from(allrocards).forEach((e)=>{
    e.addEventListener('click',()=>{
      const getItsDesc = document.getElementById(`dex-${e.dataset.toggle}`);
      toggleProjects(getItsDesc);
    })
  })

  const losobjects = document.querySelectorAll('.loadOnScroll');
  const navHeight = document.querySelector('nav').offsetHeight;
  window.addEventListener('scroll', function(){
    const currentHeight = window.pageYOffset;
    Array.from(losobjects).forEach((e)=>{
      const top = e.getBoundingClientRect().top - window.innerHeight;
      const bottom = e.getBoundingClientRect().bottom - navHeight;
      if( top*bottom < 0){
          e.classList.add('show');
          e.classList.add('translate0px');
      }
      else{
          e.classList.remove('translate0px');
          e.classList.remove('show');
      }
    })
  })
});

function loadonscroll(){
}
