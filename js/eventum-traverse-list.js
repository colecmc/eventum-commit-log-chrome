(function () {
    /**
     * @author (@colecmc)
     * Use ugly ugly ugly chain to select the table rows of the list page and add a class
     * - Eventum markup is lacking an easier way to add custom styles
     */
    'use strict';
    var bolds = exu.d.getElementsByTagName('b');

    exu.loops(bolds, function (itr) {
        var listRows;
        if (bolds[itr].innerHTML === "Eventum") {
            listRows = exu.d.getElementsByName('list_form')[0].nextElementSibling.nextElementSibling.getElementsByTagName('table')[0].getElementsByTagName('tr');
            exu.loops(listRows, function (itr) {
                //console.log(listRows[itr]);
                if (listRows[itr].classList.length > 0) {
                    listRows[itr].classList.add('eventum-row-highlight');
                } else {
                    listRows[itr].className = 'eventum-row-highlight';
                }
            });
        }
    });
}());