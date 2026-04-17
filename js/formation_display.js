document.addEventListener('DOMContentLoaded', function() {

    var tabs = document.querySelectorAll('.majors__tab');

    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function() {

            var allTabs = document.querySelectorAll('.majors__tab');
            for (var j = 0; j < allTabs.length; j++) {
                allTabs[j].classList.remove('active');
            }

            this.classList.add('active');

            var contents = document.querySelectorAll('.majors__content');
            for (var k = 0; k < contents.length; k++) {
                contents[k].classList.remove('active');
            }

            var target = this.getAttribute('data-tab');
            document.getElementById(target).classList.add('active');

        });
    }

});