export const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
export const getRandomId = () => {
  let id = "";
  for (let i = 1; i < 8; i++) {
    id += getRandomNum(0, 9);
  }
  return id;
};
export default {
  getRandomNum,
  getRandomId,
};
