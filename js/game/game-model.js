import Model from '../model';

export default new class extends Model {
  constructor() {
    super();
    this.games = [];
  }
  get urlRead() {
    return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/questions`;
  }

  get urlWrite() {
    return ``;
  }
}();
