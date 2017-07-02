import GameAdapter from './game-adapter';

export default new class {
  get serverUrl() {
    return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter`;
  }

  getQuestions() {
    const questionsPath = `${this.serverUrl}/questions`;
    return fetch(questionsPath)
      .then(GameAdapter.parseJSON)
      .then(GameAdapter.preprocessQuestions)
      .then(GameAdapter.loadImages);
  }

  getStats(userName) {
    const questionsPath = `${this.serverUrl}/stats/${userName}`;
    return fetch(questionsPath)
      .then(GameAdapter.parseJSON)
      .then(GameAdapter.preprocessStats);
  }

  sendStats(state) {
    const questionsPath = `${this.serverUrl}/stats/${state.userName}`;
    return fetch(questionsPath, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: GameAdapter.postProcessStats(state)
    });
  }
}();
