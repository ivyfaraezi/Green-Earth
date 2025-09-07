## 1. What is the difference between `var`, `let`, and `const`?

| Keyword | Scope            | Redeclaration | Reassignment | Hoisting Behavior               | Notes                                |
|---------|------------------|---------------|--------------|----------------------------------|--------------------------------------|
| `var`   | Function / Global| ✅ Allowed    | ✅ Allowed   | Hoisted with `undefined`         | Legacy usage                         |
| `let`   | Block            | ❌ Not allowed| ✅ Allowed   | Hoisted but in Temporal Dead Zone| Preferred for mutable variables      |
| `const` | Block            | ❌ Not allowed| ❌ Not allowed (except mutation) | Hoisted but in Temporal Dead Zone | Must be initialized at declaration |

Examples:
var x = 10;
var x = 20; // ✅ Allowed

let y = 10;
y = 20;     // ✅ Allowed
// let y = 30; // ❌ Error: Cannot redeclare

const z = 10;
// z = 20;     // ❌ Error: Cannot reassign

const arr = [1, 2];
arr.push(3); // ✅ Allowed (mutation)

## 2. What is the difference between map(), forEach(), and filter()?
**`map()`** - Returns a **new array** with the results of applying a function to each element. - Does not modify the original array. - Example: ```js const nums = [1, 2, 3]; const doubled = nums.map(n => n * 2); // doubled = [2, 4, 6] ```

## 3. What are arrow functions in ES6?
Arrow functions provide a concise syntax for writing functions.
They lexically bind this, inheriting it from the surrounding context.
Cannot be used as constructors (no new keyword).
Do not have their own arguments object.

// Traditional function
function add(a, b) {
  return a + b;
}
// Arrow function
const addArrow = (a, b) => a + b;

## 4. How does destructuring assignment work in ES6?
Destructuring allows unpacking values from arrays or objects into distinct variables.

Array Destructuring:
const arr = [10, 20, 30];
const [a, b] = arr;
console.log(a, b); // 10 20

Object Destructuring:
const person = { name: "Alice", age: 25 };
const { name, age } = person;
console.log(name, age); // Alice 25

## 5. What are template literals in ES6? How are they different from string concatenation?
Template literals use backticks (`) instead of quotes.
They support:

String interpolation using ${expression}

Multi-line strings without escape characters

Example:
const name = "Alice";
const age = 25;

const message = `My name is ${name} and I am ${age} years old.`;
console.log(message);
// Output: My name is Alice and I am 25 years old

Traditional Concatenation (Before ES6):
"My name is " + name + " and I am " + age + " years old.";

ES6 Template Literal:
`My name is ${name} and I am ${age} years old.`


