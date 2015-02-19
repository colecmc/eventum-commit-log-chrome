(function () {
	/** @author (@colecmc) */
	'use strict';
	var getEventumTicketId = function () {
		/** @returns {string} 4 characters representing Eventum Ticket Id */
		return exu.uri.slice(-4);
	},
	getEventumTicketSummary = function () {
		/**
		 * @returns {string} Eventum Ticket Summary
		 * A guess at best. If HTML structure changes we're in trouble
		 * Loops through all <b> tags to find one with innerHTML of Summary:
		 * Then finds next uncle/aunt which should have the Ticket Summary
		 */
		var bolds = exu.d.getElementsByTagName('b'),
		summary;

		exu.loops(bolds, function (itr) {
			if (bolds[itr].innerHTML === "Summary:") {
				summary = bolds[itr].parentElement.nextElementSibling.innerHTML.trim();
			}
		});
		return summary;
	};

	function getCommitDescription () {
		/**
		 * @returns {string}
		 * Prompts user to enter a description
		 * @throws {TypeError} if description is not valid
		 */
		var desc,
		noDesc = 'You Must Include A Commit Description!';

		chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
			desc = request.desc;
			if (desc.length <= 2) {
				alert(noDesc);
				throw new ReferenceError(noDesc);
			} else {
				sendResponse(getSVNCommitLog(desc));
			}
		});
	}

	function getSVNCommitLog(param) {
		/** A prefilled and selected prompt
		 * Includes the id, summary and user provided description
		 */
		var id = 'ID: ' + getEventumTicketId(),
			sum = '* Summary: ' + getEventumTicketSummary(),
			desc = '* Description: ' + param,
			logDetails = [id, sum, desc].join('\n');

		return {
			details: logDetails
		};
	}

	if (exu.isSpecifiedPage(/view\.php/)) {
		getCommitDescription();
	}

}());
