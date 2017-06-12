export const checkAnswer = (answers) => {
  const result = answers.every((answer) => {
    return answer.isRight;
  });
  if (result) {
    return true;
  }
  return false;
};
