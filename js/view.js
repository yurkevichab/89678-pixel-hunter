import createElement from './create-element';

export default class AbstractView {
  get template() {
    throw new Error(`You have to define to template for view`);
  }

  get element() {
    if (!this._element) {
      this._getMarkup();
    }
    return this._element;
  }

  _getMarkup() {
    this._element = this.render();
    this.bind();
  }

  render() {
    return createElement(this.template);
  }

  bind() {
  }
}
