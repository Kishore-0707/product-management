export default function debounce(fn, delay) {
  let timer;

  return (...args) => {

  clearTimeout(timer);

    timer = setTimeout(() => {
        console.log(" 🚀 API Called");
      fn(...args);
    }, delay);
  };
}
