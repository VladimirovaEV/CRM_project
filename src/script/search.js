import getElements from './getElements';
const {
    panelInput,
    list
} = getElements;
import createElements from './createElements';
const {
    addGoodPage,
} = createElements;


export function debounce(callback, delay) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout( callback, delay );
    }
}

export async function searchValue() {
     
    const tableRows = document.querySelectorAll('.table__cell');
    const result = await fetch(`http://localhost:3000/api/goods`);
    const data = await result.json();
    data.forEach(item => {
        if ((panelInput.value.toLowerCase()) === item.category.toLowerCase()) {
            for (let i = tableRows.length - 1; i >= 0; i--) {
                tableRows[i].style.display = 'none';
            }
            addGoodPage(list, item);
        }
    })
}

panelInput.addEventListener('keyup', debounce(searchValue, 300));

export default {

};
