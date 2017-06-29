import Model from '../model';
import QuestionAdapter from './game-adapter';

export default new class extends Model {
  get serverUrl() {
    return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter`;
  }
  get urlRead() {
    return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/questions`;
  }

  get urlWrite() {
    return ``;
  }

  getQuestions() {
    const questionsPath = `${this.serverUrl}/questions`;
    return fetch(questionsPath)
      .then((response) => response.json())
      .then(QuestionAdapter.preprocess);
  }

  getStats(userName) {
    const questionsPath = `${this.serverUrl()}/stats/${userName}`;
    return fetch(questionsPath)
      .then((response) => response.json());
  }

  sendStats(state) {
    const questionsPath = `${this.serverUrl()}/stats/${state.userName}`;
    return fetch(questionsPath, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify(state)
    });
  }
}();
