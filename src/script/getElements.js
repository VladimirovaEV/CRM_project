const modalTitle = document.querySelector('.modal__title');
const modalForm = document.querySelector('.modal__form');
const modalCheck = document.querySelector('.vendor-code__btn');
const descriptionId = document.querySelector('.vendor-code__id');
const overlayElement = document.querySelector('.overlay');
const overlayModalElement = document.querySelector('.overlayModal');
overlayElement.classList.remove('active');
const overlayModal = document.querySelector('.overlay__modal');
const btnAdd = document.querySelector('.panel__add-goods');
const btnClose = document.querySelector('.modal__close');
const btnDel = document.querySelector('.table__btn_del');
const btnEdit = document.querySelector('.table__btn_edit');
const list = document.querySelector('.table__body');
const modalCheckbox = document.querySelector('input[name = "discount"]');
const discountCount = document.querySelector('input[name = "discount_count"]');
let crmTotalPrice = document.querySelector('.crm__total-price');
let modalTotalPrice = document.querySelector('.modal__total-price');
const inputPrice = document.querySelector('input[name = "price"]');
const inputCount = document.querySelector('input[name = "count"]');
const inputCategory = document.querySelector('input[name = "category"]');
inputCategory.setAttribute('list', 'category-list');
const base = [];
const file = document.querySelector('.modal__file');
const fieldSet = document.querySelector('.modal__fieldset');
const modalEditTitle = document.querySelector('.modal__title');
const panelInput = document.querySelector('.panel__input');
const modalError = document.querySelector('.modal__overlay');
const modalErrBtn = document.querySelector('modal__close_err');
modalForm.title.required = true;
modalForm.category.required = true;
modalForm.description.required = true;
modalForm.units.required = true;
modalForm.discount.required = true;
modalForm.discount_count.required = true;
modalForm.count.required = true;
modalForm.price.required = true;
modalForm.total.required = true;

const imgContainer = document.createElement('div');
imgContainer.classList.add('image-container');
const imgModal = document.createElement('img');
imgModal.classList.add('preview');
imgContainer.append(imgModal);
fieldSet.append(imgContainer);
const modalWarning = document.createElement('div');
modalWarning.classList.add('image-text');
modalWarning.textContent = 'Изображение не должно превышать размер 1 Мб';

export default {
  modalTitle,
  modalForm,
  modalCheck,
  descriptionId,
  overlayElement,
  btnAdd,
  btnClose,
  btnDel,
  list,
  modalCheckbox,
  discountCount,
  crmTotalPrice,
  modalTotalPrice,
  inputPrice,
  inputCount,
  base,
  file,
  fieldSet,
  imgModal,
  imgContainer,
  modalWarning,
  btnEdit,
  modalEditTitle,
  overlayModal,
  overlayModalElement,
  panelInput,
  modalError,
  modalErrBtn,
  inputCategory,
};

