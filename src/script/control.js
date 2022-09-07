import getElements from './getElements';
const {
  modalForm,
  descriptionId,
  overlayElement,
  btnAdd,
  list,
  modalCheckbox,
  discountCount,
  crmTotalPrice,
  modalTotalPrice,
  inputPrice,
  inputCount,
  overlayModalElement,
  imgContainer,
} = getElements;
import {getRandomId} from './utils';
import {createRow, addGoodPage, addGoodData, createModalEdit} from './createElements';
import requests from './requests';
const {
  loadGoods,
  deleteGoods,
  getGood,
  editGoods,
} = requests;
import modalImg from './modalImg';
const {
  toBase64,
} = modalImg;

const renderGoods = async function() {
  const obj = await loadGoods();
  obj.forEach((item) => {
    totalPrice += (item.count * item.price);
      const newElem = createRow(item);
      list.append(newElem);
      return newElem;
  });
  crmTotalPrice.textContent = `$ ${totalPrice}`;
};

const openModal = () => {
    overlayElement.classList.add('active');
    descriptionId.textContent = getRandomId();
  };
const closeModal = () => {
    overlayElement.classList.remove('active');
    modalForm.reset();
  };

const modalControl = () => {
  btnAdd.addEventListener('click', openModal);
  overlayElement.addEventListener('click', (e) => {
    const target = e.target;
  if (target === overlayElement || target.closest('.modal__close')) {
    closeModal();
    }
  });
};
let totalPrice = 0;
let newCrmTotalPrice;
list.addEventListener('click', async (e) => {
      const target = e.target;
      if (target.closest('.table__btn_del')) {
        confirm('Подтвердите удаление товара')
      }
      if (confirm('Подтвердите удаление товара')) {
        const parent = target.closest('tr');
        parent.remove();
        const elem = parent.querySelector('.table__cell_name');
        const result = await getGood(elem.dataset.id);
        newCrmTotalPrice = totalPrice -= result.count * result.price;
        crmTotalPrice.textContent = `$ ${newCrmTotalPrice}`;
        deleteGoods(elem.dataset.id);
      };
    });
    const calcModalTotalPrice = () => {
      inputPrice.addEventListener('blur', (e) => {
      const target = e.target;
      if (isNaN(inputCount.value)) {
        alert('Количество может быть только числом');
      }
      if (isNaN(inputPrice.value)) {
      alert('Цена может быть только числом');
      };
        modalTotalPrice.textContent = `$ ${inputPrice.value * inputCount.value}`;
    });
    };


const formControl = () => {
  modalForm.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newGood = Object.fromEntries(formData);
    newGood.image = await toBase64(newGood.image);
    addGoodData(newGood);
    addGoodPage(list, newGood);
    newCrmTotalPrice = totalPrice += inputPrice.value * inputCount.value;
    crmTotalPrice.textContent = `$ ${newCrmTotalPrice}`;
    modalForm.reset();
    imgContainer.style.display = 'block';
    closeModal();
  });
};

modalCheckbox.addEventListener('click', () => {
  if (modalCheckbox.checked) {
    discountCount.disabled = false;
  } else {
    discountCount.disabled = true;
    discountCount.value = "";
  }
});
document.addEventListener('click', (e) => {
  const target = e.target;
  let attr = target.getAttribute('data-pic');
  if (target.closest('.table__btn_pic')) {
    open(attr, 'popup','width = 800, height = 600').moveTo(screen.width/2 - 400  , screen.height/2 - 300);
  }
});
const openModalEdit = () => {
  overlayModalElement.classList.add('active');
};
const closeModalEdit = () => {
    overlayModalElement.classList.remove('active');
    // modalForm.reset();
  };
list.addEventListener('click', async (e) => {
  const target = e.target;
  if (target.closest('.table__btn_edit')) {
    const parent = target.closest('tr');
    const elem = parent.querySelector('.table__cell_name');
    const item = await getGood(elem.dataset.id);
    createModalEdit(item);
    openModalEdit();
    
    (document.querySelector('.modalEdit__form')).addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const editGood = Object.fromEntries(formData);
    editGood.image = await toBase64(editGood.image);
    
    editGoods(elem.dataset.id, editGood);
    const newItem = await getGood(item.id);
    parent.parentNode.removeChild(parent);
    location.reload();
    addGoodPage(list, newItem);
    
    closeModalEdit();
  });
  }
  overlayModalElement.addEventListener('click', (e) => {
    const target = e.target;
    if (target === overlayModalElement || target.closest('.modal__close')) {
    closeModalEdit();
    }
  });
});




export default {
  openModal,
  closeModal,
  modalControl,
  calcModalTotalPrice,
  formControl,
  renderGoods,
};

