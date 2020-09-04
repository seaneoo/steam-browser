let runtime = typeof chrome !== undefined ? chrome : browser;
let canOpen = false;

runtime.browserAction.onClicked.addListener(() => {
  if (canOpen) {
    runtime.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentTabUrl = tabs[0].url;

      console.log(currentTabUrl);
      runtime.tabs.create({
        url: `steam://openurl/${currentTabUrl}`,
      });
    });
  }
});

function query() {
  runtime.tabs.query(
    {
      active: true,
      currentWindow: true,
      url: ["*://*.steamcommunity.com/*", "*://store.steampowered.com/*"],
    },
    (tabs) => {
      canOpen = tabs.length > 0;

      var ico = `steam${canOpen ? "" : "-gray"}`;
      runtime.browserAction.setIcon({
        path: {
          16: `/assets/${ico}16.png`,
          32: `/assets/${ico}32.png`,
        },
      });
    }
  );
}

runtime.tabs.onUpdated.addListener(() => {
  query();
});

runtime.tabs.onActivated.addListener(() => {
  query();
});
