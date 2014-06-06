(function(d){
	var uri = d.getElementById('eventum-to-SVN-commit-log-url'),
		attachedFiles = d.getElementById('eventum-to-SVN-commit-log-open-attached-new');

	function showStatus(stat) {
		var status = d.getElementById('status');
		status.className = 'save-status';
		status.textContent = stat;
		setTimeout(function() {
			status.textContent = '';
			status.className = '';
		}, 1200);
	}

	function saveOptions() {
		var urlRgX = /^http\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?$/;

		if ( uri.value !== '' && uri.value.match(urlRgX)){
			chrome.storage.sync.set({
				eventumURL: uri.value,
				doOpenInNew: attachedFiles.checked
			}, function(){
				showStatus('Options Saved');
			});
		} else {
			showStatus('That URL is not valid');
			uri.value = '';
			uri.focus();
		}
	}

	function retainSetOptions() {
		chrome.storage.sync.get([
			'eventumURL',
			'doOpenInNew'
		], function(items) {
			if (items.eventumURL !== ''){
				uri.value = items.eventumURL;
			} else { uri.value = ''; }


			if (items.doOpenInNew){
				attachedFiles.checked = items.doOpenInNew;
			} else { attachedFiles.checked = false; }
		});
	}
	d.addEventListener('DOMContentLoaded', retainSetOptions);
	d.getElementById('eventum-save-options').addEventListener('click', saveOptions);
}(exu.d));