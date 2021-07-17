export const shouldComponentUpdate = (callback, { prevState, nextState }) => {
  if (prevState !== nextState) {
    callback();
  }
};
