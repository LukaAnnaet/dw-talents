// index.js
import GetAPIObjects from './internal/GetAPIObjects.js';

document.getElementById('api-buttons').addEventListener('click', async (event) => {
    if (event.target.tagName !== 'BUTTON') return;

    const actionMethod = event.target.dataset.api;
    const resultDiv = document.getElementById('result');

    try {
        const apiData = await GetAPIObjects[actionMethod]();
        if (actionMethod === 'getAllAPITalents') {
            resultDiv.innerHTML = generateTalentTable(apiData);
        } else{
            resultDiv.innerHTML = `<pre>${JSON.stringify(apiData, null, 2)}</pre>`;
        }
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = '<p style="color: red;">An error occurred while fetching data. Please try again later.</p>';
    }
});

// Function to generate dynamic HTML table based on the API data
function generateTalentTable(data) {
    // Create the table structure
    let table = `
        <table border="1" cellspacing="0" cellpadding="5" style="width: 100%; text-align:left;">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Rarity</th>
              <th>Category</th>
              <th>Requirements</th>
              <th>Exclusive With</th>
              <th>Stats</th>
            </tr>
          </thead>
          <tbody>`;

    // Loop through each talent in the API data and create a row for it
    for (const key in data) {
        const talent = data[key]; // Each talent object
        table += `
            <tr>
              <td>${talent.name}</td>
              <td>${talent.desc}</td>
              <td>${talent.rarity}</td>
              <td>${talent.category}</td>
              <td>
                <strong>Power:</strong> ${talent.reqs.power || 'N/A'}<br>
                <strong>Base Stats:</strong> ${formatBaseStats(talent.reqs.base)}<br>
                <strong>Weapon:</strong> ${formatWeapon(talent.reqs.weapon)}<br>
                <strong>Attunement:</strong> ${formatAttunement(talent.reqs.attunement)}
              </td>
              <td>${talent.exclusiveWith.join(', ') || 'None'}</td>
              <td>${talent.stats}</td>
            </tr>`;
    }

    // Close the table tag
    table += `</tbody></table>`;
    return table;
}

// Helper functions to format the nested data (base stats, weapon, attunement)
function formatBaseStats(base) {
    return `Strength: ${base.Strength}, Fortitude: ${base.Fortitude}, Agility: ${base.Agility}, Intelligence: ${base.Intelligence}, Willpower: ${base.Willpower}, Charisma: ${base.Charisma}`;
}

function formatWeapon(weapon) {
    return `Light: ${weapon['Light Wep.']}, Medium: ${weapon['Medium Wep.']}, Heavy: ${weapon['Heavy Wep.']}`;
}

function formatAttunement(attunement) {
    return `Flamecharm: ${attunement.Flamecharm}, Frostdraw: ${attunement.Frostdraw}, Thundercall: ${attunement.Thundercall}, Galebreathe: ${attunement.Galebreathe}, Shadowcast: ${attunement.Shadowcast}, Ironsing: ${attunement.Ironsing}`;
}
