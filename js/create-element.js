export default (html) => {
  const div = document.createElement(`div`);
  let fragment = document.createDocumentFragment();

  div.innerHTML = html;
  const elements = div.childNodes;
elements.forEach((el)=>{
  fragment.appendChild(el);
})
  /*while (div.childNodes.length > 0) {
    fragment.appendChild(elements.childNodes[0]);
  }*/
  console.info(fragment);
  return fragment;
};
