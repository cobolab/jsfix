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

##### **Path Getter and Setter**

An array and object path getter and setter.

**`obj.$get()`**

Get an object and array value using path.

**Usage**

```js
obj.$get(path, default);
```

* **path**      - String path (e.g: `a.b.c`)
* **default**   - Default value when the path value is undefined.

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
```

**`obj.$set()`**

Set an object and array value using path.

**Usage**

```js
obj.$set(path, value);
```

* **path**  - String path (e.g: `a.b.c`)
* **value** - Value to set to.

**Example**

```js
var obj = {},
    arr = [];
    
obj.$set('a.b.c', 100); // { a: { b: { c: 100 } } }
arr.$set('0.a.b', 100); // [ { a: { b: 100 } } ]
```


