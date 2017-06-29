import QuestionAdapter from './game-adapter';

export default new class {
  get serverUrl() {
    return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter`;
  }

  getQuestions() {
    const questionsPath = `${this.serverUrl}/questions`;
    return fetch(questionsPath)
      .then((response) => response.json())
      .then(QuestionAdapter.preprocess);
  }

  getStats(userName) {
    const questionsPath = `${this.serverUrl}/stats/${userName}`;
    return fetch(questionsPath)
      .then((response) => response.json())
      .then((data) => this._sortDataByDate(data));
  }

  sendStats(state) {
    const questionsPath = `${this.serverUrl}/stats/${state.userName}`;
    return fetch(questionsPath, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: this._stateToJson(state)
    });
  }

  _sortDataByDate(data) {
    return data.sort((a, b) => {
      const keyA = new Date(a.date);
      const keyB = new Date(b.date);
      if (keyA > keyB) {
        return -1;
      }
      if (keyA < keyB) {
        return 1;
      }
      return 0;
    });
  }

  _stateToJson(state) {
    return JSON.stringify({
      lives: state.lives,
      stats: state.stats
    });
  }
}();
