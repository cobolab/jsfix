(function ( jsroot ) {
    'use strict';

    /**
     * Prototype Extender
     * Add new prototype to a Javascript Object Prototype.
     *
     * @param target    - Javascript object. E.g: Object, Array, String.
     * @param name      - String prototype name. E.g: getChild
     * @param handler   - Function to handle the prototype.
     * @constructor
     */
    jsroot.$dext = ProrotypeExtender;

    function ProrotypeExtender ( target, name, handler ) {
        if ( target && isString(name) && isFunction(handler) ) {
            Object.defineProperty(target.prototype, name, {
                enumerable : false,
                writable   : true,
                value      : handler
            });
        }
    }

    /**
     * Define Getter to a Javascript object.
     *
     * @param target    - Javascript Object.
     * @param name      - String property name.
     * @param handler   - Function to handle the getter.
     * @constructor
     */
    jsroot.$dget = DefineGetter;

    function DefineGetter ( target, name, handler ) {
        if ( target && isString(name) && isFunction(handler) ) {
            Object.defineProperty(target, name, {
                get : handler
            });
        }
    }

    /**
     * Define Setter to a Javascript object.
     *
     * @param target    - Javascript Object.
     * @param name      - String property name.
     * @param handler   - Function to handle the setter.
     * @constructor
     */
    jsroot.$dset = DefineSetter;

    function DefineSetter ( target, name, handler ) {
        if ( target && isString(name) && isFunction(handler) ) {
            Object.defineProperty(target, name, {
                set : handler
            });
        }
    }

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
        $get : function ( path, defvalue ) {
            if ( !'string' === typeof path ) return;

            /* Define current scope, paths list, result and done status */
            var current = this, paths = path.split(this.__delimiter || '.'), result, done;

            /* Iterate deeply until done */
            while ( !done && paths.length > 0 ) {
                /* Define next object */
                var next = paths[ 0 ];

                if ( paths.length <= 1 ) {
                    /* Check last path and adding result if exist */
                    if ( 'undefined' !== typeof current[ next ] ) {
                        result = current[ next ];
                    }
                    else {
                        result = undefined;
                        done   = true;
                    }
                }
                else {
                    /* Continue if next target is exist */
                    if ( 'object' === typeof current[ next ] ) {
                        /* Update current scope */
                        current = current[ next ];
                    }

                    /* Escape in first not found */
                    else {
                        result = undefined;
                        done   = true;
                    }
                }

                /* Define next path by slicing the paths list */
                paths = paths.slice(1);
            }

            /* Return default value if the given path is undefined, and the default value is defined */
            if ( typeof result === 'undefined' && typeof defvalue !== 'undefined' ) {
                return defvalue;
            }

            /* Returning the result */
            return result;
        },

        // Define getter.
        $dget : function ( name, handler ) {
            $dget(this, name, handler);

            return this;
        },

        /**
         * Path Value Setter
         * This function will set object value by the give path and value.
         *
         * @param path {string} - String path. E.g: 'people.address'.
         * @param value {any}   - The value to be set to the path.
         * @returns {object}
         */
        $set : function ( path, value ) {
            if ( !'string' === typeof path ) return;

            /* Define current scope and paths list */
            var current = this, paths = path.split(this.__delimiter || '.');

            /* Iterate scopes until done */
            while ( paths.length > 0 ) {
                /* Define next target */
                var next = paths[ 0 ];

                /* Apply the value if current path is the last path */
                if ( paths.length <= 1 ) {
                    current[ next ] = value;
                    current         = current[ next ];
                }
                /* Continue to iterate if still have next path */
                else {
                    if ( 'object' === typeof current[ next ] ) {
                        /* Use next scope if exist and updating current scope */
                        current = current[ next ];
                    }
                    else {
                        /* Create next scope if not exist and updating current scope */
                        current[ next ] = {};
                        current         = current[ next ];
                    }
                }

                /* Define next path by slicing paths list */
                paths = paths.slice(1);
            }

            /* Return the object it self */
            return this;
        },

        // Define setter.
        $dset : function ( name, handler ) {
            $dset(this, name, handler);

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
        $add : function ( path, value ) {
            if ( Array.isArray(this.$get(path)) ) {
                var current = this, paths = path.split(this.__delimiter || '.');

                while ( paths.length > 0 ) {
                    current = current[ paths[ 0 ] ];
                    paths   = paths.slice(1);
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
        $del : function ( path, length ) {
            /* Define current scope, paths list and done stat */
            var current = this, paths = path.split(this.__delimiter || '.'), done;

            /* Iterate each path until done */
            while ( !done && paths.length > 0 ) {
                /* Define next path */
                var next = paths[ 0 ];

                /* Last iteration */
                if ( paths.length <= 1 ) {
                    /* Delete target using object/array method if exist */
                    if ( current[ next ] ) {
                        if ( Array.isArray(current) ) {
                            current.splice(next, length || 1);
                        }
                        else {
                            delete current[ next ];
                        }
                    }
                }
                else {
                    if ( 'object' === typeof current[ next ] ) {
                        /* Update current scope if next target is exist */
                        current = current[ next ];
                    }
                    else {
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
        $dir : function ( noroot ) {
            /* Define current path scope and path list */
            var current = '', maps = {};

            /* Perform Extract */
            extract(this);

            /* Creating Extractor */
            function extract ( target ) {
                /* Iterating each items and properties */
                target.$each(function ( a, b ) {
                    /* Copy last path */
                    var last = current;

                    /* Defining key and value by checking the target type */
                    var key = Array.isArray(target) ? b : a,
                        val = Array.isArray(target) ? a : b;

                    /* Creating new path */
                    var path = current + (!current ? '' : '.') + key;

                    /* Adding path to maps */
                    if ( 'object' === typeof val ) {
                        if ( !noroot ) {
                            maps[ path ] = {
                                type : Array.isArray(val) ? 'array' : typeof val,
                                body : val
                            };
                        }
                    }
                    else {
                        maps[ path ] = {
                            type : typeof val,
                            body : val
                        };
                    }

                    /* Extract child scope if the current scope is object or array */
                    if ( 'object' === typeof val ) {
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
        $diff : function ( from ) {
            /* Return zero result if the object source and the object type is not equal. */
            if ( Array.isArray(this) && !Array.isArray(from) ) return {};
            if ( Array.isArray(from) && !Array.isArray(this) ) return {};

            // Creating result.
            var dif = {};

            if ( 'object' === typeof from ) {
                // Parsing the both object paths.
                var cur = this.$dir(true);
                var src = from.$dir(true);

                // Change the iterated items to the higher length.
                var trg = cur;

                if ( src.$keys().length >= cur.$keys().length ) trg = src;

                // Iterating each path to match the value.
                trg.$each(( key, val ) => {
                    if ( this.$get(key) !== from.$get(key) ) {
                        dif[ key ] = { old : this.$get(key), new : from.$get(key) };
                    }
                });
            }

            return dif;
        },

        // Deprecating.
        $dif : function ( from ) {
            return this.$diff(from);
        },

        /**
         * Object and array iterator.
         * This function is used to iterate properties in object, or items in array.
         *
         * @param handler {function} - Function to handle each item.
         * @param reverse {boolean}  - Does the iteration should reversed (desc).
         * @returns {patches}
         */
        $each : function ( handler, reverse ) {
            if ( !'function' === typeof handler ) return;

            /* Decide to use Array iterator or Object iterator */
            if ( Array.isArray(this) ) {
                var i, ln;

                if ( !reverse ) {
                    /* Iterating each items */
                    for ( i = 0, ln = this.length; i < ln; ++i ) {
                        /* Apply this object to the handler */
                        handler.call(this, this[ i ], i);
                    }
                }
                else {
                    for ( i = this.length; i > 0; --i ) {
                        handler.call(this, this[ (i - 1) ], (i - 1));
                    }
                }
            }
            else {
                /* Iterating each properties */
                for ( var key in this ) {
                    if ( this.hasOwnProperty(key) ) {
                        /* Apply this object to the handler */
                        handler.call(this, key, this[ key ]);
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
        $join : function ( sources, ignore ) {
            /* Skip if sources is not an object or array */
            if ( !'object' === typeof sources ) return;

            /* Wrap source to array if not an array */
            if ( 'object' === typeof sources && !Array.isArray(sources) ) {
                sources = [ sources ];
            }

            /* Create new array if ignore is not an array */
            if ( !Array.isArray(ignore) ) ignore = [];

            /* Creating target holder and target maps */
            var main = this, self = this.$dir();

            /* Iterate each sources */
            for ( var i = 0; i < sources.length; ++i ) {
                /* Creating source holder and source maps */
                var base = sources[ i ], next = base.$dir(), igm = '??';

                /* Continue if type of target is equal to type of source */
                if ( (Array.isArray(main) && Array.isArray(base)) || (!Array.isArray(main) && !Array.isArray(base)) ) {
                    /* Iterate each maps to do merge */
                    next.$each(function ( path, value ) {
                        /* Return if path is ignored */
                        if ( ignore.indexOf(path) > -1 ) {
                            igm = path + '.';

                            return;
                        }

                        /* Ignore childs from first ignored path */
                        if ( (igm + path.split(igm)[ 1 ]) === path ) {
                            return;
                        }
                        else {
                            igm = '??';
                        }

                        /* Create new property if not exist */
                        if ( !self[ path ] ) {
                            main.$set(path, value.body);
                        }
                        else {
                            /* Replace with new value if type of next target value is different with type of next target value */
                            if ( self[ path ].type !== value.type ) {
                                main.$set(path, value.body);
                            }
                            else {
                                /* Replace if type of next target is not object or array */
                                if ( value.type !== 'object' && value.type !== 'array' ) {
                                    main.$set(path, value.body);
                                }
                            }
                        }
                    });
                }
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
        $sort : function ( handler ) {
            /* Perform Sorting */
            return sort(this);

            /* Creating Sorter */
            function sort ( target ) {
                /* Creating result */
                var result;

                /* Array Sorter */
                if ( Array.isArray(target) ) {
                    /* Create array as result */
                    result = [];

                    /* Sort and iterate each item in target to sort the childs before adding to result */
                    target.sort(handler).$each(function ( value, i ) {
                        if ( 'object' !== typeof value ) {
                            /* Add to result if child is not object or array */
                            result[ i ] = value;
                        }
                        else {
                            /* Sort child before adding to result */
                            result[ i ] = sort(value);
                        }
                    });
                }

                /* Object Sorter */
                else {
                    /* Create object as result */
                    result = {};

                    /* Create target keys list to perform sort and iterate eachitem to sort the childs before adding to result */
                    Object.keys(target).sort(handler).$each(function ( key ) {
                        /* Creating child from target */
                        var value = target[ key ];

                        if ( 'object' !== typeof value ) {
                            /* Add to result if child is not object or array */
                            result[ key ] = value;
                        }
                        else {
                            /* Sort child before adding to result */
                            result[ key ] = sort(value);
                        }
                    });

                    /* Delete all properties from target */
                    target.$each(function ( key ) {
                        delete target[ key ];
                    });

                    /* Apply sorted properties to target */
                    result.$each(function ( key, value ) {
                        target[ key ] = value;
                    });
                }

                /* Return the target it self */
                return target;
            }
        },

        /* Object.keys wrapper */
        $keys : function () {
            if ( !Array.isArray(this) ) {
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
        $group : function ( column, mode ) {
            if ( !Array.isArray(this) || !'number' === typeof column ) return;

            /* Create group and current index */
            var group = [],
                currn = 0;

            /* Prepare Columns */
            (column - 1).$each(function ( i ) {
                group.push([]);
            });

            /* Start Grouping */
            if ( mode === 'split' ) {
                var gpn = Math.ceil(this.length / column),
                    crg = 1;

                this.$each(function ( val ) {
                    group[ currn ].push(val);

                    if ( crg === gpn ) {
                        crg = 1;
                        currn++;
                    }
                    else {
                        crg++;
                    }
                });
            }
            else if ( mode === 'chunk' ) {
                /* Create child group */
                var childGroup = [];

                /* Reset parent group */
                group = [];

                this.$each(function ( val, i ) {
                    /* Push current value to child group */
                    childGroup.push(val);

                    if ( currn === (column - 1) || i === (this.length - 1) ) {
                        /* Add child group to parent group */
                        group.push(childGroup);

                        /* Reste child group */
                        childGroup = [];

                        /* Reset child index */
                        currn = 0;
                    }
                    else {
                        /* Increase child index */
                        currn++;
                    }
                });
            }
            else {
                this.$each(function ( val ) {
                    /* Push value to current child */
                    group[ currn ].push(val);

                    if ( currn === (column - 1) ) {
                        /* Reset current child index */
                        currn = 0;
                    }
                    else {
                        /* Increase current child index */
                        currn++;
                    }
                });
            }

            return group;
        },

        /**
         * Prototype Extender
         * Create new prototype methods to the current object/array.
         *
         * @param name
         * @param handler
         * @returns {Object}
         */
        $extend : function ( name, handler ) {
            if ( isString(name) && isFunction(handler) ) {
                Object.defineProperty(this.constructor.prototype, name, {
                    enumerable : false,
                    value      : handler
                });
            }
            else if ( isObject(name) ) {
                name.$each(function ( name, handler ) {
                    this.$extend(name, handler);
                });
            }

            return this;
        },

        // Deprecating.
        $ext : function ( name, handler ) {
            return this.$extend(name, handler);
        }
    }

    /* Applying Object Extensions */
    for ( var key in patches ) {
        /* Locking Extension */
        Object.defineProperty(Object.prototype, key, {
            enumerable : false,
            value      : patches[ key ]
        });
    }
})('undefined' !== typeof global ? global : window);