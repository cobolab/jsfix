'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

(function (jsroot) {
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

        isString: function isString(arg) {
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
        isFunction: function isFunction(arg) {
            return 'function' === typeof arg ? true : false;
        },

        /**
         * Object Checker
         * Check does the argument type is an object and not an array.
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isObject: function isObject(arg) {
            return 'object' === (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) && !Array.isArray(arg) ? true : false;
        },

        /**
         * Array Checker
         * Check does the argument type is an array.
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isArray: function isArray(arg) {
            return Array.isArray(arg);
        },

        /**
         * Boolean Checker
         * Check does the argument type is a boolean.
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isBoolean: function isBoolean(arg) {
            return 'boolean' === typeof arg ? true : false;
        },

        /**
         * Number Checker
         * Check does the argument type is a number.
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isNumber: function isNumber(arg) {
            return 'number' === typeof arg ? true : false;
        },

        /**
         * Date Checker
         * Check does the argument type is a date.
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isDate: function isDate(arg) {
            return !isNaN(new Date(arg).getDate()) ? true : false;
        },

        /**
         * URL Checker
         * Check does the argument type is a URL.
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isURL: function isURL(arg) {
            return (/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i.test(arg) ? true : false
            );
        },

        /**
         * Email Checker
         * Check does the argument type is an Email.
         *
         * @param arg - Argument variable name.
         * @returns {boolean}
         */
        isEmail: function isEmail(arg) {
            return (/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i.test(arg) ? true : false
            );
        }
    };

    // Adding the helper methods to the global object, and lock them.
    for (var key in methods) {
        var value = methods[key];

        Object.defineProperty(jsroot, key, {
            enumerable: false,
            writable: false,
            value: value
        });
    }
})('undefined' !== typeof global ? global : {});

(function (jsroot) {
    "use strict";

    /* Simple Object or Array Looper */

    var Looper = (function () {
        function Looper(oba) {
            _classCallCheck(this, Looper);

            this.type = 'object';
            this.items = [];
            this.length = 0;
            this.cursor = 0;
            this.looper = false;

            if ('object' === (typeof oba === 'undefined' ? 'undefined' : _typeof(oba)) && !Array.isArray(oba)) {
                for (var key in oba) {
                    if (oba.hasOwnProperty(key)) {
                        this.items.push({ key: key, value: oba[key] });
                        this.length += 1;
                    }
                }
            } else if (Array.isArray(oba)) {
                this.type = 'array';
                this.items = oba;
                this.length = oba.length;
            }
        }

        _createClass(Looper, [{
            key: 'next',
            value: function next() {
                if ('function' === typeof this.looper) {
                    if (this.cursor < this.length) {
                        /* Getting Next Item */
                        var item = this.items[this.cursor];

                        /* Increase cursor */
                        this.cursor += 1;

                        /* Call the loop handler */
                        if (this.type === 'object') {
                            this.looper.call(this, item.key, item.value, this.next);
                        } else {
                            this.looper.call(this, item, this.cursor - 1, this.next);
                        }
                    }
                }

                return this;
            }
        }, {
            key: 'each',
            value: function each(fn) {
                if ('function' === typeof fn) {
                    /* Save loop handler */
                    this.looper = fn;

                    /* Run looper */
                    this.next();
                }

                return this;
            }
        }]);

        return Looper;
    })();

    // Collecting helper methods.

    var methods = {
        /**
         * Object or Array Looper
         * Loop through array item or object properties, and wait until this.next() invoked to proceed the next items.
         *
         * @param arg - Array or object to iterate.
         * @param fn  - Iterator handler.
         * @returns {*}
         */

        forwait: function forwait(arg, fn) {
            return new Looper(arg).each(fn);
        }
    };

    // Adding the helper methods to the global object, and lock them.
    for (var key in methods) {
        var value = methods[key];

        Object.defineProperty(jsroot, key, {
            enumerable: false,
            writable: false,
            value: value
        });
    }
})('undefined' !== typeof global ? global : {});

(function (jsroot) {
    'use strict';

    /**
     * Object Patches
     * This patches contains javascript object patch to add some functionality to help developers working with object.
     * The common patches is methods to work with object path, including path getter and setter, path parser, etc.
     * The iteration also useful since it works with both object, array, string, etc.
     *
     * @type {any}
     */

    var patches = {
        /**
         * Path Value Getter
         * This function will get object value by the given path.
         *
         * @param path {string} - String path. E.g: 'people.child.first.wife.name'.
         * @param defvalue [any]  - Default value when the given path is return undefined.
         * @returns {*}
         */
        $get: function $get(path, defvalue) {
            if (!'string' === (typeof path === 'undefined' ? 'undefined' : _typeof(path))) return;

            /* Define current scope, paths list, result and done status */
            var current = this,
                paths = path.split(this.__delimiter || '.'),
                result = undefined,
                done = undefined;

            /* Iterate deeply until done */
            while (!done && paths.length > 0) {
                /* Define next object */
                var next = paths[0];

                if (paths.length <= 1) {
                    /* Check last path and adding result if exist */
                    if ('undefined' !== typeof current[next]) {
                        result = current[next];
                    } else {
                        result = undefined;
                        done = true;
                    }
                } else {
                    /* Continue if next target is exist */
                    if ('object' === _typeof(current[next])) {
                        /* Update current scope */
                        current = current[next];
                    }

                    /* Escape in first not found */
                    else {
                            result = undefined;
                            done = true;
                        }
                }

                /* Define next path by slicing the paths list */
                paths = paths.slice(1);
            }

            /* Return default value if the given path is undefined, and the default value is defined */
            if (typeof result === 'undefined' && typeof defvalue !== 'undefined') {
                return defvalue;
            }

            /* Returning the result */
            return result;
        },

        /**
         * Path Value Setter
         * This function will set object value by the give path and value.
         *
         * @param path {string} - String path. E.g: 'people.address'.
         * @param value {any}   - The value to be set to the path.
         * @returns {object}
         */
        $set: function $set(path, value) {
            if (!'string' === (typeof path === 'undefined' ? 'undefined' : _typeof(path))) return;

            /* Define current scope and paths list */
            var current = this,
                paths = path.split(this.__delimiter || '.');

            /* Iterate scopes until done */
            while (paths.length > 0) {
                /* Define next target */
                var next = paths[0];

                /* Apply the value if current path is the last path */
                if (paths.length <= 1) {
                    current[next] = value;
                    current = current[next];
                }
                /* Continue to iterate if still have next path */
                else {
                        if ('object' === _typeof(current[next])) {
                            /* Use next scope if exist and updating current scope */
                            current = current[next];
                        } else {
                            /* Create next scope if not exist and updating current scope */
                            current[next] = {};
                            current = current[next];
                        }
                    }

                /* Define next path by slicing paths list */
                paths = paths.slice(1);
            }

            /* Return the object it self */
            return this;
        },

        /**
         * Array Item Adder
         * This function will add new item to the array by the given path.
         *
         * @param path {string} - String path. E.g: 'people.childs'.
         * @param value {any}   - The value to be added to the array.
         * @returns {object}
         */
        $add: function $add(path, value) {
            if (Array.isArray(this.$get(path))) {
                var current = this,
                    paths = path.split(this.__delimiter || '.');

                while (paths.length > 0) {
                    current = current[paths[0]];
                    paths = paths.slice(1);
                }

                current.push(value);
            }

            return this;
        },

        /**
         * Path Remover
         * This function will remove property from object, or item from array.
         *
         * @param path {string}   - String path. E.g: 'people.disabled' or 'people.childs.0'.
         * @param length [number] - The length of item that will be removed. Only used to remove array items.
         * @returns {patches}
         */
        $del: function $del(path, length) {
            /* Define current scope, paths list and done stat */
            var current = this,
                paths = path.split(this.__delimiter || '.'),
                done = undefined;

            /* Iterate each path until done */
            while (!done && paths.length > 0) {
                /* Define next path */
                var next = paths[0];

                /* Last iteration */
                if (paths.length <= 1) {
                    /* Delete target using object/array method if exist */
                    if (current[next]) {
                        if (Array.isArray(current)) {
                            current.splice(next, length || 1);
                        } else {
                            delete current[next];
                        }
                    }
                } else {
                    if ('object' === _typeof(current[next])) {
                        /* Update current scope if next target is exist */
                        current = current[next];
                    } else {
                        /* Escape if not found */
                        done = true;
                    }
                }

                /* Define next path by slicing paths list */
                paths = paths.slice(1);
            }

            return this;
        },

        /**
         * Object Path Parser
         * This function will create an object map contains the property paths, recursively.
         *
         * @param noroot {boolean} - If true, the root object will excluded. E.g: { a: { d: 2 }, b: 1} will resulting { a.d, b }.
         * @returns {{}}
         */
        $dir: function $dir(noroot) {
            /* Define current path scope and path list */
            var current = '',
                maps = {};

            /* Perform Extract */
            extract(this);

            /* Creating Extractor */
            function extract(target) {
                /* Iterating each items and properties */
                target.$each(function (a, b) {
                    /* Copy last path */
                    var last = current;

                    /* Defining key and value by checking the target type */
                    var key = Array.isArray(target) ? b : a,
                        val = Array.isArray(target) ? a : b;

                    /* Creating new path */
                    var path = current + (!current ? '' : '.') + key;

                    /* Adding path to maps */
                    if ('object' === (typeof val === 'undefined' ? 'undefined' : _typeof(val))) {
                        if (!noroot) {
                            maps[path] = {
                                type: Array.isArray(val) ? 'array' : typeof val === 'undefined' ? 'undefined' : _typeof(val),
                                body: val
                            };
                        }
                    } else {
                        maps[path] = {
                            type: typeof val === 'undefined' ? 'undefined' : _typeof(val),
                            body: val
                        };
                    }

                    /* Extract child scope if the current scope is object or array */
                    if ('object' === (typeof val === 'undefined' ? 'undefined' : _typeof(val))) {
                        /* Updating current path */
                        current = path;

                        /* Perform Extract */
                        extract(val);

                        /* Revert the current path to bring back the scope */
                        current = last;
                    }
                });
            }

            /* Returning Maps */
            return maps;
        },

        /**
         * Check the difference between two object.
         *
         * @param from {object/array} - Object or array to compare.
         *                              The source and target type should be equal (object to object) (array to array).
         * @returns {Object}
         */
        $dif: function $dif(from) {
            var _this = this;

            /* Return zero result if the object source and the object type is not equal. */
            if (Array.isArray(this) && !Array.isArray(from)) return {};
            if (Array.isArray(from) && !Array.isArray(this)) return {};

            // Creating result.
            var dif = {};

            if ('object' === (typeof from === 'undefined' ? 'undefined' : _typeof(from))) {
                // Parsing the both object paths.
                var cur = this.$dir(true);
                var src = from.$dir(true);

                // Iterating each path to match the value.
                cur.$each(function (key, val) {
                    if (_this.$get(key) !== from.$get(key)) {
                        // Add the path to the result if the value is difference.
                        dif[key] = { old: _this.$get(key), new: from.$get(key) };
                    }
                });
            }

            return dif;
        },

        /**
         * Object and array iterator.
         * This function is used to iterate properties in object, or items in array.
         *
         * @param handler {function} - Function to handle each item.
         * @param reverse {boolean}  - Does the iteration should reversed (desc).
         * @returns {patches}
         */
        $each: function $each(handler, reverse) {
            if (!'function' === (typeof handler === 'undefined' ? 'undefined' : _typeof(handler))) return;

            /* Decide to use Array iterator or Object iterator */
            if (Array.isArray(this)) {
                var i = undefined,
                    ln = undefined;

                if (!reverse) {
                    /* Iterating each items */
                    for (i = 0, ln = this.length; i < ln; ++i) {
                        /* Apply this object to the handler */
                        handler.call(this, this[i], i);
                    }
                } else {
                    for (i = this.length; i > 0; --i) {
                        handler.call(this, this[i - 1], i - 1);
                    }
                }
            } else {
                /* Iterating each properties */
                for (var key in this) {
                    if (this.hasOwnProperty(key)) {
                        /* Apply this object to the handler */
                        handler.call(this, key, this[key]);
                    }
                }
            }

            return this;
        },

        /**
         * Object and Array Merger
         * This function will recursively merge two or more object/array.
         *
         * @param sources {object/array} - Object the source object to merge from, or array contains objects to merge from.
         * @param ignore {array}         - Array contains path to ignore from merging.
         * @returns {patches}
         */
        $join: function $join(sources, ignore) {
            /* Skip if sources is not an object or array */
            if (!'object' === (typeof sources === 'undefined' ? 'undefined' : _typeof(sources))) return;

            /* Wrap source to array if not an array */
            if ('object' === (typeof sources === 'undefined' ? 'undefined' : _typeof(sources)) && !Array.isArray(sources)) {
                sources = [sources];
            }

            /* Create new array if ignore is not an array */
            if (!Array.isArray(ignore)) ignore = [];

            /* Creating target holder and target maps */
            var main = this,
                self = this.$dir();

            /* Iterate each sources */

            var _loop = function _loop(i) {
                /* Creating source holder and source maps */
                var base = sources[i],
                    next = base.$dir(),
                    igm = '??';

                /* Continue if type of target is equal to type of source */
                if (Array.isArray(main) && Array.isArray(base) || !Array.isArray(main) && !Array.isArray(base)) {
                    /* Iterate each maps to do merge */
                    next.$each(function (path, value) {
                        /* Return if path is ignored */
                        if (ignore.indexOf(path) > -1) {
                            igm = path + '.';

                            return;
                        }

                        /* Ignore childs from first ignored path */
                        if (igm + path.split(igm)[1] === path) {
                            return;
                        } else {
                            igm = '??';
                        }

                        /* Create new property if not exist */
                        if (!self[path]) {
                            main.$set(path, value.body);
                        } else {
                            /* Replace with new value if type of next target value is different with type of next target value */
                            if (self[path].type !== value.type) {
                                main.$set(path, value.body);
                            } else {
                                /* Replace if type of next target is not object or array */
                                if (value.type !== 'object' && value.type !== 'array') {
                                    main.$set(path, value.body);
                                }
                            }
                        }
                    });
                }
            };

            for (var i = 0; i < sources.length; ++i) {
                _loop(i);
            }

            return this;
        },

        /**
         * Object and Array Sorter
         * This function will recursively sort an objects or arrays.
         *
         * @param handler [function] - Optional function to handle the sort function.
         * @returns {*}
         */
        $sort: function $sort(handler) {
            /* Perform Sorting */
            return sort(this);

            /* Creating Sorter */
            function sort(target) {
                /* Creating result */
                var result = undefined;

                /* Array Sorter */
                if (Array.isArray(target)) {
                    /* Create array as result */
                    result = [];

                    /* Sort and iterate each item in target to sort the childs before adding to result */
                    target.sort(handler).$each(function (value, i) {
                        if ('object' !== (typeof value === 'undefined' ? 'undefined' : _typeof(value))) {
                            /* Add to result if child is not object or array */
                            result[i] = value;
                        } else {
                            /* Sort child before adding to result */
                            result[i] = sort(value);
                        }
                    });
                }

                /* Object Sorter */
                else {
                        /* Create object as result */
                        result = {};

                        /* Create target keys list to perform sort and iterate eachitem to sort the childs before adding to result */
                        Object.keys(target).sort(handler).$each(function (key) {
                            /* Creating child from target */
                            var value = target[key];

                            if ('object' !== (typeof value === 'undefined' ? 'undefined' : _typeof(value))) {
                                /* Add to result if child is not object or array */
                                result[key] = value;
                            } else {
                                /* Sort child before adding to result */
                                result[key] = sort(value);
                            }
                        });

                        /* Delete all properties from target */
                        target.$each(function (key) {
                            delete target[key];
                        });

                        /* Apply sorted properties to target */
                        result.$each(function (key, value) {
                            target[key] = value;
                        });
                    }

                /* Return the target it self */
                return target;
            }
        },

        /* Object.keys wrapper */
        $keys: function $keys() {
            if (!Array.isArray(this)) {
                return Object.keys(this);
            }

            return this;
        },

        /**
         * Array Item Grouper
         * This function will grouping an items inside an array with the given column per row.
         *
         * @param column {number} - Number of column per row.
         * @param mode {string}   - Wrapping mode, split or chunk.
         * @returns {*}
         */
        $group: function $group(column, mode) {
            var _this2 = this;

            if (!Array.isArray(this) || !'number' === (typeof column === 'undefined' ? 'undefined' : _typeof(column))) return;

            /* Create group and current index */
            var group = [],
                currn = 0;

            /* Prepare Columns */
            (column - 1).$each(function (i) {
                group.push([]);
            });

            /* Start Grouping */
            if (mode === 'split') {
                (function () {
                    var gpn = Math.ceil(_this2.length / column),
                        crg = 1;

                    _this2.$each(function (val) {
                        group[currn].push(val);

                        if (crg === gpn) {
                            crg = 1;
                            currn++;
                        } else {
                            crg++;
                        }
                    });
                })();
            } else if (mode === 'chunk') {
                (function () {
                    /* Create child group */
                    var childGroup = [];

                    /* Reset parent group */
                    group = [];

                    _this2.$each(function (val, i) {
                        /* Push current value to child group */
                        childGroup.push(val);

                        if (currn === column - 1 || i === this.length - 1) {
                            /* Add child group to parent group */
                            group.push(childGroup);

                            /* Reste child group */
                            childGroup = [];

                            /* Reset child index */
                            currn = 0;
                        } else {
                            /* Increase child index */
                            currn++;
                        }
                    });
                })();
            } else {
                this.$each(function (val) {
                    /* Push value to current child */
                    group[currn].push(val);

                    if (currn === column - 1) {
                        /* Reset current child index */
                        currn = 0;
                    } else {
                        /* Increase current child index */
                        currn++;
                    }
                });
            }

            return group;
        }
    };

    /* Applying Object Extensions */
    for (var key in patches) {
        /* Locking Extension */
        Object.defineProperty(Object.prototype, key, {
            enumerable: false,
            value: patches[key]
        });
    }
})('undefined' !== typeof global ? global : window);
(function (jsroot) {
    'use strict';

    /* String Patches */

    var patches = {
        /* Get lower string at index */

        lowerAt: function lowerAt(idx) {
            idx = idx > 26 ? 26 : idx;

            return String.fromCharCode(97 + (idx - 1));
        },

        /* Get upper string at index */
        upperAt: function upperAt(idx) {
            idx = idx > 26 ? 26 : idx;

            return String.fromCharCode(65 + (idx + 1));
        }
    };

    /* String Methods */
    var methods = {
        /* String Iterator */

        $each: function $each(handler, reverse) {
            if (!'function' === (typeof handler === 'undefined' ? 'undefined' : _typeof(handler))) return;

            var i = undefined,
                ln = undefined;

            if (!reverse) {
                for (i = 0, ln = this.length; i < ln; ++i) {
                    handler.call(this, this[i], i);
                }
            } else {
                for (i = this.length; i > 0; --i) {
                    handler.call(this, this[i - 1], i - 1);
                }
            }

            return this;
        }
    };

    /* Adding pacthes and methods to the String class */
    for (var key in patches) {
        /* Locking Extension */
        Object.defineProperty(String, key, {
            enumerable: false,
            value: patches[key]
        });
    }

    for (var key in methods) {
        /* Locking Extension */
        Object.defineProperty(String.prototype, key, {
            enumerable: false,
            value: methods[key]
        });
    }
})('undefined' !== typeof global ? global : window);
(function (jsroot) {
    'use strict';

    /* Number Patches */

    var patches = {
        /* Generate Random Number Between Two Number */

        random: function random(start, end) {
            return Math.floor(Math.random() * (end - start + 1)) + start;
        }
    };

    /* Number Methods */
    var methods = {
        /* Number Iterator */

        $each: function $each(handler, reverse) {
            if (!'function' === (typeof handler === 'undefined' ? 'undefined' : _typeof(handler))) return;

            var i;

            if (!reverse) {
                for (i = 0; i <= this; ++i) {
                    handler.call(this, i);
                }
            } else {
                for (i = this; i >= 0; --i) {
                    handler.call(this, i);
                }
            }

            return this;
        }
    };

    /* Adding pacthes and methods to the Number class */
    for (var key in patches) {
        /* Locking Extension */
        Object.defineProperty(Number, key, {
            enumerable: false,
            value: patches[key]
        });
    }

    for (var key in methods) {
        /* Locking Extension */
        Object.defineProperty(Number.prototype, key, {
            enumerable: false,
            value: methods[key]
        });
    }
})('undefined' !== typeof global ? global : window);
/*# sourceMappingURL=jsfix.js.map */