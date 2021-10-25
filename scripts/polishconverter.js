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
    await sleep(1000);
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

function reverseExpression(exp) {
  var str = "";
  var end = exp.length - 1;
  while (end >= 0) {
    str += exp[end];
    end--;
  }
  return str;
}

async function infixToPrefix(infix) {
  infix = input.value;
  var len = infix.length;
  revinfix = reverseExpression(infix);
  let inarr = revinfix.split("");
  for (var i = 0; i < len; i++) {
    if (inarr[i] == "(") {
      inarr[i] = ")";
    } else if (inarr[i] == ")") {
      inarr[i] = "(";
    }
    i++;
  }
  revinfix = inarr.join("");
  console.log(revinfix);

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
  for (
    i = 0, revi = infix.length - 1;
    i < infix.length, revi >= 0;
    i++, revi--
  ) {
    for (ele of expressions) {
      ele.classList.remove("active");
    }
    var active = document.getElementById(`${revi}`);
    active.classList.add("active");
    console.log(revinfix[i]);
    if (revinfix[i] === "(") {
      console.log("work");
      convertStack.push(revinfix[i]);
    } else if (["+", "-", "*", "/", "^"].includes(revinfix[i])) {
      var pri = priority(revinfix[i]);
      while (pri <= priority(convertStack.peek())) {
        postfix = (await convertStack.pop()) + postfix;
      }
      convertStack.push(revinfix[i]);
    } else if (revinfix[i] === ")") {
      while (convertStack.peek() !== "(") {
        postfix = (await convertStack.pop()) + postfix;
      }
      await convertStack.pop();
    } else {
      postfix = revinfix[i] + postfix;
    }
    resultText.innerText = postfix;
    await sleep(1000);
  }
  while (convertStack.count !== 0) {
    postfix = (await convertStack.pop()) + postfix;
    resultText.innerText = postfix;
  }
  for (ele of expressions) {
    ele.classList.remove("active");
  }

  return postfix;
}
