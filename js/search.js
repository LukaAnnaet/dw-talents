//search.js

const jsonFilters = {
    "search": ["t", "c", "g"], // s
    "rarity": ["any", "com", "rar", "adv"], // r
    "requirements": ["str", "ftd", "agl", "int", "wll", "cha"], // rq
    "stats": ["health", "ether", "posture", "carry", "pasagl", "sanity"], // st
    "exclusive": ["a", "y", "n", "h"], // e
    "order": ["none", "atoz", "ztoa", "mreqs", "lreqs", "mstats", "lstats"], // or
    "other": ["close", "devkey"] // o
};

function search() {
    const currentURL = new URL(window.location.href);
    const currentParams = new URLSearchParams(currentURL.search);

    Object.keys(jsonFilters).forEach(key => {
        const paramValue = currentParams.get(key);
        if (paramValue && jsonFilters[key].includes(paramValue)) { // checks if the key exists and if the value is in the json or not
            filterTable(key, paramValue);
        } else if (paramValue == null) {
        } else {
            console.warn(`Value is bad: ${paramValue}`);
        }
    });
}

function filterTable(key, value) {
    const dataTable = new DataTable('#result-table');
    const filterFunctions = {
        // search:

        'rarity': function (dataTable, value) {
            const rarityMap = {'any': '', 'com': 'Common', 'rar': 'Rare', 'adv': 'Advanced'};
            const columnIndex = 3;
            const key = rarityMap[value];
            if (key != null && key != undefined) { dataTable.column(columnIndex).search(key);
            } else { console.warn(`Key doesn't match: key: ${key} value: ${value}`); }
        },

        // requirements:

        // stats:

        'exclusive': function (dataTable, value) {
            const columnIndex = 6;
            if (value === 'h') { const column = dataTable.column(columnIndex); column.visible(!column.visible()); // this bugs out
            } else if (value === 'y') { dataTable.column(columnIndex).search(`^(?!None$).*`, true, false).draw();
            } else if (value === 'n') { dataTable.column(columnIndex).search('None');
            } else if (value === 'a') { dataTable.column(columnIndex).search('');
            } else {
                console.warn(`you shouldn't be able to reach here: ${value}`);
            }
        }

        // sort:

        // other:
    };

    const filter = filterFunctions[key];
    if (filter) { 
        filter(dataTable, value);
    } else {
        console.warn(`No filter logic defined for key: ${key}`);
    }

    dataTable.draw();
}

function buttonListener() {
    const globalSearch = document.getElementById('talents-search-input-container').addEventListener("input", e => {
        const inputText = e.target.value
        dataTable.search(inputText).draw();
    });

    const filterGrid = document.querySelectorAll('.talents-search-filter');
    filterGrid.forEach(group => {
        const filterAnchors = group.querySelectorAll('.filter-button');
        filterAnchors.forEach(link => {
            link.addEventListener('click', event => {
                search();
            });
        });
    });

    window.addEventListener('popstate', () => {
        search();
    });
}

export default function mainSearch() {
    search();
    buttonListener();
}
