//search.js

export default function search() {
    let dataTable = $('#result-table').DataTable();

    const globalSearch = document.getElementById('talents-search-input-container').addEventListener("input", event => {
        const inputText = event.target.value
        dataTable
            .search(inputText)
            .draw();
    });

    const showDevKey = document.getElementById('show-dev-key').addEventListener("click", event =>{
        if (event.target.id !== 'show-dev-key') return;
        const column = dataTable.column(7);

        column.visible(!column.visible());
    });

    const rarityFilter = Object.values(document.getElementsByClassName('rarity-filter')).forEach((el) => {
        el.addEventListener("click", event => {
            const rarity = event.target.dataset.rarity
            console.log('hi from: ' + rarity);
            if (rarity === 'None') {
                dataTable.column(2).search('').draw();
                console.log('search empty string ran');
            }
            dataTable
                .column(2)
                .search(rarity)
                .draw();
        });
    });
}
