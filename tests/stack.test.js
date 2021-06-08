const stack = require("../scripts/stack");
var testStack;
test("Push works", () => {
  testStack = new stack();
  expect(testStack.push(1)).toBe(1);
});
test("Pop works", () => {
  testStack = new stack();
  testStack.push(1);
  testStack.push(2);
  expect(testStack.pop()).toBe(2);
});
test("Peek works", () => {
  testStack = new stack();
  testStack.push(1);
  testStack.push(2);
  expect(testStack.peek()).toBe(2);
});
