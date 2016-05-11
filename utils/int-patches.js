(function ( jsroot ) {
    'use strict';

    // Do not reinit if already initialized.
    if (jsroot.JSFix) {
        return;
    }

    /* Number Patches */
    let patches = {
        /* Generate Random Number Between Two Number */
        random( start, end ) {
            return Math.floor(Math.random() * (end - start + 1)) + start;
        }
    }

    /* Number Methods */
    let methods = {
        /* Number Iterator */
        $each( handler, reverse ) {
            if ( !'function' === typeof handler ) return;

            var i;

            if ( !reverse ) {
                for ( i = 0; i <= this; ++i ) {
                    handler.call(this, i);
                }
            }
            else {
                for ( i = this; i >= 0; --i ) {
                    handler.call(this, i);
                }
            }

            return this;
        }
    }

    /* Adding pacthes and methods to the Number class */
    for ( let key in patches ) {
        /* Locking Extension */
        Object.defineProperty(Number, key, {
            enumerable : false,
            value      : patches[ key ]
        });
    }

    for ( let key in methods ) {
        /* Locking Extension */
        Object.defineProperty(Number.prototype, key, {
            enumerable : false,
            value      : methods[ key ]
        });
    }
})('undefined' !== typeof global ? global : window);
