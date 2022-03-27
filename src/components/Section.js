export class Section {
  constructor({ items, renderer }, container) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems = (data) => {
    data.forEach(item => this._renderer(item));
  }

  addItem = (element) => {
    this._container.prepend(element);
  }
}
