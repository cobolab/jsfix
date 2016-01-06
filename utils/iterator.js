(function ( jsroot ) {
    "use strict";

    /* Simple Object or Array Looper */
    class Looper {
        constructor ( oba ) {
            this.type   = 'object';
            this.items  = [];
            this.length = 0;
            this.cursor = 0;
            this.looper = false;

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
                        this.looper.call(this, item.key, item.value, this.next);
                    }
                    else {
                        this.looper.call(this, item, (this.cursor - 1), this.next);
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
            return new Looper(arg).each(fn);
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
