export class DefaultAdapter {
  constructor() {
    if (new.target === DefaultAdapter) {
      throw new Error();
    }
  }

  preprocess(data) {
    return data;
  }

  toServer(data) {
    return data;
  }
}

const defaultAdapter = new class extends DefaultAdapter {}();

export default class Model {
  get urlRead() {
    throw new Error(`Abstract method. Define the url for model`);
  }
  get urlWrite() {
    throw new Error(`Error`);
  }

  load(adapter = defaultAdapter) {
    return fetch(this.urlRead)
      .then((response) => response.json())
      .then(adapter.preprocess);
  }
}
