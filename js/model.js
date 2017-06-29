export class DefaultAdapter {
  constructor() {
    if (new.target === DefaultAdapter) {
      throw new Error();
    }
  }

  preprocess(data) {
    return data;
  }
}
