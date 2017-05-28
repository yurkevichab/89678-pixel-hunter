const createElement = (html) => {
  let div = document.createElement(`div`);
  div.innerHTML = html;
  return div;
};
export default createElement;
