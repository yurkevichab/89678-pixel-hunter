export default (stats) => {
  return ` 
    <ul class="stats">
      ${stats.reduce((prev, current) => {
        return prev + ` <li class="stats__result stats__result--${current || `unknown`}"></li>`;
      }, ``)}      
    </ul>`;
};
