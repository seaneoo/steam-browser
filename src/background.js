let runtime = typeof chrome !== undefined ? chrome : browser;

function open() {
  runtime.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentTabUrl = tabs[0].url;

    console.log(currentTabUrl);
    runtime.tabs.create({
      url: `steam://openurl/${currentTabUrl}`,
    });
  });
}

runtime.browserAction.onClicked.addListener(open);
