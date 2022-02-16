const openTabsHackerNews = document.getElementById("openTabsHackerNews");
const openTabsDesignerNews = document.getElementById("openTabsDesignerNews");
const openTabsProductHunt = document.getElementById("openTabsProductHunt");

openTabsHackerNews.addEventListener("click", async () => {
  await openLinksBulk("HackerNews");
});

openTabsDesignerNews.addEventListener("click", async () => {
  await openLinksBulk("DesignerNews");
});

openTabsProductHunt.addEventListener("click", async () => {
  await openLinksBulk("ProductHunt");
});

async function openLinksBulk(el) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  let getLinks;

  if (el === "HackerNews") {
    getLinks = getHackerNewsLinks;
  }
  if (el === "DesignerNews") {
    getLinks = getDesignerNewsLinks;
  }
  if (el === "ProductHunt") {
    getLinks = getProductHuntLinks;
  }

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: getLinks,
    },
    async (injectionResults) => {
      for (const frameResult of injectionResults) {
        for (let i = 0; i < frameResult.result.length; i++) {
          await chrome.tabs.create({ url: frameResult.result[i], active: false });
        }
      }
    }
  );
}

function getHackerNewsLinks() {
  let links = document.querySelectorAll("[data-source-name=hackerNews]");
  let linkArray = [];

  links.forEach((link) => {
    linkArray.push(link.href);
  });

  return linkArray;
}

function getDesignerNewsLinks() {
  let links = document.querySelectorAll("[data-source-name=designerNews]");
  let linkArray = [];

  links.forEach((link) => {
    linkArray.push(link.href);
  });

  return linkArray;
}

function getProductHuntLinks() {
  let links = document.querySelectorAll("[data-source-name=productHunt]");
  let linkArray = [];

  links.forEach((link) => {
    linkArray.push(link.href);
  });

  return linkArray;
}
