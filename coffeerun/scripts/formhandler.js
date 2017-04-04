(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find the matching selector' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log('Data Value:' + item.name + 'is' + item.value);
            });

            console.log(data);
            fn(data)
                .then(function() {
                    this.reset();
                    this.elements[0].focus();
                }.bind(this));
        });
    };

    FormHandler.prototype.validateServerEmailAddress = function(fn, remoteDs) {
        this.$formElement.on('blur', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var msg = '';
            fn(emailAddress, remoteDs).then(function() {
                if (App.isValidEmail == true) {
                    event.target.setCustomValidity('');
                } else {
                    msg = emailAddress + ' is not an authorized email address!';
                    event.target.setCustomValidity(msg);
                }
            });

        });
    };
    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
            console.log(fn(emailAddress));
        });
    };

    FormHandler.prototype.addCustomHandler = function(fn) {
        console.log('Setting Custom Handler');
        var caffeineStrength = '';
        var coffeeOrder = '';

        $('#strengthLevel').change(function(event) {
            coffeeOrder = $('#coffeeOrder').val();
            caffeineStrength = event.target.value;
            var message = '';
            if (fn(coffeeOrder, caffeineStrength)) {
                event.target.setCustomValidity('');
            } else {
                message = 'Caffeine Strength' + caffeineStrength + ' is not valid with ' + coffeeOrder + 'option';
                event.target.setCustomValidity(message);
            }
        });

        console.log(fn(coffeeOrder, caffeineStrength));

    };


    App.FormHandler = FormHandler;
    window.App = App;
})(window);
