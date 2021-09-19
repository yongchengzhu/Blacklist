chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  fetch(message.url).then(result => result.text()).then(data => {
      sendResponse({ data });
  });
  return true;
});