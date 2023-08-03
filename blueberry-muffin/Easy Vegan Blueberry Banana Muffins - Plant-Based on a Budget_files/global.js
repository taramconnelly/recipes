/*!
 * Immediately Invoked Function Expression Boilerplate
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 */
;(function () {

    'use strict';

    // Element variables
    const menuToggle = document.querySelector('.menu-toggle');
    const headerSearch = document.querySelector('.header-search');
    const navMenu = document.querySelector('.nav-menu');
    const searchToggles = document.querySelectorAll('.search-toggle');
    const searchField = document.querySelector('.header-search .wp-block-search__input');

    const elementExists = function(element) {
    	if ( typeof(element) != 'undefined' && element != null ) {
    		return true;
    	}
    	return false;
    }

    // Event functions
    const toggleMenu = function(event) {
    	if ( !event.target.closest('.menu-toggle') ) return;
    	if ( elementExists(searchToggles) ) {
    		for (let searchToggle of searchToggles) {
    			searchToggle.classList.remove('active');
    		}
    	}
    	if ( elementExists(headerSearch) ) {
    		headerSearch.classList.remove('active');
    	}
    	if ( elementExists(navMenu) ) {
			navMenu.classList.toggle('active');
		}
    	menuToggle.classList.toggle('active');
    }

    const toggleSubMenu = function(event) {
    	if ( !event.target.closest('.submenu-expand') ) return;
    	event.target.closest('.submenu-expand').classList.toggle('expanded');
    	event.preventDefault();
    }

    const toggleSearch = function(event) {
    	if ( !event.target.closest('.search-toggle') ) return;
    	if ( elementExists(menuToggle) ) {
			menuToggle.classList.remove('active');
		}
		if ( elementExists(navMenu) ) {
			navMenu.classList.remove('active');
		}
		if ( elementExists(headerSearch) ) {
    		for( let searchToggle of searchToggles ) {
    			searchToggle.classList.toggle('active');
    		}
    		headerSearch.classList.toggle('active');
    		if ( elementExists(searchField) ) {
				searchField.focus();
			}
    	} else {
    		document.dispatchEvent(new CustomEvent('slick-show-discovery'));
    	}
    }

    // Add functions to click event listener
    document.addEventListener('click', function(event) {
    	toggleMenu(event);
    	toggleSubMenu(event);
    	toggleSearch(event);
    });

	// Slickstream JS
	const sr = document.querySelectorAll('.post-header__favorite');

	// This returns the Slickstream API object,
	// waiting if necessary for loading to complete

	async function ensureSlickstream() {
	   if (window.slickstream) {
	       return window.slickstream.v1;
	   }
	   return new Promise((resolve, reject) => {
	      document.addEventListener('slickstream-ready', () => {
	         resolve(window.slickstream.v1);
	      });
	   });
	}

	async function updateFavoriteButtonState() {
	   const slickstream = await ensureSlickstream();
	   const isFavorite = slickstream.favorites.getState();
	   for( var i = 0, len = sr.length; i < len; i++ ) {
		   if ( slickstream.favorites.getState() ) {
			   sr[i].classList.add('active');
		   } else {
			   sr[i].classList.remove('active');
		   }
		}
	}

	for( var i = 0, len = sr.length; i < len; i++ ) {
		sr[i].addEventListener( 'click', function(e) {
			e.preventDefault();
		});
		sr[i].addEventListener('click', async() => {
		   const slickstream = await ensureSlickstream();
		   const state = slickstream.favorites.getState();
		   slickstream.favorites.setState(!state);
		});
	}

	// If the favorite state has changed this event will fire and
	// this ensures your display of the state remains correct
	document.addEventListener('slickstream-favorite-change', () => {
	  updateFavoriteButtonState();
	});
	// After the page loads, this will ensure your display
	// is updated as soon as the info is available
	updateFavoriteButtonState();

})();
