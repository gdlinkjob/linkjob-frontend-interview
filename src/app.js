import data from './data.json';
import Item from './model.todo';

function App(root) {
  this.datastore = [...data];
  this.nextId = this.datastore.length + 1;

  this.onAdd = function () {
    const now = new Date().toLocaleString();
    this.datastore.push(new Item(`New Item ${this.nextId}`, now));
    this.nextId++;
    this.render();
  }

  this.onItemClick = function (event) {
    const item = this.datastore[parseInt(event.target.dataset.id)];
    const title = prompt('Update todo item', item.title);
    if (title) {
      item.title = title;
      this.render();
    }
  }

  this.render = function () {
    const items = this.datastore.map((item, idx) => {
      return `<div class="card">
        <div class="delete" data-id=${idx}>X</div>
        <div class="title" data-id=${idx}>${item.title}</div>
        <span class="label">${item.date}</span>
      </div>`
    })
    root.innerHTML = items.join('');
    const deleteButtons = root.getElementsByClassName('delete');
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons.item(i).addEventListener('click', this.onDelete);
    }

    const titleElems = root.getElementsByClassName('title');
    for (let i = 0; i < titleElems.length; i++) {
      titleElems.item(i).addEventListener('click', this.onItemClick);
    }
  }
}
