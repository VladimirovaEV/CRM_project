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
  base,
  file,
  fieldSet,
  imgModal,
  imgContainer,
  modalWarning,
} = getElements;

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener('loadend', () => {
    resolve(reader.result);
  });
  reader.addEventListener('error', err => {
    reject(err);
  });
  reader.readAsDataURL(file);
});

file.addEventListener('change', () => {
  if (file.files.length > 0) {
    if (file.files[0].size <= 1000000) {
      const src = URL.createObjectURL(file.files[0]);
      if (document.body.contains(modalWarning)) {
         modalWarning.parentNode.removeChild(modalWarning);
      };
    imgModal.src = src;
    imgContainer.style.display = 'block';
    } else {
      imgContainer.append(modalWarning);
      imgContainer.style.display = 'block';
    }
  }
});
// modalForm.addEventListener('submit', async event => {
//   event.preventDefault();
//   const formData = new FormData(modalForm);
//   const data = Object.fromEntries(formData);
//   data.image = await toBase64(data.image);

//   fetch('http://localhost:3000/api/goods', {
//     method: 'post',
//     body: JSON.stringify(data),
//     headers: {
//       'Content-type': 'application/json; charset=utf-8',
//     },
//   });
// });

export default {
  toBase64,
};

