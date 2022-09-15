import getElements from './getElements';
const {
    modalError,
} = getElements;
const loadGoods = async () => {
    const result = await fetch('http://localhost:3000/api/goods');
    const data = await result.json();
    return data;
};

const createGoods = async (newGood) => {
    const result = await fetch('http://localhost:3000/api/goods', {
        method: 'POST',
        body: JSON.stringify(newGood),
        headers: {
        'Content-Type': 'application/json',
        },
    });
    return result;
    if (!result) {
        modalError.classList.add('active');
    }
};
const editGoods = async (id, editGood) => {
    const result = await fetch(`http://localhost:3000/api/goods/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(editGood),
         headers: {
        'Content-Type': 'application/json',
    },
    })
    const data = await result.json();
    return data;
};
const getGood = async (id) => {
    const result = await fetch(`http://localhost:3000/api/goods/${id}`);
    const data = await result.json();
    return data;
};
const deleteGoods = async (id) => {
    await fetch(`http://localhost:3000/api/goods/${id}`, {
        method: 'DELETE',
    });
};

export default {
    loadGoods,
    createGoods,
    deleteGoods,
    getGood,
    editGoods,
};
