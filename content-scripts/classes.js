var Search = class {
  constructor(dom) {
    dom.querySelectorAll('a').forEach(node => node.setAttribute('target', '_blank'));
    this.items = dom.querySelectorAll(SEARCH_RESULTS_SELECTOR);
  }

  render(isLazyLoad) {
    this.items.forEach(item => {
      const manga = new Manga(item);
      manga.appendBlacklistButton();
      chrome.storage.local.get(manga.href, result => {
        if (Object.entries(result).length) {
          manga.hide();
        } else if (isLazyLoad) {
          LOAD_IMAGE(item);
          manga.append();
        }
        document.dispatchEvent(renderEvent);
      });
    });
  }
}

var Manga = class {
  constructor(searchItem) {
    this.item = searchItem;
    this.header = searchItem.querySelector(MANGA_TITLE_SELECTOR);
    const { href } = this.header.querySelector('a');
    const title = this.header.querySelector('[title]') || this.header.querySelector('a').innerText;
    this.href = href.toLowerCase();
    this.title = title;
  }

  appendBlacklistButton() {
    if (!this.header.querySelector('#blacklist-button') && this.href) {
      const blacklistButton = document.createElement('button');
      blacklistButton.setAttribute("id", "blacklist-button");
      blacklistButton.innerHTML = 'X';
      blacklistButton.addEventListener('click', () => {
        chrome.storage.local.set({ [this.href]: this.title }, () => {
          this.hide();
          document.dispatchEvent(blacklistEvent);
        });
      });
      this.header.append(blacklistButton);
    }
  }

  append() { document.querySelector(SEARCH_RESULTS_CONTAINER_SELECTOR).appendChild(this.item); }

  hide() { this.item.remove(); }
}

var LazyLoad = class {
  page = 1;
  locked = false;

  constructor() { 
    document.addEventListener('scroll', () => this.load());
    document.addEventListener('blacklist', () => this.load());
    document.addEventListener('render', () => this.load());
  }

  getScrolledRatio() { return (window.innerHeight + window.scrollY) / document.body.scrollHeight; }

  load() {
    if (!this.locked && this.getScrolledRatio() >= SCROLL_THRESHOLD) {
      this.locked = true;
      chrome.runtime.sendMessage({ url: `${BASE_URL}${++this.page}` }, ({ data }) => {
        const search = new Search(new DOMParser().parseFromString(data, "text/html"), SEARCH_RESULTS_SELECTOR);
        search.render(true);
        this.locked = false;
      });
    }
  }
}
