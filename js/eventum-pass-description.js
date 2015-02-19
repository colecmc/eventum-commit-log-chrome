(function (d) {
    /**
     * Use postMessage technique to pass data to and fro b/w content scripts and background scripts
     */
    'use strict';
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        function getCommitLog(event) {
            /**
             * Gets description typed by user and sends to content script.
             * Content scripts adds details and sends back a response.
             * The field receives focus with text selected and ready for copying.
             */
            var description = d.querySelector('.eventum-commit-desc');

            event.preventDefault();
            event.target.disabled = true;

            chrome.tabs.sendMessage(tabs[0].id, {
                desc: description.value
            }, function (response) {
                d.querySelector('.hidden').classList.remove('hidden');
                description.value = response.details;
                description.focus();
                description.select();
                event.target.disabled = false;
            });
        }

        function getUpdateType (event) {
            /**
             * Decides what to send based on the event target.
             * 'item-status' sends info from select menu.
             */
            switch (event.target.id) {
                case 'item-status':
                    if (event.type === 'change') {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            desc: event.target.selectedOptions[0].label
                        });
                    }
                    break;
                case 'change-log':
                    chrome.tabs.sendMessage(tabs[0].id, {
                        desc: 1
                    });
                    break;
                case 'mark-complete':
                    chrome.tabs.sendMessage(tabs[0].id, {
                        desc: 2
                    });
                    break;
                case 'time-stamp':
                    chrome.tabs.sendMessage(tabs[0].id, {
                        desc: 3
                    });
                    break;
            };
        }


        if (d.getElementById('get-commit-log-form')) {
            /* If this elemet is on the page */
            d.getElementById('get-commit-log-form').addEventListener('submit', getCommitLog);
            d.getElementById('get-commit-log-btn').addEventListener('mousedown', getCommitLog);
        }

        if (d.getElementById('update-issue')) {
            /* If this elemet is on the page */
            d.getElementById('update-issue').addEventListener('mousedown', getUpdateType,false);
            d.getElementById('update-issue').addEventListener('change', getUpdateType,false);
        }

    });
}(document));

