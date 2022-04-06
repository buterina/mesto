export class Section {
  constructor({ renderer, container }) {
    // this._renderedItems = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems = (data) => {
    data.forEach(item => this._renderer(item));
  }

  addItem = (item) => {
    this._container.prepend(item);
  }
}
