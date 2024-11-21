// index.js
import getData from './getData.js';
import createTable from './table.js';
import search from './search.js';

function displayErrorMessage(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

document.getElementById('api-buttons').addEventListener('click', async (event) => {
    if (event.target.tagName !== 'BUTTON') return;

    const actionMethod = event.target.dataset.api;
    const resultDiv = document.getElementById('result');

    try {
        const apiData = await getData.fetchData(actionMethod);

        if (actionMethod === 'getAllAPITalents' && event.target.id === 'fetch-talents') {
            createTable(apiData, resultDiv);
            search();
        } else {
            resultDiv.innerHTML = `<pre>${JSON.stringify(apiData, null, 2)}</pre>`;
        }

    } catch (error) {
        console.error('Error:', error);
        displayErrorMessage(`Failed to fetch data for ${actionMethod}. Please try again later.`);
    }
});

// clear cache
document.getElementById('clear-cache').addEventListener('click', () => {
    localStorage.clear();
    console.log('Cache cleared');
});
