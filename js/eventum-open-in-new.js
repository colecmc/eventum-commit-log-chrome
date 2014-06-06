(function () {
	/**
	 * @author (@colecmc)
	 * Open attached files in a new window
	 */
	'use strict';
	var links,files = exu.d.getElementById('attachments2');

	if (files instanceof HTMLTableRowElement && files.firstElementChild.colSpan <= 1) {
		/**
		 * let links = files.getElementsByClassName('link');
		 * would be nice to use 'let' here for links as above
		 * chrome does not support it by default
		 * only through 'chrome://flags/#enable-javascript-harmony'
		 * the extension cannot force it
		 */
		/*console.log('colSpan is: ' + files.firstElementChild.colSpan);*/
		links = files.getElementsByClassName('link');
		exu.loops(links, function(itr) {
			if (/download\.php/.test(links[itr].href)) {
				links[itr].target = '_blank';
			}
		});
	}
}());