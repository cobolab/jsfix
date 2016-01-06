/**
 * Javascript Pathces
 * This pathces will add some methods to the native classes. This patches contains alot useful methods
 * to help developers working with javascript.
 *
 * © 2015 - 2016 Nanang Mahdaen El Agung.
 * This script is licensed under MIT license.
 */
(function ( jsroot ) {
    'use strict';

    /* PATCHES */
    /* ====================================== */
    require('./utils/obj-patches');
    require('./utils/str-patches');
    require('./utils/int-patches');

    /* HELPERS */
    /* ====================================== */
    require('./utils/iterator');
    require('./utils/data-type');

    // Add JSFix to the global object as a marker that JSFix is istalled.
    jsroot.JSFix = true;
})('undefined' !== typeof global ? global : window);