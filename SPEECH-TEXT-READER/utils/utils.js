export function createElementSettingAttr(tag, attr, text) {
  const element = document.createElement(tag);
  Object.keys(attr).forEach((key) => {
    element.setAttribute(key, attr[key]);
  });
  element.textContent = text ? text : "";
  return element;
}
export const textArray = [
  { name: "angry", text: "i`m angry" },
  { name: "food", text: "i`m food" },
  { name: "grandma", text: "i want to go grandmas" },
  { name: "happy", text: "i`m happy" },
  { name: "home", text: "i want to go home" },
  { name: "hurt", text: "i`m hurt" },
  { name: "outside", text: "i want to go outside" },
  { name: "sad", text: "i`m sad" },
  { name: "scared", text: "i`m scared" },
  { name: "school", text: "i want to go to school" },
  { name: "tired", text: "i`m tired" },
];
