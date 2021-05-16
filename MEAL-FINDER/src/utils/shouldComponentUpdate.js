export default function shouldComponentUpdate(
  callback,
  { prevState, nextState }
) {
  if (prevState !== nextState) {
    callback();
  }
}
