export function createElementWithAttribute({ tag, attributes }) {
  const target = document.createElement(tag);
  Object.keys(attributes).forEach((key) => {
    target.setAttribute(key, attributes[key]);
  });
  return target;
}
