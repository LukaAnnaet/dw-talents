// index.js
import GetAPIObjects from './GetAPIObjects.js';
import talentTable from './Talents.js';

document.getElementById('api-buttons').addEventListener('click', async (event) => {
    if (event.target.tagName !== 'BUTTON') return;

    const actionMethod = event.target.dataset.api;
    const resultDiv = document.getElementById('result');

    try {
        const apiData = await GetAPIObjects[actionMethod]();
        if (actionMethod === 'getAllAPITalents' && event.target.id === 'fetch-talents') {
            resultDiv.innerHTML = talentTable(apiData);
        } else{
            resultDiv.innerHTML = `<pre>${JSON.stringify(apiData, null, 2)}</pre>`;
        }
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = '<p style="color: red;">An error occurred while fetching data. Please try again later.</p>';
    }
});
