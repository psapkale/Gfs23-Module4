// const user = {};
// user.name = "John";
// user.surname = "Smith";
// user.name = "Pete";
// delete user.name;
// console.log(user);

// function isEmpty(obj) {
//    return Object.keys(obj).length === 0;
// }
// let schedule = {};
// console.log(isEmpty(schedule)); // true
// schedule["8:30"] = "get up";
// console.log(isEmpty(schedule)); // false

// let salaries = {
//    John: 100,
//    Ann: 160,
//    Pete: 130,
// };
// let sum = 0;
// for (const [_, v] of Object.entries(salaries)) {
//    sum += v;
// }
// console.log(sum);

let calculator = {
   a: 0,
   b: 0,
   read: function () {
      (a = 10), (b = 10);
   },
   sum: function () {
      return a + b;
   },
   mul: function () {
      return a * b;
   },
};

calculator.read();
console.log(calculator.sum());
console.log(calculator.mul());
