(() => {
  // state variables
  let toDoListArray = [];
  // ui variables
  const form = document.querySelector(".form");
  const input = form.querySelector(".form__input");
  const ul = document.querySelector(".toDoList");

  // event listeners
  form.addEventListener('submit', e => {
    e.preventDefault();
    let itemId = String(Date.now());
    let toDoItem = input.value;
    addItemToDOM(itemId, toDoItem);
    addItemToArray(itemId, toDoItem);
    input.value = '';
  });

  ul.addEventListener('click', e => {
    if (e.target.classList.contains('edit-button')) {
      let id = e.target.getAttribute('data-id');
      editItem(id);
    } else if (e.target.classList.contains('delete-button')) {
      let id = e.target.getAttribute('data-id');
      removeItemFromDOM(id);
      removeItemFromArray(id);
    }
  });

  // functions
  function addItemToDOM(itemId, toDoItem) {
    const li = document.createElement('li');
    li.setAttribute("data-id", itemId);
    li.innerHTML = `
      <span>${toDoItem}</span>
      <button class="edit-button" data-id="${itemId}">Edit</button>
      <button class="delete-button" data-id="${itemId}">Delete</button>
    `;
    ul.appendChild(li);
  }

  function addItemToArray(itemId, toDoItem) {
    toDoListArray.push({ itemId, toDoItem });
    console.log(toDoListArray);
  }

  function removeItemFromDOM(id) {
    const li = document.querySelector('[data-id="' + id + '"]');
    ul.removeChild(li);
  }

  function removeItemFromArray(id) {
    toDoListArray = toDoListArray.filter(item => item.itemId !== id);
    console.log(toDoListArray);
  }

  function editItem(id) {
    const li = document.querySelector(`[data-id="${id}"]`);
    const span = li.querySelector('span');
    const newItem = prompt('Edit your item:', span.textContent);
    if (newItem !== null) {
      span.textContent = newItem;
      toDoListArray = toDoListArray.map(item => 
        item.itemId === id ? { ...item, toDoItem: newItem } : item
      );
      console.log(toDoListArray);
    }
  }
})();
