// 浏览器兼容storage
let supportStorage = function() {
  let flag = false;
  if (!window.storage) {
    throw new Error("浏览器不支持localStorage");
  } else {
    flag = true;
  }
  return flag;
};
export const setStore = (name, content) => {
  if (!name) return;
  if (supportStorage) {
    if (typeof content !== "string") {
      content = JSON.stringify(content);
    }
  }
  window.localStorage.setItem(name, content);
};
export const getStore = name => {
  if (!name) return;
  return JSON.parse(window.localStorage.getItem(name));
};
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};
