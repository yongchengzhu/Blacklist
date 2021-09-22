const operationStatus = document.querySelector('#status');
const message = document.createElement('p');
message.innerHTML = 'Operation Successful, Please Refresh!';

document.querySelector('#clear-blacklist').addEventListener('click', () => {
  chrome.storage.local.clear(() => operationStatus.appendChild(message));
});

document.querySelector('#export-blacklist').addEventListener('click', () => {
    chrome.storage.local.get(null, function(items) {
    const result = JSON.stringify(items);
    const url = 'data:application/json;base64,' + btoa(unescape(encodeURIComponent(result)));
    chrome.downloads.download({
      url: url,
      filename: 'manga-blacklist.json'
    });
  })
});

document.querySelector('#import-blacklist-display').addEventListener('click', () => {
  document.querySelector('#import-blacklist').click();
});

document.querySelector('#import-blacklist').addEventListener('change', e => {
  const files = e.target.files, reader = new FileReader();
  reader.onload = importData;
  reader.readAsText(files[0]);
});

function importData() {
  const data = JSON.parse(this.result);
  chrome.storage.local.clear(() => {
    chrome.storage.local.set(data, () => operationStatus.appendChild(message));
    document.querySelector('#import-blacklist').value = '';
  });
}

const renderBlacklist = () => {
  chrome.storage.local.get(null, results => {
    const blacklist = document.querySelector('#blacklist');
    for (let href in results) {
      const unblacklistButton = document.createElement('button');
      unblacklistButton.setAttribute('id', '#unblacklist-button');
      unblacklistButton.innerHTML = 'X';
      const title = results[href];
      const item = document.createElement('li');
      item.innerHTML = `${title}: ${href}`;
      item.appendChild(unblacklistButton);
      unblacklistButton.addEventListener('click', () => {
        chrome.storage.local.remove(href, () => {
          item.remove();
        });
      });
      blacklist.appendChild(item);
    };
  });
}

renderBlacklist();