(function ( jsroot ) {
    "use strict";

    /* Simple Object or Array Looper */
    class Looper {
        constructor ( oba ) {
            this.type   = 'object';
            this.items  = [];
            this.length = 0;
            this.cursor = 0;

            this.looper = null;
            this.final  = null;
            this.error  = null;

            if ( 'object' === typeof oba && !Array.isArray(oba) ) {
                for ( var key in oba ) {
                    if ( oba.hasOwnProperty(key) ) {
                        this.items.push({ key : key, value : oba[ key ] });
                        this.length += 1;
                    }
                }
            }
            else if ( Array.isArray(oba) ) {
                this.type   = 'array';
                this.items  = oba;
                this.length = oba.length;
            }
        }

        next () {
            if ( 'function' === typeof this.looper ) {
                if ( this.cursor < this.length ) {
                    /* Getting Next Item */
                    var item = this.items[ this.cursor ];

                    /* Increase cursor */
                    this.cursor += 1;

                    /* Call the loop handler */
                    if ( this.type === 'object' ) {
                        this.looper.call(this, item.key, item.value, this);
                    }
                    else {
                        this.looper.call(this, item, (this.cursor - 1), this);
                    }
                }
                else if ( this.cursor === this.length ) {
                    if ( 'function' === typeof this.final ) {
                        this.final.call(this);
                    }
                }
            }

            return this;
        }

        each ( fn ) {
            if ( 'function' === typeof fn ) {
                /* Save loop handler */
                this.looper = fn;

                /* Run looper */
                this.next();
            }

            return this;
        }

        then ( fn ) {
            if ( 'function' === typeof fn ) {
                this.final = fn;
            }

            return this;
        }

        break ( fn ) {
            if ( 'function' === typeof fn ) {
                this.error = fn;
            }
            else {
                if ( 'function' === typeof this.error ) {
                    this.error.call(this);
                }
            }

            return this;
        }
    }

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
        forwait( arg, fn ) {
            // Create new looper instance.
            var looper = new Looper(arg);

            // Perform looping.
            looper.each(fn);

            // Return the looper object to enable chaining.
            return looper;
        }
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
