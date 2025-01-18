// index.js
import getData from './getData.js';
import createTable from './table.js';
import search from './search.js';
import button from './button.js';

function displayErrorMessage(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

// main
async function main() {
    const resultDiv = document.getElementById('result');

    const [talentData, mysticData] = await Promise.all([
        getData.fetchData('getTalents'),
        getData.fetchData('getMystic')
    ]);

    await new Promise(resolve => setTimeout(resolve, 0));

    createTable(talentData, mysticData, resultDiv);
    button();
    search();
}

// clear cache
document.getElementById('clear-cache').addEventListener('click', () => {
    localStorage.clear();
    console.log('Cache cleared');
});

main();
