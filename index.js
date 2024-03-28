document.addEventListener('DOMContentLoaded', () => {
    getCountries();
    let countryNames = [];
    async function getCountries() {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flag');
        const data = await response.json();

        countryNames = data.map((country) => {
            const objCountry = {};

            objCountry.name = country.name.common;
            objCountry.flag = country.flag;

            return objCountry;
        });

    }
    const autocompleteInput = document.querySelector('#input-autocomplete');
    autocompleteInput.addEventListener('input', onInputChange);


    function onInputChange() {
        removeAutocompleteDropdown();


        const value = autocompleteInput.value.toLowerCase();
        if (value.length === 0) return;
        const filteredCountries = [];


        countryNames.forEach((country) => {
            // console.log('country.name.substr(0, value.length).toLowerCase()', 
            // country.name.substr(0, value.length).toLowerCase() );

            if (country.name.substr(0, value.length).toLowerCase() === value) {
                filteredCountries.push(country);

            }
        });

        // console.log(filteredCountries);
        createAutocompleteDropdown(filteredCountries);
    }
    function createAutocompleteDropdown(listCountries) {
        const list = document.createElement('ul');
        list.classList.add = 'autocomplete-list';

        listCountries.forEach((country) => {
            const ListItem = document.createElement('Li');
            ListItem.claccName = 'autocomplete-item';

            const ListItemButton = document.createElement('button');
            ListItemButton.className = 'autocomplete-item-button';
            // ListItemButton.textContent = 'Delete'
            ListItemButton.addEventListener('click', onCountryButtonClick);
            ListItemButton.innerHTML = `${country.flag} ${country.name}`;

            ListItem.appendChild(ListItemButton);

            list.appendChild(ListItem);

        });

        const listWrappr = document.querySelector('.autocomplete-block');
        listWrappr.appendChild(list);
    }



    function removeAutocompleteDropdown() {
        const List = document.querySelector('.autocomplete-List');

        if (List) List.remove();
    }
    function onCountryButtonClick(e) {
        e.preventDefaulet();
    }
    new AirDatepicker('#calendar', {
        onSelect: (selecteDates) => {
            const span = document.createElement('span');
            span.innerHTML = selecteDates.date;

            document.querySelector('date').appendChild(span);
        }

    });

});