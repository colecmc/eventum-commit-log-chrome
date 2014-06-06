(function () {
    /** @author (@colecmc) */
    'use strict';
    var getEventumTicketId = function () {
            /** @returns {string} 4 characters representing Eventum Ticket Id */
            return exu.uri.slice(-4);
        }, getEventumTicketSummary = function () {
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
        }, getCommitDescription = function () {
            /**
              * @returns {string}
              * Prompts user to enter a description
              * @throws {TypeError} if description is not valid
              */
            var desc = prompt('Enter A Commit Description\n - Include a task number if one is available', ''),
                noDesc = 'You Must Include A Commit Description!';
            if (desc.length <= 2) {
                alert(noDesc);
                throw new ReferenceError(noDesc);
            }
            return desc;
        },
		
		changeLogTemplate = function () {
			var changeLog = [
					'\n>----->  CHANGE LOG  <-----<',
					'-[ ' + new Date().toLocaleString() + ' ]-'
				].join('\n');
			return changeLog;
		};

	function insertChangeLog () {
		var desc = exu.d.getElementsByName('description')[0];
		
		desc.value += changeLogTemplate();
		desc.focus();
	}

	function getSVNCommitLog () {
		/** A prefilled and selected prompt
		  * Includes the id, summary and user provided description
		  */
		var id = 'ID: ' + getEventumTicketId(),
			sum = 'Summary: ' + getEventumTicketSummary(),
			desc = 'Description: ' + getCommitDescription(),
			logDetails = [id, sum, desc].join('\n');
		prompt('Press CTRL+C and hit ENTER', logDetails);
	}


	if (exu.isSpecifiedPage(/view\.php/)) {
		getSVNCommitLog();
	}

	if (exu.isSpecifiedPage(/update\.php/)) {
		insertChangeLog();
	}

}());
