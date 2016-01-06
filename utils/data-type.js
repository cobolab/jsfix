(function ( jsroot ) {
    "use strict";

    // Collecting helper methods.
    var methods = {
        /**
         * String Checker
         * Check does the argument type is a string.
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isString( arg ) {
            return 'string' === typeof arg ? true : false;
        },

        /**
         * Function Checker
         * Check does the argument type is a function.
         *
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isFunction( arg ) {
            return 'function' === typeof arg ? true : false;
        },

        /**
         * Object Checker
         * Check does the argument type is an object and not an array.
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isObject( arg ) {
            return 'object' === typeof arg && !Array.isArray(arg) ? true : false;
        },

        /**
         * Array Checker
         * Check does the argument type is an array.
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isArray( arg ) {
            return Array.isArray(arg);
        },

        /**
         * Boolean Checker
         * Check does the argument type is a boolean.
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isBoolean( arg ) {
            return 'boolean' === typeof arg ? true : false;
        },

        /**
         * Number Checker
         * Check does the argument type is a number.
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isNumber( arg ) {
            return 'number' === typeof arg ? true : false;
        },

        /**
         * Date Checker
         * Check does the argument type is a date.
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isDate( arg ) {
            return !isNaN(new Date(arg).getDate()) ? true : false;
        },

        /**
         * URL Checker
         * Check does the argument type is a URL.
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isURL( arg ) {
            return /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i.test(arg) ? true : false;
        },

        /**
         * Email Checker
         * Check does the argument type is an Email.
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isEmail( arg ) {
            return /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i.test(arg) ? true : false;
        },
    }

    // Adding the helper methods to the global object, and lock them.
    for ( var key in methods ) {
        var value = methods[ key ];

        Object.defineProperty(jsroot, key, {
            enumerable : false,
            writable   : false,
            value      : value
        });
    }
})('undefined' !== typeof global ? global : {});
