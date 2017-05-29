export default (html) => {
  const div = document.createElement(`div`);
  const fragment = document.createDocumentFragment();

  div.innerHTML = html;
  while (div.childNodes.length > 0) {
    fragment.appendChild(div.childNodes[0]);
  }
  return fragment.cloneNode(true);
};
