const getId = (el) => {
  return document.getElementById(el);
};

const formAction = (id, action, callback) => {
  let form = getId(id);

  form.addEventListener(action, (event) => {
    event.preventDefault();
    callback();
    return false;
  });
};
