/* ============================================================
   PORTFOLIO – VANILLA JS
   File: assets/js/script.js

   SECTIONS
   A. Mobile Menu — toggle open/close + keyboard accessibility
   B. Auto-close Mobile Menu on Resize
   C. Header Scroll Shadow
   D. Projects Data & Dynamic Card Rendering
   E. Footer Copyright Year
   ============================================================ */


/* ── A. Mobile Menu ───────────────────────────────────────── */

const hamburger = document.getElementById('hamburger-btn');
const mobileNav = document.getElementById('mobile-nav');

/**
 * Close the mobile menu and reset the button's ARIA state.
 * Extracted into a function so it can be reused by multiple listeners.
 */
function closeMobileMenu() {
    mobileNav.hidden = true;
    hamburger.setAttribute('aria-expanded', 'false');
}

// Toggle menu open/closed when the hamburger button is clicked
hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
        closeMobileMenu();
    } else {
        mobileNav.hidden = false;
        hamburger.setAttribute('aria-expanded', 'true');
    }
});

// Close the menu when any mobile nav link is clicked
// querySelectorAll returns a NodeList; forEach lets us loop over it
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
});


/* ── B. Auto-close Mobile Menu on Resize ─────────────────── */
/*
   If the user opens the mobile menu and then widens the browser
   window, the mobile nav would stay visible behind the desktop nav.
   This listener closes it as soon as the viewport passes 768px.
*/
const DESKTOP_BREAKPOINT = 768; // must match the CSS media query

window.addEventListener('resize', function () {
    if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        closeMobileMenu();
    }
}, { passive: true }); // passive: true = browser can scroll without waiting for JS


/* ── C. Header Scroll Shadow ──────────────────────────────── */
/*
   Adds an extra shadow to the header once the user scrolls down,
   making it visually "lift" off the page.
*/
const header = document.getElementById('site-header');

window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08)';
    } else {
        header.style.boxShadow = 'none';
    }
}, { passive: true });


/* ── D. Projects Data & Dynamic Card Rendering ────────────── */
/*
   Storing data in a JS array (instead of hard-coding HTML) is a
   best practice. To add a new project, just add an object to this
   array — no need to touch the HTML.

   HOW TO REPLACE PLACEHOLDER IMAGES:
   1. Save your image as a JPEG or PNG, e.g. "project-ecommerce.jpg"
   2. Put it inside: assets/images/
   3. Update the "image" path below, e.g.: 'assets/images/project-ecommerce.jpg'
*/
const projects = [
    {
        title: 'E-Commerce Platform',
        description: 'A modern online shopping experience with seamless checkout and product management.',
        image: 'assets/images/project-ecommerce.svg', // ← replace .svg with your real image
        tags: ['HTML', 'CSS', 'JavaScript'],
        link: '#'  // ← replace '#' with the live URL of your project
    },
    {
        title: 'Portfolio Website',
        description: 'A sleek and responsive portfolio showcasing creative work and design projects.',
        image: 'assets/images/project-portfolio.svg', // ← replace with your image
        tags: ['HTML', 'CSS', 'JavaScript'],
        link: '#'
    },
    {
        title: 'Mobile App Interface',
        description: 'An intuitive mobile-first design with smooth animations and user-friendly navigation.',
        image: 'assets/images/project-mobile.svg',    // ← replace with your image
        tags: ['HTML', 'CSS', 'JavaScript'],
        link: '#'
    }
];

/**
 * Creates and returns a project card DOM element.
 *
 * @param  {Object} project - A project object from the array above.
 * @returns {HTMLElement}   - The fully built <article> card element.
 */
function createProjectCard(project) {
    // Build the tag badges HTML string
    const tagsHTML = project.tags
        .map(function (tag) {
            return '<span class="tag">' + tag + '</span>';
        })
        .join('');  // join('') removes the commas between array items

    // Create the card element
    const card = document.createElement('article');
    card.className = 'project-card';

    // innerHTML lets us write the inner HTML as a template string
    card.innerHTML = `
    <div class="project-img-wrap">
      <img
        src="${project.image}"
        alt="${project.title} project screenshot"
        width="800"
        height="480"
        loading="lazy"
      />
      <a href="${project.link}" class="project-link-icon" aria-label="View ${project.title} project">
        <img src="assets/icons/icon-external-link.svg" alt="" width="20" height="20" aria-hidden="true" />
      </a>
    </div>
    <div class="project-info">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="tags">${tagsHTML}</div>
    </div>
  `;

    return card;
}

// Grab the grid container and append one card per project
const projectsGrid = document.getElementById('projects-grid');

projects.forEach(function (project) {
    projectsGrid.appendChild(createProjectCard(project));
});


/* ── E. Footer Copyright Year ─────────────────────────────── */
/*
   Automatically keeps the copyright year up to date.
   new Date() → current date object
   .getFullYear() → 4-digit year as a number
*/
const footerCopy = document.getElementById('footer-copy');
footerCopy.textContent = '© ' + new Date().getFullYear() + ' Dan. All rights reserved.';
