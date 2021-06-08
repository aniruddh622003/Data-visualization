var stack = function () {
  this.count = 0;
  this.storage = {};

  this.push = (value) => {
    this.storage[this.count] = value;
    this.count++;
    return this.storage[this.count - 1];
  };

  this.pop = () => {
    if (this.count === 0) return undefined;
    this.count--;
    var itemAtTop = this.storage[this.count];
    delete this.storage[this.count];
    return itemAtTop;
  };

  this.peek = () => {
    return this.storage[this.count - 1];
  };
};
testStack = new stack();
// testStack.push(1);
// testStack.push(2);
// testStack.push(3);
console.log(testStack);

var Stack = document.getElementById("stack");
var wrapper = document.getElementById("wrapper");
var input = document.getElementById("input");

if (testStack.count === 0) {
  console.log("Stack empty");
  Stack.innerHTML =
    '<p style="color:black; width: 200px; transform: translateX(-25%);">Stack empty</p>';
} else {
  Stack.innerHTML = "";
  Height = wrapper.clientHeight;
  console.log(Height);
  textSize =
    Height / testStack.count > 50 ? 25 : 25 * (Height / testStack.count / 50);
  for (var i = testStack.count - 1; i >= 0; i--) {
    var element = document.createElement("div");
    element.style.fontSize = `${textSize}px`;
    element.innerText = testStack.storage[i];
    Stack.appendChild(element);
    console.log(i);
  }
}

function addStackElement() {
  if (input.value === "") return;
  testStack.push(input.value);
  if (testStack.count === 0) {
    console.log("Stack empty");
    Stack.innerHTML =
      '<p style="color:black; width: 200px; transform: translateX(-25%);">Stack empty</p>';
  } else {
    Stack.innerHTML = "";
    Height = wrapper.clientHeight;
    console.log(Height);
    textSize =
      Height / testStack.count > 50 ? 25 : 25 * (Height / testStack.count / 50);
    for (var i = testStack.count - 1; i >= 0; i--) {
      var element = document.createElement("div");
      element.style.fontSize = `${textSize}px`;
      element.classList.remove("top");
      if (i == testStack.count - 1) {
        element.classList.add("top");
      }
      element.innerText = testStack.storage[i];
      Stack.appendChild(element);
      console.log(i);
    }
  }
  input.value = "";
}

function removeStackElement() {
  removed = testStack.pop();
  if (testStack.count === 0) {
    console.log("Stack empty");
    Stack.innerHTML =
      '<p style="color:black; width: 200px; transform: translateX(-25%);">Stack empty</p>';
  } else {
    Stack.innerHTML = "";
    Height = wrapper.clientHeight;
    textSize =
      Height / testStack.count > 50 ? 25 : 25 * (Height / testStack.count / 50);
    var element = document.createElement("div");
    element.style.fontSize = `${textSize}px`;
    element.classList.add("toberemove");
    element.innerText = removed;
    Stack.appendChild(element);
    for (var i = testStack.count - 1; i >= 0; i--) {
      var element = document.createElement("div");
      element.style.fontSize = `${textSize}px`;
      element.innerText = testStack.storage[i];
      Stack.appendChild(element);
      console.log(i);
    }
  }
}
module.exports = stack;
