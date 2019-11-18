var getSelectedTab = (tab) => {
  var tabId = tab.id;
  var sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj);
  document.getElementById('before').addEventListener('click', () => sendMessage({ action: 'before' }));
  document.getElementById('after').addEventListener('click', () => sendMessage({ action: 'after' }))
}
chrome.tabs.getSelected(null, getSelectedTab);