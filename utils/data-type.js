(function ( jsroot ) {
    "use strict";

    // Credit Card RegExp
    let regCC    = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
        // Security Number
        regSN    = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/,
        // Alpha Numeric
        regAN    = /^[A-Za-z0-9]+$/,
        // Affirmative
        regAF    = /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/,
        // IPv4
        regI4    = /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
        // IPv6
        regI6    = /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,

        // Time String
        regTime  = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
        // Date String
        regDate  = /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/,
        // URL
        regURL   = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
        // Email Address
        regEmail = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
        // Hexadecimal
        regHexa  = /^[0-9a-fA-F]+$/,
        // HEX Color
        regColor = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

    let RegName = {
        URL            : regURL,
        IPv4           : regI4,
        IPv6           : regI6,
        Email          : regEmail,
        HexColor       : regColor,
        Hexadecimal    : regHexa,
        TimeString     : regTime,
        DateString     : regDate,
        CreditCard     : regCC,
        AlphaNumeric   : regAN,
        Affirmative    : regAF,
        SecurityNumber : regSN
    }

    // Collecting helper methods.
    let methods = {
        /**
         * Define Checker
         * Check does the argument type is defined.
         *
         * @param arg
         * @returns {boolean}
         */
        isDefined( arg ) {
            return 'undefined' === typeof arg;
        },
        isUndefined( arg ) {
            return !isDefined(arg);
        },

        /**
         * String Checker
         * Check does the argument type is a string.
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isString( arg ) {
            return 'string' === typeof arg;
        },
        isNotString( arg ) {
            return !isString(arg);
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
            return 'function' === typeof arg;
        },
        isNotFunction( arg ) {
            return !isFunction(arg);
        },

        /**
         * Object Checker
         * Check does the argument type is an object and not an array.
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isObject( arg ) {
            return toString.call(arg) === '[object Object]' ? true : false;
        },
        isNotObject( arg ) {
            return !isObject(arg);
        },

        /**
         * Array Checker
         * Check does the argument type is an array.
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isArray( arg ) {
            return toString.call(arg) === '[object Array]' ? true : false;
        },
        isNotArray( arg ) {
            return !isArray(arg);
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
        isNotBoolean( arg ) {
            return !isBoolean(arg);
        },

        /**
         * Number Checker
         * Check does the argument type is a number.
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isNumber( arg ) {
            return 'number' === typeof arg && !isNaN(arg) ? true : false;
        },
        isNotNumber( arg ) {
            return !isNumber(arg);
        },

        /**
         * Date Checker
         * Check does the argument type is a date.
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isDate( arg ) {
            return arg.getDate && !isNaN(arg) ? true : false;
        },
        isNotDate( arg ) {
            return !isDate(arg);
        },

        /**
         * Type Arguments Checker
         * Check does the given argument is an Arguments
         *
         * @param arg
         * @returns {boolean}
         */
        isArguments( arg ) {
            return 'undefined' !== typeof arg && arg.toString() === '[object Arguments]' ? true : false;
        },
        isNotArguments( arg ) {
            return !isArguments(arg);
        },

        /**
         * Type Error Checker
         * Check does the given argument is an Error.
         *
         * @param arg
         * @returns {boolean}
         */
        isError( arg ) {
            return toString.call(arg) === '[object Error]' ? true : false;
        },
        isNotError( arg ) {
            return !isError(arg);
        },

        /**
         * Type Null Checker
         * Check does the given argument is null.
         *
         * @param arg
         * @returns {boolean}
         */
        isNull( arg ) {
            return arg === null ? true : false;
        },
        isNotNull( arg ) {
            return !isNull(arg);
        },

        /**
         * Type JSON Checker
         * Check does the given argument is a valid for JSON.
         *
         * @param arg
         * @returns {*}
         */
        isJSON( arg ) {
            let result;

            if ( isObject(arg) ) {
                try {
                    JSON.stringify(arg);
                    result = true;
                }
                catch ( err ) {
                    result = false;
                }
            }
            else {
                result = false;
            }

            return result;
        },
        isNotJSON( arg ) {
            return !isJSON(arg);
        },

        /**
         * Type JSON String Checker
         * Check does the given argument is a valid JSON String.
         * @param arg
         * @returns {*}
         */
        isJSONString( arg ) {
            let result;

            if ( isString(arg) ) {
                try {
                    JSON.parse(arg);
                    result = true;
                }
                catch ( err ) {
                    result = false;
                }
            }
            else {
                result = false;
            }

            return result;
        },
        isNotJSONString( arg ) {
            return !isJSONString(arg);
        },

        /**
         * Type RegExp Checker
         * Check does the given argument is a RegExp.
         * @param arg
         * @returns {boolean}
         */
        isRegExp( arg ) {
            return toString.call(arg) === '[object RegExp]';
        },
        isNotRegExp( arg ) {
            return !isRegExp(arg);
        },

        // VALUE CHECKER

        /**
         * Empty Checker
         * Check does the given argument is an empty object, array, or string.
         *
         * @param arg
         * @returns {boolean}
         */
        isEmpty( arg ) {
            if ( isObject(arg) ) arg = Object.keys(arg);

            return arg.length < 1;
        },
        isNotEmpty( arg ){
            return !isEmpty(arg);
        }
    }

    // Registering
    for ( let key in RegName ) {
        methods[ `is${key}` ] = function ( arg ) {
            return RegName[ key ].test(arg);
        }

        methods[ `isNot${key}` ] = function ( arg ) {
            return !methods[ `is${key}` ](arg);
        }
    }

    // Adding the helper methods to the global object, and lock them.
    Object.keys(methods).sort().forEach(function ( key ) {
        let value = methods[ key ];

        console.log(key);

        Object.defineProperty(jsroot, key, {
            enumerable : false,
            writable   : false,
            value      : value
        });
    });
})('undefined' !== typeof global ? global : {});
