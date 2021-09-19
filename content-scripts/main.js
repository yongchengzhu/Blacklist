const main = () => {
  const timer = setInterval(retry, 100);

  function retry() {
    if (document.querySelector(SEARCH_RESULTS_SELECTOR)) {
      clearInterval (timer);
      if (LAZY_LOAD) {
        new LazyLoad();
      } else {
        document.addEventListener('scroll', rerender);
        document.addEventListener('blacklist', rerender);
      }
      new Search(document).render(false);
    }
  }
}

const rerender = () => {
  if (document.querySelectorAll(SEARCH_RESULTS_SELECTOR).length > document.querySelectorAll('#blacklist-button').length) {
    new Search(document).render(false);
  }
}

window.addEventListener("load", main, false);