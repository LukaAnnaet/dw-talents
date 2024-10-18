// table.js

export default function generateTalentTable(data) {
    let table = `
        <table border="1" cellspacing="0" cellpadding="5" style="width: 100%; text-align:left;" id="result-table">
        <thead>
            <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Rarity</th>
            <th>Category</th>
            <th>Requirements</th>
            <th>Exclusive With</th>
            <th>Stats</th>
            <th>Key (dev thing)</th>
            </tr>
        </thead>
        <tbody>`;

    for (const key in data) {
        const talent = data[key];
        const reqs = talent.reqs
        table += `
            <tr>
            <td>${talent.name}</td>
            <td>${talent.desc}</td>
            <td>${talent.rarity}</td>
            <td>${talent.category}</td>
            <td>
                ${formatRequirements(reqs)}
            </td>
            <td>${talent.exclusiveWith.join(', ') || 'None'}</td>
            <td>${talent.stats}</td>
            <td>${key}</td>
            </tr>`;
    }

    table += `</tbody></table>`;
    return table;
}

function formatRequirements(reqs) {
    let reqsOutput = ``;
    let statRequirements = [];
    Object.keys(reqs).forEach(key => {
        const value = reqs[key];
        switch (key) {
            case 'power':
                if (!Number(value)) break;
                reqsOutput += `<strong>Power:</strong> ${value || 'N/A'}<br>`;
                break;
            case 'from':
                if (!value) break;
                reqsOutput += `<strong>Obtained From:</strong><br>${value || 'N/A'}.<br>`;
                break;
            case 'base':
            case 'weapon':
            case 'attunement':
                statRequirements.push(value)
                break;
            default:
                console.log(`Unrecognized key "${key}" in requirements. Default reached.`);
        }
    });
    reqsOutput += formatStats(statRequirements);

    return reqsOutput;
}

function formatStats(reqs) {
    let reqsOutput = ``;
    let statReqs = ``;

    Object.values(reqs).forEach(value => {
        const filteredStat = Object.entries(value)
            .filter(([key, val]) => val > 0)
            .map(([key, val]) => {
                const statName = abbrStatNames[key] || abbrWeaponNames[key] || abbrAttunementNames[key] || key;
                return `${statName}: ${val}`;
            })
            .join(', ');

        if (filteredStat) {
            statReqs += filteredStat + '<br>';
        }
    });
    if (statReqs) {
        reqsOutput += `<strong>Stats Required:</strong><br> ${statReqs}`;
    }

    return reqsOutput;
}

const betterWeaponNames = {
    'Light Wep.': 'Light',
    'Medium Wep.': 'Medium',
    'Heavy Wep.': 'Heavy'
};

const abbrStatNames = {
    Strength: 'STR',
    Fortitude: 'FTD',
    Agility: 'AGL',
    Intelligence: 'INT',
    Willpower: 'WLL',
    Charisma: 'CHA'
};

const abbrWeaponNames = {
    'Light Wep.': 'LHT',
    'Medium Wep.': 'MED',
    'Heavy Wep.': 'HVY'
};

const abbrAttunementNames = {
    Flamecharm: 'FIR',
    Frostdraw: 'ICE',
    Thundercall: 'LTN',
    Galebreathe: 'WND',
    Shadowcast: 'SDW',
    Ironsing: 'MTL'
};
