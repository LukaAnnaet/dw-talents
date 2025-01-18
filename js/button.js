// button.js

const jsonFilters = {
    "search": ["t", "c", "g"], // s
    "rarity": ["any", "com", "rar", "adv"], // r
    "requirements": ["str", "ftd", "agl", "int", "wll", "cha"], // rq
    "stats": ["health", "ether", "posture", "carry", "pasagl", "sanity"], // st
    "exclusive": ["a", "y", "n", "h"], // e
    "order": ["none", "atoz", "ztoa", "mreqs", "lreqs", "mstats", "lstats"], // or
    "other": ["close", "devkey"] // o
};

const defaultFilters = {
    "search": "t",
    "rarity": "any",
    "requirements": "",
    "stats": "",
    "exclusive": "a",
    "order": "none",
    "other": ""
};


function activeUpdate() { // adds the "ON" UI to the button
    // logic soon
}

function linkUpdate() { // function does 3 things, updates the link of the button, and adds the "ON" UI to the button
    const currentURL = new URL(window.location.href); // and finally emits an event that search.js will listen to
    const filterGrid = document.querySelectorAll('.talents-search-filter');

    filterGrid.forEach((currentGroup, i) => {
        const filterLinks = currentGroup.querySelectorAll('.filter-button');
        
        filterLinks.forEach((currentButton, j) => {
            const filter = currentButton.dataset.filter;
            const groupValues = Object.values(jsonFilters)[i];
            const currentParams = new URLSearchParams(currentURL.search);

            if (groupValues.includes(filter)) { // adding and changing parameters
                const key = Object.keys(jsonFilters)[i];
                const value = groupValues[j];
                const defaultValue = Object.values(defaultFilters)[i];

                if (defaultValue === value) { // handles default value
                    // If the current value is the default, activate the default button
                    if (!currentParams.has(key) || currentParams.get(key) === defaultValue) {
                        currentButton.classList.add('active-button');
                    } else {
                        currentButton.classList.remove('active-button');
                        currentParams.delete(key);
                    }
                } else {
                    if (value === currentParams.get(key)) { // removing already existing parameter
                        currentButton.classList.add('active-button'); // if parameter already exists in link, add ui
                        currentParams.delete(key, value)
                    } else { // if the filter code doesn't match the link parameter, run this
                        currentButton.classList.remove('active-button'); // if paramter doesn't exist in link, remove ui
                        currentParams.set(key, value); // (basically just adds the parameter)
                    }
                }

                const sortedParams = new URLSearchParams(); // sorts urlsearchparams by jsonfilter order
                Object.keys(jsonFilters).forEach(param =>{
                    const paramValue = currentParams.get(param);
                    if (paramValue) sortedParams.set(param, paramValue);
                }); // this can probably be improved by having it further up

                currentButton.href = sortedParams.toString() 
                ? `${currentURL.pathname}?${sortedParams.toString()}`
                : currentURL.pathname; // doesn't leave trailing '?' behind
                
            } else {
                console.warn(`Button data: ${filter} not in jsonFilters`);
            }
        });
    });
}

function addListener() { // adds a listener to each button that, when pressed, prevent normal link behavior and grab the link of the button
    const filterGrid = document.querySelectorAll('.talents-search-filter'); // and push it up instead alongside updating other links
    filterGrid.forEach(group => {
        const filterAnchors = group.querySelectorAll('.filter-button');
        filterAnchors.forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                const button = event.target;
                window.history.pushState({}, '', button.href);
                activeUpdate();
                linkUpdate();
            });
        });
    });

    window.addEventListener('popstate', () => {
        activeUpdate();
        linkUpdate();
    });
}

export default function mainButton() {
    activeUpdate();
    linkUpdate();
    addListener();
}
