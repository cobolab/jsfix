# JSFix

#### v1.2.0

A Lightweight Javascript Patches.

This paches is works for both NodeJS and Browser. This patches is created to support the Stater project.

## Helpers

### Public Methods

#### **Data Type**

Data type helpers is a functions to validate the variable value type.

**Example**

``` js
var str = 'A String',
    int = 'A Number';

console.log(isString(str)); // true
console.log(isString(int)); // false

console.log(isNumber(str)); // false
console.log(isNumber(int)); // true
```

**`isDefined()`**

**`isUndefined()`**

Check does the function argument is defined.

**`isNull()`**

**`isNotNull()`**

Check does the variable value is null.

**`isString()`**

**`isNotString()`**

Check does the variable value is a string.

**`isNumber()`**

**`isNotNumber()`**

Check does the variable value is a number.

**`isFunction()`**

**`isNotFunction()`**

Check does the variable value is a function.

**`isArray()`**

**`isNotArray()`**

Check does the variable value is an array.

**`isObject()`**

**`isNotObject()`**

Check does the variable value is an object and not an array.

**`isBoolean()`**

**`isNotBoolean()`**

Check does the variable value is a boolean.

**`isDate()`**

**`isNotDate()`**

Check does the variable value is a date.

**`isURL()`**

**`isNotURL()`**

Check does the variable value is a URL.

**`isEmail()`**

**`isNotEmail()`**

Check does the variable value is a Email.

**`isArguments()`**

**`isNotArguments()`**

Check does the variable value is an function Arguments.

**`isError()`**

**`isNotError()`**

Check does the variable value is an error object.

**`isJSON()`**

**`isNotJSON()`**

Check does the variable value is a valid JSON object.

**`isJSONString()`**

**`isNotJSONString()`**

Check does the variable value is a valid JSON string.

**`isRegExp()`**

**`isNotRegExp()`**

Check does the variable value is a RegExp.

**`isEmpty()`**

**`isNotEmpty()`**

Check does the variable value is empty. Value can be Object, Array, and String.

#### **Utilities**

#### **`$dext()`**

Assign new prototypes to Javascript objects.

**Example**

``` js
$dext(Object, 'keys', function() { return Object.keys(this); }); // Assign prototype to Object.
$dest(String, 'keys', function() { return this.split(''); });    // Assign prototype to String.

console.log('String'.keys()); // ['S', 't', 'r', 'i', 'n', 'g']
```

***

#### **`$dget()`**

Define getter to Javascript objects.

**Example**

``` js
var x = { a: 1, b: 2 };

$dget(x, 'c', function() { return 'Value of c is: 3' });

console.log(x.c); // Value of c is: 3
```

***

#### **`$dset()`**

Define setter to Javascript objects.

**Example**

``` js
var x = { a: 1, b: 2 };

$dset(x, 'c', function(value) { this._values.c = (value * 2) });

x.c = 10;

console.log(x._values.c); // 20
```

***

### Iterator

A simple Object and Array iterator that wait until the `this.next()` function is executed to proceed the next items.

**Usage**

``` js
forwait(object, handler).then(fn).break(fn);
```

**Example**

``` js
// Iterating object.
forwait({ a: 1, b: 2, c: 3}, function(key, value) {
  console.log(key, value);

  this.next();
});

// Iterating array.
forwait([1, 2, 3, 4], function(value, index) {
  console.log(value, index);

  if (value === 3) {
    // Stop iteration.
    this.break();
  else {
    // Next item.
    this.next();
  }
})
// Call function after iteration completed.
.then(function() {
  console.log('Iteration completed');
})
// Call function when iteration stopped.
.break(funtion() {
  console.log('Iteration stopped.');
});
```

***

## Patches

### Object Patches

Adding some methods to the `Object.prototype`.

#### **Direct Iterator**

#### **`obj.$each()`, `arr.$each()`, `str.$each()`, and `num.$each()`**

A direct object iterator, with reversed support for iterating array, number and string.

**Usage**

``` js
object.$each(handler, reversed);
```

**Example**

``` js
var obj = { a: 1, b: 2, c: 3},
    arr = [ 1, 2, 3 ],
    str = 'String',
    num = 10;

// Iterating object.
obj.$each(function(key, value) {
  console.log(key, value);
});

// Iterating array.
arr.$each(function(value, index) {
  console.log(value, index);
});

// Iterating string
str.$each(function(value, index) {
  console.log(value, index);
});

// Iterating number.
num.$each(function(value) {
  console.log(value);
});

// Reversed iterating array.
arr.$each, function(value, index) {
  console.log(value, index);
}, true);
```

#### **Path Helpers**

An array and object path helpers.

#### **`obj.$get()`** **[browser: `obj.$gets()`]**

Get an object and array value using path.

**Usage**

``` js
obj.$get(path, default);
```

* **path**      - `Required` String path (e.g: `a.b.c`)
* **default**   - *`Optional`* Default value when the path value is undefined.

**Example**

``` js
var obj = { 
  a: 1,
  b: 2, 
  c: {
    ca: 1,
    cb: {
      cba: 1,
      cbb: 2
    }
  }
}

var arr = [ 'a', 'b', { a: 1, b: 2 } ]

console.log(obj.$get('a.aa'));       // undefined
console.log(obj.$get('c.cb.cba'));   // 1
console.log(obj.$get('c.cc', 10));   // 10 since the value is undefined.

console.log(arr.$get('0.d'));        // undefined
console.log(arr.$get('2.a'));        // 1
```

***

#### **`obj.$set()`** **[browser: `obj.$sets()`]**

Set an object and array value using path.

**Usage**

``` js
obj.$set(path, value);
```

* **path**  - `Required` String path (e.g: `a.b.c`)
* **value** - `Required` Value to set to.

**Example**

``` js
var obj = {},
    arr = [];

obj.$set('a.b.c', 100); // { a: { b: { c: 100 } } }
arr.$set('0.a.b', 100); // [ { a: { b: 100 } } ]
```

***

#### **`obj.$add()`** **[browser: `obj.$adds()`]**

Push an item into array in path.

**Usage**

``` js
obj.$add(path, value);
```

* **path**  - `Required` String path.
* **value** - `Required` Value to set to.

**Example**

``` js
var obj = { a: { b: { c: [] } } };

obj.$add('a.b.c', 'item'); // { a: { b: { c: [ 'item' ] } } }
```

***

#### **`obj.$del()`** **[browser: `obj.$dels()`]**

Array and Object path remover.

**Usage**

``` js
obj.$del(path, length);
```

* **path**      - `Required` String path.
* **length**    - *`Optional`* The length of item to be removed. Only for array.

**Example**

``` js
var obj = { a: { b: { c: [1,2,3], d: 1 } } };

obj.$del('a.b.d');      // Remove property "d"
obj.$del('a.b.c.0', 2); // Remove 1 and 2 from c.
```

***

#### **`obj.$dir()`** **[browser: `obj.$dirs()`]**









Extract the paths from array or object.

**Usage**

``` js
obj.$dir(exclude_root);
```

* **exclude_root** - *`Optional`* Does the root object or array is included.

**Example**

``` js
var obj = { a: { b: { c: 3, d: 4 } } };

obj.$dir(true);     // { 'a.b.c': { type: 'number', body: 3 }, 'a.b.d': { type: 'number', body: 4 }
```

***

#### **`obj.$diff()`** **[browser: `obj.$diffs()`]**

Compare two object (object to object, array to array).

**Usage**

``` js
obj.$diff(target);
```

* **target** - `Required` Array or object to compare from.

**Example**

``` js
var a = { a: 1, b: 2 },
    b = { a: 2, b: 1, c: 3 };

a.$diff(b);
/*
{ a: { old: 1, new: 2 },
  b: { old: 2, new: 1 },
  c: { old: undefined, new: 3 } }
*/

b.$diff(a);
/*
{ a: { old: 2, new: 1 },
  b: { old: 1, new: 2 },
  c: { old: 3, new: undefined } }
*/
```

***

#### **`obj.$join()`**

Recursively merge two objects or arrays (object to object, array to array).

**Usage**

``` js
obj.$join(target, ignore);
```

* **target**    - `Required` Array or object to merge with.
* **ignore**    - *`Optional`** Array contains paths to ignore.

**Example**

``` js
var a = { a: 1, b: 2 },
    b = { b: 1, c: 3 };

a.$join(b); { a: 1, b: 1, c: 3 }
```

***

#### **`obj.$sort()`** **[browser: `obj.$sorts()`]**

Recursively sort object or array.

**Usage**

``` js
obj.$sorts(handler);
```

* **handler** - *`Optional`** - Function to handler the sorting.

**Example**

``` js
var obj = { d: 4, b: 2, c: 3, a: 1 };

obj.$sort(); // { a: 1, b: 2, c: 3, d: 4 };
```

***

#### **`obj.$keys()`**





Direct Object.keys()

**Example**

``` js
var obj = { a: 1, b: 2 };

obj.$keys(); // [ 'a', 'b' ]
```

***

#### **`obj.$group()`** **[browser: `obj.$groups()`]**

Group an array items with specific column per row.

**Usage**

``` js
obj.$group(column, mode);
```

* **column**    - `Required` The number of columns per row.
* **mode**      - *`Optional`* The grouping mode (split or chunk). Default is chunk.

**Example**

``` js
var arr = [ 1, 2, 3, 4, 5, 6, 7, 8 ];

arr.$group(3);          // [ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6 ] ]
arr.$group(3, 'split'); // [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8 ] ]
```

***

#### **`obj.$extend()`**

Extend the already defined object and array prototypes.

**Usage**

``` js
obj.$extend(name, handler);
```

* **`name`**    - String prototype name, or object contains `key` as name and `value` as handler.
* **`handler`** - Function to handle the prototype call.

**Example**

``` js
var x = { a: 1, b: 2 }

x.$extend('keys', function() { return Object.keys(this); });

console.log(x.keys()); // ['a', 'b']
```

***

#### **`Number.random()`**

Generate random number.

**Example**

``` js
Number.random(0, 10);
Number.random(4, 10);
```

***

### Changelog

#### v1.3.1 - Apr 23, 2016

* Fixing error when using `readable-stream`

#### v1.3.0 - Mar 17, 2016

* Object methods changes: **`$gets`, `$sets`, `$adds`, `$dels`, `$diffs`, `$sorts`, and `$groups`** only for browser. NodeJS users will use `.$get()`, `.$set()`, and so on.
* Changed **`.$ext()`** to **`.$extend()`**
* Changed **`.$dif()`** to **`.$diff()`**

#### v1.2.1 - Feb 20, 2016

* Fixing wrong dependency.

#### v1.2.0 - Feb 17, 2016

* Changed **`$get`** to **`$gets`** due to conflict with angular.
* Chagned **`$set`** to **`$sets`** due to conflict with angular.
* Changed **`$add`** to **`$adds`** due to conflict with angular.
* Changed **`$del`** to **`$dels`** due to conflict with angular.
* Changed **`$dirs`** to **`$dirs`** due to conflict with angular.
* Changed **`$dif`** to **`$difs`** due to conflict with angular.
* Changed **`$sort`** to **`$sorts`** due to conflict with angular.
* Changed **`$group`** to **`$groups`** due to conflict with angular.