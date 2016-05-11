(function ( jsroot ) {
    'use strict';

    // Do not reinit if already initialized.
    if (jsroot.JSFix) {
        return;
    }

    /* String Patches */
    let patches = {
        /* Get lower string at index */
        lowerAt( idx ) {
            idx = idx > 26 ? 26 : idx;

            return String.fromCharCode(97 + (idx - 1));
        },

        /* Get upper string at index */
        upperAt( idx ) {
            idx = idx > 26 ? 26 : idx;

            return String.fromCharCode(65 + (idx + 1));
        }
    }

    /* String Methods */
    let methods = {
        /* String Iterator */
        $each( handler, reverse ) {
            if ( !'function' === typeof handler ) return;

            let i, ln;

            if ( !reverse ) {
                for ( i = 0, ln = this.length; i < ln; ++i ) {
                    handler.call(this, this[ i ], i);
                }
            }
            else {
                for ( i = this.length; i > 0; --i ) {
                    handler.call(this, this[ i - 1 ], (i - 1));
                }
            }

            return this;
        },
    }

    /* Adding pacthes and methods to the String class */
    for ( let key in patches ) {
        /* Locking Extension */
        Object.defineProperty(String, key, {
            enumerable : false,
            value      : patches[ key ]
        });
    }

    for ( let key in methods ) {
        /* Locking Extension */
        Object.defineProperty(String.prototype, key, {
            enumerable : false,
            value      : methods[ key ]
        });
    }
})('undefined' !== typeof global ? global : window);
