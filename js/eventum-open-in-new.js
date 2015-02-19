(function () {
	/**
	 * @author (@colecmc)
	 * Open attached files in a new window
	 */
	'use strict';
	var links;

	links = exu.d.getElementsByClassName('link');
	exu.loops(links, function(itr) {
		if (/download\.php/.test(links[itr].href)) {
			links[itr].target = '_blank';
		}
	});
}());