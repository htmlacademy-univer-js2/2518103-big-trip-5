const getRandomElementOfArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomElementsOfArray = (arr, count) => [...arr].sort(() => 0.5 - Math.random()).slice(0, count);

const getRandomIntValue = (min, max) => {
  const lowerBorder = Math.ceil(Math.min(min, max));
  const upperBorder = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upperBorder - lowerBorder + 1) + lowerBorder);
};

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export { getRandomElementOfArray, getRandomElementsOfArray, getRandomIntValue, isEscapeKey, updateItem };
