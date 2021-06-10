var textSize;

var stack = function () {
  this.count = 0;
  this.storage = {};

  this.reset = () => {
    this.count = 0;
    this.storage = {};
    Stack.innerHTML = "";
  };

  this.push = (value) => {
    this.storage[this.count] = value;
    this.count++;
    Stack.innerHTML = "";
    Height = wrapper.clientHeight;
    textSize = Height / this.count > 50 ? 25 : 25 * (Height / this.count / 50);
    for (var i = this.count - 1; i >= 0; i--) {
      var element = document.createElement("div");
      element.style.fontSize = `${textSize}px`;
      element.classList.remove("top");
      if (i == this.count - 1) {
        element.classList.add("top");
      }
      element.innerText = this.storage[i];
      Stack.appendChild(element);
    }
    return this.storage[this.count - 1];
  };

  this.pop = async () => {
    if (this.count === 0) return undefined;
    Stack.innerHTML = "";
    Height = wrapper.clientHeight;
    textSize = Height / this.count > 50 ? 25 : 25 * (Height / this.count / 50);
    var element = document.createElement("div");
    element.style.fontSize = `${textSize}px`;
    element.classList.add("toberemove");
    element.innerText = convertStack.peek();
    Stack.appendChild(element);
    this.count--;

    for (var i = convertStack.count - 1; i >= 0; i--) {
      var element = document.createElement("div");
      element.style.fontSize = `${textSize}px`;
      element.innerText = convertStack.storage[i];
      Stack.appendChild(element);
    }
    await sleep(500);
    var itemAtTop = this.storage[this.count];
    delete this.storage[this.count];
    return itemAtTop;
  };

  this.peek = () => {
    return this.storage[this.count - 1];
  };
};

var Stack = document.getElementById("stack");
var wrapper = document.getElementById("wrapper");
var input = document.getElementById("input");
var exp = document.getElementById("exp");
var resultText = document.getElementById("result");

convertStack = new stack();

function priority(operator) {
  if (operator === "^") {
    return 3;
  }
  if (operator === "*" || operator === "/") {
    return 2;
  }
  if (operator === "+" || operator === "-") {
    return 1;
  }
  if (operator === "(") {
    return 0;
  }
  return undefined;
}

exports.priority = priority;

expressions;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function infixToPostfix(infix) {
  infix = input.value;
  convertStack.reset();
  exp.innerHTML = "";
  for (i in infix) {
    var element = document.createElement("div");
    element.classList.add("expression");
    element.style.fontSize = `${textSize}px`;
    element.style.width = `7%`;
    element.id = `${i}`;
    element.innerText = infix[i];
    exp.appendChild(element);
  }
  postfix = "";
  expressions = document.getElementsByClassName("expression");
  for (i = 0; i < infix.length; i++) {
    for (ele of expressions) {
      ele.classList.remove("active");
    }
    var active = document.getElementById(`${i}`);
    console.log(active);
    active.classList.add("active");
    console.log(active.classList);

    if (infix[i] === "(") {
      convertStack.push(infix[i]);
    } else if (["+", "-", "*", "/", "^"].includes(infix[i])) {
      var pri = priority(infix[i]);
      while (pri <= priority(convertStack.peek())) {
        postfix += await convertStack.pop();
      }
      convertStack.push(infix[i]);
    } else if (infix[i] === ")") {
      while (convertStack.peek() !== "(") {
        postfix += await convertStack.pop();
      }
      await convertStack.pop();
    } else {
      postfix += infix[i];
    }
    resultText.innerText = postfix;
    await sleep(1500);
  }
  while (convertStack.count !== 0) {
    postfix += await convertStack.pop();
    resultText.innerText = postfix;
  }
  for (ele of expressions) {
    ele.classList.remove("active");
  }

  return postfix;
}

testExp = "(a+b)";
infixToPostfix(testExp);

exports.intopost = infixToPostfix;

function reverseExpression(exp) {
  reverse = "";
  for (var i = exp.length - 1; i >= 0; i--) {
    if (exp[i] == "(") {
      reverse += ")";
      continue;
    }
    if (exp[i] == ")") {
      reverse += "(";
      continue;
    }
    temp = "";
    while (exp[i] >= "0" && exp[i] <= "9") {
      temp += exp[i];
      i--;
    }
    if (temp !== "") {
      i++;
      reverse += temp.split("").reverse().join("");
      continue;
    }
    reverse += exp[i];
  }
  return reverse;
}

function infixToPrefix(infix) {
  reverseInfix = reverseExpression(infix);
  postfix = "";
  for (i in infix) {
    if (infix[i] === "(") {
      convertStack.push(infix[i]);
    } else if (["+", "-", "*", "/", "^"].includes(infix[i])) {
      var pri = priority(infix[i]);
      while (pri <= priority(convertStack.peek())) {
        postfix += convertStack.pop();
      }
      convertStack.push(infix[i]);
    } else if (infix[i] === ")") {
      while (convertStack.peek() !== "(") {
        postfix += convertStack.pop();
      }
      convertStack.pop();
    } else {
      postfix += infix[i];
    }
  }
  while (convertStack.count !== 0) {
    postfix += convertStack.pop();
  }
  prefix = reverseExpression(postfix);
  console.log(prefix);
}
