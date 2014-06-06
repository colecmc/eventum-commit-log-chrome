(function () {
    /**
      * @summary easily generates SVN commit log
      * @author (@colecmc)
      * The log is currently only available on the details page (view.php)
	  * Update page can insert text and date for change log indications (update.php)
      */

    'use strict';
	chrome.tabs.onUpdated.addListener(function(id, undefined, tab) {
		/**
		  * Show page action icon and load utility scripts/styles on pages under the eventum url.
		  * - manifest.json "permissions" should handle this but...
		  */
		chrome.storage.sync.get([
			'eventumURL',
			'doOpenInNew'
		], function(items) {
			var url = new RegExp(items.eventumURL);
			if (url.test(tab.url) && tab.status === 'complete') {
				console.log( items );
				chrome.pageAction.show(tab.id);
				chrome.tabs.executeScript(null, {"file": "js/eventum-extension-utilities.js"}, null);

				if (items.doOpenInNew) {
					chrome.tabs.executeScript(null, {"file": "js/eventum-open-in-new.js"}, null);
				}


				if (/list\.php/.test(tab.url) && /List of Issues/.test(tab.title)) {
					chrome.tabs.executeScript(null, {"file": "js/eventum-traverse-list.js"}, null);
					chrome.tabs.insertCSS(null, {"file": "css/eventum-traverse-list.css"}, null);
				}
			}
		});
	});

	chrome.pageAction.onClicked.addListener(function() {
		/** When the page action is clicked, load the script */
		chrome.tabs.executeScript(null, {"file": "js/eventum-to-SVN-commit-log.js"}, null);
	});
}());