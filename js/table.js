// table.js

function generateTalentTable(talentData, mysticData) {
    let table = `
        <table border="1" cellspacing="0" cellpadding="5" style="width: 100%; text-align:left;" id="result-table">
        <thead>
            <tr>
            <th>Category</th>
            <th>Name</th>
            <th>Description</th>
            <th>Rarity</th>
            <th>Requirements</th>
            <th>Stats</th>
            <th>Exclusive With</th>
            <th>Key (dev thing)</th>
            </tr>
        </thead>
        <tbody>`;

    for (const key in talentData) {
        const talent = talentData[key];
        const reqs = talent.reqs
        const category = talent.category.toLowerCase();
        const mystic = mysticData[category];
        const mysticDialogue = mystic ? `"${mystic}"` : '<sub>Mystic dialogue not found!</sub>';

        table += `
            <tr>
            <td>${talent.category}|${mysticDialogue}</td>
            <td>${talent.name}</td>
            <td>${talent.desc}</td>
            <td>${talent.rarity}</td>
            <td>
                ${formatRequirements(reqs)}
            </td>
            <td>${talent.stats}</td>
            <td>${talent.exclusiveWith.join(', ') || 'None'}</td>
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
                reqsOutput += `<strong>Obtained From:</strong><br>${value || 'N/A'}<br>`;
                break;
            case 'base':
            case 'weapon':
            case 'attunement':
                statRequirements.push(value)
                break;
            case 'weaponType':
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

const tableConfig = {
    layout: {
        topStart: 'info',
        topEnd: 'paging',
        bottomStart: null,
        bottomEnd: null,
    },
    paging: false,
    lengthChange: true,
    order: [
        [0, 'asc'],
        [1, 'asc']
    ],
    columns: [
        {
            searchable: true,
            orderable: true,
            render: (data, type, row) => {
                if (type === 'display') {
                    return '';
                }
                return data;
            }
        },
        { searchable: true, orderable: true },
        { searchable: true, orderable: false },
        { searchable: true, orderable: false },
        { searchable: true, orderable: false },
        { searchable: true, orderable: false },
        { searchable: true, orderable: false },
        { searchable: false, orderable: false }
    ],
    rowGroup: {
        dataSrc: 0,
        startRender: (rows, group) => {
            const [category, mystic] = group.split('|');
            return `<span style="float: left; width: 30%; display: inline-block;">${category} (${rows.count()})</span>
                    <span style="float: right;" width: 70%; display: inline-block;>${mystic}</span>`;
        }
    },
    responsive: true,
    initComplete: function () {
        console.log('DataTable initialized!');
    }
};

export default function createTable(talentData, mysticData, resultDiv) {
    resultDiv.innerHTML = generateTalentTable(talentData, mysticData);
    const dataTable = new DataTable('#result-table', tableConfig);
    const column1 = dataTable.column(7);
    column1.visible(!column1.visible());
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
