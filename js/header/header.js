import HeaderView from './header-view';

export default (state) => {
  const headerView = new HeaderView(state);

  return headerView.template;
};
