(function () {
    /** @author (@colecmc) */
    'use strict';
    var user, desc = exu.d.getElementsByName('description')[0],
        htmlTemplate = function (arr) {
            /** takes an array and returns a string */
            return arr.join('');
        },
        getUserName = function () {
            /**
             * @returns {string} Users First Name according to Eventum
             * A guess at best. If HTML structure changes we're in trouble
             * Loops through all <b> tags to find one with 'Standard User: '
             * Then finds next space which should have the name
             */
            var bolds = exu.d.getElementsByTagName('b'),
                name;

            exu.loops(bolds, function (itr) {
                if (bolds[itr].innerHTML.search(/Standard User: /) != -1) {
                    name = bolds[itr].innerHTML.slice(bolds[itr].innerHTML.indexOf(': ') + 2);
                }
            });
            user = name.slice(0, name.lastIndexOf(' '));
            return user;
        };


    function insertAtCursor(myField, myValue) {
        /**
         * Attempts to find the cursor position.
         ** It can struggle if the text field contains:
         ** asterisks, slashes, other special chars
         * @see http://stackoverflow.com/a/11077016/1839887
         */
        var startPos, endPos;
        if (myField.selectionStart || myField.selectionStart === '0') {
            startPos = myField.selectionStart;
            endPos = myField.selectionEnd;
            myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
            myField.selectionStart = startPos + myValue.length;
            myField.selectionEnd = startPos + myValue.length;
        }
        else {
            myField.value += myValue;
        }
    }


    function insertChangeLog() {
        insertAtCursor(desc, htmlTemplate(['\n>----->  CHANGE LOG  <-----<\n']));
        desc.focus();
    }

    function insertTimeStamp() {
        insertAtCursor(desc, htmlTemplate(['-[ ' + new Date().toLocaleString() + ' ]-']));
        desc.focus();
    }

    function insertMarkComplete() {
        insertAtCursor(desc, htmlTemplate(['-[ DONE : ' + getUserName() + ' ]-']));
        desc.focus();
    }

    function insertItemStatus(status) {
        insertAtCursor(desc, htmlTemplate(['-[ ' + status + ' ]-']));
        desc.focus();
    }

    if (exu.isSpecifiedPage(/update\.php/)) {
        /* verify we are on the right page and listen for a message */
        chrome.runtime.onMessage.addListener(function (request) {
            switch (request.desc) {
                case 1:
                    insertChangeLog();
                    break;
                case 2:
                    insertMarkComplete();
                    break;
                case 3:
                    insertTimeStamp();
                    break;
                default:
                    insertItemStatus(request.desc);
                    break;
            };
        });
    }

}());