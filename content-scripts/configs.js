var blacklistEvent = new Event('blacklist');
var renderEvent = new Event('render');
var SCROLL_THRESHOLD = 0.75;

switch (location.hostname) {
  case 'ac.qq.com':
    var SEARCH_RESULTS_SELECTOR = 'li.ret-search-item.clearfix';
    var MANGA_TITLE_SELECTOR = 'h3.ret-works-title.clearfix';
    var LAZY_LOAD = true;
    var BASE_URL = `${window.location.href.slice(0, -1)}`;
    var SEARCH_RESULTS_CONTAINER_SELECTOR = 'ul.ret-search-list.clearfix';
    var LOAD_IMAGE = manga => manga.querySelector('.lazy').src = manga.querySelector('.lazy').getAttribute('data-original');
    break;
  case 'manga.bilibili.com':
    var SEARCH_RESULTS_SELECTOR = 'div.manga-card-vertical.dp-i-block.v-top.border-box.list-item';
    var MANGA_TITLE_SELECTOR = 'div.text-info-section';
    var LAZY_LOAD = false;
    var BASE_URL = null;
    var SEARCH_RESULTS_CONTAINER_SELECTOR = null;
    var LOAD_IMAGE = null;
  case 'mangaowl.net':
    var SEARCH_RESULTS_SELECTOR = '.comicView';
    var MANGA_TITLE_SELECTOR = '.w3l-movie-text';
    var LAZY_LOAD = true;
    var BASE_URL = `${window.location.href}/`;
    var SEARCH_RESULTS_CONTAINER_SELECTOR = '.agile_tv_series_grid';
    var LOAD_IMAGE = manga => 
      manga.querySelector('.img-responsive').style.backgroundImage = `url(${manga.querySelector('.img-responsive').getAttribute('data-background-image')})`;
  case 'chessmoba.us':
    document.querySelector('nav').remove();
    document.querySelector('.owl-direction').style.bottom = 0;
    document.querySelector('.owl-back-top').style.bottom = 0;
    break;
  default:
    break;
}