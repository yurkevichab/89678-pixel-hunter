export default (html) => {
  const div = document.createElement(`div`);
  let fragment = document.createDocumentFragment();

  div.innerHTML = html;
  const elements = div.childNodes;
  elements.forEach((el)=>{
    fragment.appendChild(el);
  });

  return fragment.cloneNode(true);
};
