const polish = require("../scripts/polishconverter");
const priority = polish.priority;
const intopost = polish.intopost;

test("Priority function test", () => {
  expect(priority("^")).toBe(3);
  expect(priority("/")).toBe(2);
  expect(priority("+")).toBe(1);
});

test("Postfix conversion test", () => {
  expect(intopost("(a-b/c)*(a/k-l)")).toBe("abc/-ak/l-*");
});
