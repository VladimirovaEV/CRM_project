import getElements from './getElements';
const {
    panelInput,
} = getElements;

export function debounce(callback, delay) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout( callback, delay );
    }
}
export async function searchValue() {
    const result = await fetch(`http://localhost:3000/api/category`);
    const data = await result.json();
    console.log(data);
}
// searchValue();
// panelInput.addEventListener('click', debounce(searchValue(panelInput.value), 300));
panelInput.addEventListener('input', () => {
    
});

export default {

};
