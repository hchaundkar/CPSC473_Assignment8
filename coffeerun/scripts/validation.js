(function(window) {
    'use strict';
    var App = window.App || {};
    var isValidEmail = App.isValidEmail;
    var Validation = {
        isCompanyEmail: function(email) {
            console.log('In mail validation');
            return /.+@bignerdranch\.com$/.test(email);

        },
        isDecaf: function(coffeeOrder, caffeineStrength) {
            console.log('In custom validation');
            //  var str= 'decaf';
            if (/decaf/.test(coffeeOrder) && caffeineStrength >= '20') {
                console.log('In custom decaf validation');
                return false;

            } else {
                return true;
            }

        },
        isServerValidEmailAddress: function(emailAddress, remoteDs) {
            console.log('In Server validation');
            App.isValidEmail = true;
            return remoteDs.get(emailAddress, function(serverResponse) {
                if (serverResponse == null) {
                    App.isValidEmail = true;
                } else {
                    App.isValidEmail = false;
                }
            });

        }
    };


    App.Validation = Validation;
    App.isValidEmail = isValidEmail;
    window.App = App;
})(window);
