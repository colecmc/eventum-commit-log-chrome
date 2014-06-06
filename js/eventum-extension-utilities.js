var exu = (function(win,doc,und){
	/**
	  * @author (@colecmc)
	  * @summary Eventum Extension Utilities
	  * basic reusable functionality for the extension
	  */
    'use strict';
    return {
		w: win,
		d: doc,
		uri: win.location.href,
		loops: function loops(items, cb) {
			/**
			  * @method generic reuseable loop with callback for specific actions
			  * @params {array} items
			  * @params {function} cb
			  */
			var i = items.length;
	
			if (i > -1) {
				do {
					if (items[i] !== und) {
						cb(i);
					}
				}
				while (--i >= 0);
			}
		},

        isSpecifiedPage: function (page) {
            /**
              * @param {object} page - RegExp to find string in URL
              * @returns {boolean} true
              */
            if (this.uri.search(page) !== -1) {
                return true;
            }
        }
	};
}(window,document,undefined));