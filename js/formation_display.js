document.addEventListener('DOMContentLoaded', function() {

    var containers = document.querySelectorAll('.bach_tabs_container');

    containers.forEach(function(container) {

        var tabs = container.querySelectorAll('.bach_tab');

        tabs.forEach(function(tab) {
            tab.addEventListener('click', function() {

                tabs.forEach(function(t) {
                    t.classList.remove('actif');
                });

                tab.classList.add('actif');

                var parent = container.parentElement;
                var contents = parent.querySelectorAll('.bach_contenu');

                contents.forEach(function(c) {
                    c.classList.remove('actif');
                });

                var target = tab.getAttribute('data_tab');
                parent.querySelector('#' + target).classList.add('actif');

            });
        });

    });

});