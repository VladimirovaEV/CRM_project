import {getRandomId} from './utils';
import requests from './requests';
const {
  createGoods,
  loadGoods,
} = requests;
import getElements from './getElements';
const {
  overlayElement,
  overlayModalElement,
  modalForm,
} = getElements;
export const createRow = function(item) {
  const trElement = document.createElement('tr');
  const tr = document.getElementsByTagName('tr');
	let trCount = tr.length;
  trElement.innerHTML = `<td class="table__cell">${trCount}</td>
                <td class="table__cell table__cell_left table__cell_name" data-id=${item.id}>
                  <span class="table__cell-id">id: ${item.id}</span>${item.title}</td>
                <td class="table__cell table__cell_left">${item.category}</td>
                <td class="table__cell">${item.units}</td>
                <td class="table__cell">${item.count}</td>
                <td class="table__cell">${item.price}</td>
                <td class="table__cell">${item.count * item.price}</td>
                <td class="table__cell table__cell_btn-wrapper">
                  <button class="table__btn table__btn_pic" data-pic=http://localhost:3000/${item.image}></button>
                  <button class="table__btn table__btn_edit"></button>
                  <button class="table__btn table__btn_del"></button>
                </td>`;
  return trElement;
};

export const addGoodPage = (list, item) => {
  list.append(createRow(item));
};
export const addGoodData = async (item) => {
  item.id = Number(getRandomId());
  await createGoods(item);
  location.reload();
};
export const createDataList = async () => {
  const dataList = document.createElement('datalist');
  dataList.setAttribute('id', 'category-list');
  const result = await fetch(`http://localhost:3000/api/category`);
    const data = await result.json();
    data.forEach(item => {
      const option = document.createElement('option');
      option.value = item;
      dataList.appendChild(option);
    });
  modalForm.append(dataList);
};
createDataList();
export const createModalEdit = (item) => {
  overlayModalElement.innerHTML = `
  <div class="overlay__modalEdit modalEdit">
      <button class="modal__close">
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m2 2 20 20M2 22 22 2" stroke="currentColor" stroke-width="3" stroke-linecap="round" /></svg>
      </button>
      <div class="modal_top">
        <h2 class="modal__title">Изменить товар</h2>
        <div class="modal__vendor-code vendor-code">
          <p class="vendor-code__wrapper">id: <span class="vendor-code__id">${item.id}</span></p>
          <button class="vendor-code__btn">
            <svg width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#a)" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m11.672 3.646 1.557 1.556-1.557-1.556Zm1.002-1.372L8.463 6.485a1.557 1.557 0 0 0-.427.796l-.389 1.947 1.947-.39c.302-.06.578-.208.796-.425L14.6 4.2a1.36 1.36 0 0 0 0-1.927 1.362 1.362 0 0 0-1.926 0v0Z" />
                <path d="M13.53 10.699v2.206a1.47 1.47 0 0 1-1.471 1.47H3.97a1.47 1.47 0 0 1-1.471-1.47V4.816a1.47 1.47 0 0 1 1.47-1.47h2.207" />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M0 0h15v15H0z" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>

      <form action="https://jsonplaceholder.typicode.com/posts" class="modalEdit__form" method="post">
        <fieldset class="modal__fieldset">

          <label class="modal__label modal__label_name" for="title">
            <span class="modal__text">Наименование</span>
            <input class="modal__input" type="text" name="title" id="title" value=${item.title}>
          </label>


          <label class="modal__label modal__label_category" for="category">
            <span class="modal__text">Категория</span>
            <input class="modal__input" type="text" name="category" id="category" value=${item.category}>
          </label>

          <label class="modal__label modal__label_description" for="description">
            <span class="modal__text">Описание</span>
            <textarea class="modal__input modal__input_textarea" name="description" id="description">${item.description}</textarea>
          </label>

          <label class="modal__label modal__label_units" for="units">
            <span class="modal__text">Единицы измерения</span>
            <input class="modal__input" type="text" name="units" id="units" value=${item.units}>
          </label>

          <div class="modal__label modal__label_discount">
            <label class="modal__text" for="discount">Дисконт</label>
            <div class="modal__checkbox-wrapper">
              <input class="modal__checkbox" type="checkbox" name="discount" id="discount">
              <input class="modal__input modal__input_discount" type="text" name="discount_count" disabled>
            </div>
          </div>


          <label class="modal__label modal__label_count" for="count">
            <span class="modal__text">Количество</span>
            <input class="modal__input" type="text" name="count" id="count" value=${item.count}>
          </label>

          <label class="modal__label modal__label_price" for="price">
            <span class="modal__text">Цена</span>
            <input class="modal__input" type="text" name="price" id="price" value=${item.price}>
          </label>

          <label tabindex="0" for="image" class="modal__label modal__label_file">Добавить изображение</label>
          <input class="modal__file visually-hidden" tabindex="-1" type="file" name="image" id="image" value=${item.image}>
        </fieldset>

        <div class="modal__footer">
          <label class="modal__total">Итоговая стоимость:
            <output class="modal__total-price" name="total">$ ${item.count * item.price}</output>
          </label>

          <button class="modal__submit" type="submit">Добавить товар</button>
        </div>
      </form>
    </div>
  `;
};


export default {
  createRow,
  addGoodPage,
  addGoodData,
  createModalEdit,
};

