# JSFix

A Lightweight Javascript Patches.
This paches is works for both NodeJS and Browser. This patches is created to support the Stater project.

## Helpers

#### Data Type

Data type helpers is a functions to validate the variable value type.

**Example**

```js
var str = 'A String',
    int = 'A Number';
    
console.log(isString(str)); // true
console.log(isString(int)); // false

console.log(isNumber(str)); // false
console.log(isNumber(int)); // true
```

**Methods**

**`isString()`**

Check does the variable value is a string.

**`isNumber()`**

Check does the variable value is a number.

**`isFunction()`**

Check does the variable value is a function.

**`isArray()`**

Check does the variable value is an array.

**`isObject()`**

Check does the variable value is an object and not an array.

**`isBoolean()`**

Check does the variable value is a boolean.

**`isDate()`**

Check does the variable value is a date.

**`isURL()`**

Check does the variable value is a URL.

**`isEmail()`**

Check does the variable value is a Email.

***
##### Iterator

A simple Object and Array iterator that wait until the `this.next()` function is executed to proceed the next items.

**Usage**

```js
forwait(object, handler);
```

**Example**

```js
// Iterating object.
forwait({ a: 1, b: 2, c: 3}, function(key, value) {
  console.log(key, value);
  
  this.next();
});

// Iterating array.
forwait([1, 2, 3], function(value, index) {
  console.log(value, index);
  
  this.next();
});
```

***
## Patches

#### Object Patches

Adding some methods to the `Object.prototype`.

##### **Direct Iterator**

**`obj.$each()` ,`arr.$each()`, `str.$each()`, and `num.$each()`**

A direct object iterator, with reversed support for iterating array, number and string.

**Usage**

```js
object.$each(handler, reversed);
```

**Example**

```js
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

##### **Path Helpers**

An array and object path helpers.

**`obj.$get()`**

Get an object and array value using path.

**Usage**

```js
obj.$get(path, default);
```

* **path**      - `Required` String path (e.g: `a.b.c`)
* **default**   - *`Optional`* Default value when the path value is undefined.

**Example**

```js
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

**`obj.$set()`**

Set an object and array value using path.

**Usage**

```js
obj.$set(path, value);
```

* **path**  - `Required` String path (e.g: `a.b.c`)
* **value** - `Required` Value to set to.

**Example**

```js
var obj = {},
    arr = [];
    
obj.$set('a.b.c', 100); // { a: { b: { c: 100 } } }
arr.$set('0.a.b', 100); // [ { a: { b: 100 } } ]
```

**`obj.$add()`**

Push an item into array in path.

**Usage**

```js
obj.$add(path, value);
```

* **path**  - `Required` String path.
* **value** - `Required` Value to set to.

**Example**

```js
var obj = { a: { b: { c: [] } } };

obj.$add('a.b.c', 'item'); // { a: { b: { c: [ 'item' ] } } }
```

**`obj.$del()`**

Array and Object path remover.

**Usage**

```js
obj.$del(path, length);
```

* **path**      - `Required` String path.
* **length**    - *`Optional`* The length of item to be removed. Only for array.
 
**Example**

```js
var obj = { a: { b: { c: [1,2,3], d: 1 } } };

obj.$del('a.b.d');      // Remove property "d"
obj.$del('a.b.c.0', 2); // Remove 1 and 2 from c.
```

**`obj.$dir()`**

Extract the paths from array or object.

**Usage**

```js
obj.$dir(exclude_root);
```

* **exclude_root** - *`Optional`* Does the root object or array is included.

**Example**

```js
var obj = { a: { b: { c: 3, d: 4 } } };

obj.$dir(true);     // { 'a.b.c': { type: 'number', body: 3 }, 'a.b.d': { type: 'number', body: 4 }
```

**`obj.$dif()`**

Compare two object (object to object, array to array).

**Usage**

```js
obj.$dif(target);
```

* **target** - `Required` Array or object to compare from.

**Example**

```js
var a = { a: 1, b: 2 },
    b = { a: 2, b: 1, c: 3 };
    
a.$dif(b);
/*
{ a: { old: 1, new: 2 },
  b: { old: 2, new: 1 },
  c: { old: undefined, new: 3 } }
*/

b.$dif(a);
/*
{ a: { old: 2, new: 1 },
  b: { old: 1, new: 2 },
  c: { old: 3, new: undefined } }
*/

```

**`obj.$join()`**

Recursively merge two objects or arrays (object to object, array to array).

**Usage**

```js
obj.$join(target, ignore);
```

* **target**    - `Required` Array or object to merge with.
* **ignore**    - *`Optional`** Array contains paths to ignore.

**Example**

```js
var a = { a: 1, b: 2 },
    b = { b: 1, c: 3 };

a.$join(b); { a: 1, b: 1, c: 3 }
```

**`obj.$sort()`**

Recursively sort object or array.

**Usage**

```js
obj.$sort(handler);
```

* **handler** - *`Optional`** - Function to handler the sorting.

**Example**

```js
var obj = { d: 4, b: 2, c: 3, a: 1 };

obj.$sort(); // { a: 1, b: 2, c: 3, d: 4 };
```

**`obj.$keys()`**

Direct Object.keys()

**Example**

```js
var obj = { a: 1, b: 2 };

obj.$keys(); // [ 'a', 'b' ]
```

**`obj.$group()`**

Group an array items with specific column per row.

**Usage**

```js
obj.$group(column, mode);
```

* **column**    - `Required` The number of columns per row.
* **mode**      - *`Optional`* The grouping mode (split or chunk). Default is chunk.

**Example**

```js
var arr = [ 1, 2, 3, 4, 5, 6, 7, 8 ];

arr.$group(3);          // [ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6 ] ]
arr.$group(3, 'split'); // [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8 ] ]
```

**`Number.random()`**

Generate random number.

**Example**

```js
Number.random(0, 10);
Number.random(4, 10);
```



