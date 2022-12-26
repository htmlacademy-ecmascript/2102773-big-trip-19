function getRandomIntegerInclusive(min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  if (min < 0 || max < 0) {
    return NaN;
  }
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomIntegerInclusive(0, elements.length - 1)];

export {getRandomArrayElement, getRandomIntegerInclusive};
