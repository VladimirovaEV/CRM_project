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
  modalError,
  modalErrBtn,
  file,
  imgModal,
  modalWarning,
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
    file.value = '';
    imgModal.src = '';
    imgContainer.style.display = 'none';
  };
const closeModal = () => {
    overlayElement.classList.remove('active');
    modalForm.reset();
    // input[type=file].value = '';
    file.value = '';
    imgModal.src = '';
    imgContainer.style.display = 'none';
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
const modalErrControl = () => {
  modalError.addEventListener('click', (e) => {
    const target = e.target;
    if (target === modalError || target.closest('.modal__close_err')) {
      modalError.classList.remove('active');
    }
  })
}
modalErrControl();
let totalPrice = 0;
let newCrmTotalPrice;
list.addEventListener('click', async (e) => {
      const target = e.target;
      if (target.closest('.table__btn_del')) {
        let quest = confirm('?????????????????????? ???????????????? ????????????');
        // document.querySelector('.confirm__overlay').classList.add('active');
        if (quest) {
          const parent = target.closest('tr');
        parent.remove();
        const elem = parent.querySelector('.table__cell_name');
        const result = await getGood(elem.dataset.id);
        newCrmTotalPrice = totalPrice -= result.count * result.price;
        crmTotalPrice.textContent = `$ ${newCrmTotalPrice}`;
        deleteGoods(elem.dataset.id);
        }
      }
      // // if (target.closets('.confirm__btn')) {
      //   // document.querySelector('.confirm__overlay').classList.remove('active');
      // if (target.closets('.reject__btn')) {
      //   document.querySelector('.confirm__overlay').classList.remove('active');
      // }
    });
    const calcModalTotalPrice = () => {
      inputPrice.addEventListener('blur', (e) => {
      const target = e.target;
      if (isNaN(inputCount.value)) {
        alert('???????????????????? ?????????? ???????? ???????????? ????????????');
      }
      if (isNaN(inputPrice.value)) {
      alert('???????? ?????????? ???????? ???????????? ????????????');
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
    const fileEdit = document.querySelector('.modalEdit__file');
    const imgEditModal = document.querySelector('.previewEdit');
    const imgEditContainer = document.querySelector('.imageEdit-container');
    
    fileEdit.addEventListener('change', () => {
  if (fileEdit.files.length > 0) {
    if (fileEdit.files[0].size <= 1000000) {
      const src = URL.createObjectURL(fileEdit.files[0]);
      if (document.body.contains(modalWarning)) {
         modalWarning.parentNode.removeChild(modalWarning);
      };
    imgEditModal.src = src;
    imgEditContainer.style.display = 'block';
    } else {
      imgEditContainer.append(modalWarning);
      imgEditContainer.style.display = 'block';
    }
  }
});

    (document.querySelector('.modalEdit__form')).addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const editGood = Object.fromEntries(formData);
    editGood.image = await toBase64(editGood.image);
    console.log(editGood);
    const data = await editGoods(elem.dataset.id, editGood);
    parent.parentNode.removeChild(parent);
    addGoodPage(list, data);
    
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
  modalErrControl,
};

