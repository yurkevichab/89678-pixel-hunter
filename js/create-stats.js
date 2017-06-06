export default (stats) => {
  return ` 
    <div class="stats">
      <ul class="stats">
      ${stats.reduce((prev, current) => {
        return prev + ` <li class="stats__result stats__result--${current || `unknown`}"></li>`;
      }, ``)}      
      </ul>
    </div>`;
};
