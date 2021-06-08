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
userstack = new stack();

var Stack = document.getElementById("stack");
var wrapper = document.getElementById("wrapper");
var input = document.getElementById("input");

if (userstack.count === 0) {
  console.log("Stack empty");
  Stack.innerHTML =
    '<p style="color:black; width: 200px; transform: translateX(-25%);">Stack empty</p>';
} else {
  Stack.innerHTML = "";
  Height = wrapper.clientHeight;
  console.log(Height);
  textSize =
    Height / userstack.count > 50 ? 25 : 25 * (Height / userstack.count / 50);
  for (var i = userstack.count - 1; i >= 0; i--) {
    var element = document.createElement("div");
    element.style.fontSize = `${textSize}px`;
    element.innerText = userstack.storage[i];
    Stack.appendChild(element);
    console.log(i);
  }
}

function addStackElement() {
  if (input.value === "") return;
  userstack.push(input.value);
  if (userstack.count === 0) {
    console.log("Stack empty");
    Stack.innerHTML =
      '<p style="color:black; width: 200px; transform: translateX(-25%);">Stack empty</p>';
  } else {
    Stack.innerHTML = "";
    Height = wrapper.clientHeight;
    console.log(Height);
    textSize =
      Height / userstack.count > 50 ? 25 : 25 * (Height / userstack.count / 50);
    for (var i = userstack.count - 1; i >= 0; i--) {
      var element = document.createElement("div");
      element.style.fontSize = `${textSize}px`;
      element.classList.remove("top");
      if (i == userstack.count - 1) {
        element.classList.add("top");
      }
      element.innerText = userstack.storage[i];
      Stack.appendChild(element);
      console.log(i);
    }
  }
  input.value = "";
}

function removeStackElement() {
  removed = userstack.pop();

  if (userstack.count === 0) {
    console.log("Stack empty");
    Stack.innerHTML =
      '<p style="color:black; width: 200px; transform: translateX(-25%);">Stack empty</p>';
  } else {
    Stack.innerHTML = "";
    Height = wrapper.clientHeight;
    textSize =
      Height / userstack.count > 50 ? 25 : 25 * (Height / userstack.count / 50);
    var element = document.createElement("div");
    element.style.fontSize = `${textSize}px`;
    element.classList.add("toberemove");
    element.innerText = removed;
    Stack.appendChild(element);
    for (var i = userstack.count - 1; i >= 0; i--) {
      var element = document.createElement("div");
      element.style.fontSize = `${textSize}px`;
      element.innerText = userstack.storage[i];
      Stack.appendChild(element);
      console.log(i);
    }
  }
}
module.exports = stack;
