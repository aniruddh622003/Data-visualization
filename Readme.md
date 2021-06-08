# Visualize Data Structures on the web
Data strucures are one of the fundamentals when we strt learning programming. Formally -

> A data structure is a data organization, management, and storage format that enables efficient access and modification. More precisely, a data structure is a collection of data values, the relationships among them, and the functions or operations that can be applied to the data.

Many programmers fear from it because they can't process their operations in their minds as they are new to it. This project is made with the sole purpose to help us visualize the data strucures.

I know the [Homepage](https://aniruddh622003.github.io/Data-visualization/) needs work 😅

## Stack
[Stack visualization page](https://aniruddh622003.github.io/Data-visualization/pages/stack.html)

This data structure is very simple. It works on the *First-In-Last-Out* principle. There are many real-life examples of a stack like a pile of books, the book which is kept at bottommost position remains in the stack for the longest period of time.

Stack has 3 main operations:

1. Push(): 
   >  Adds an item in the stack. If the stack is full, then it is said to be an Overflow condition. 

   > Pseudocode for push() operation is:<br/>
   1.` Check if the stack is full.`<br/>2.` If the stack is full, produces an error and exit.`<br/>3.` If the stack is not full, increments top to point next empty space.`<br/>4.` Adds data element to the stack location, where top is pointing.`

    >Algorithm for push() operation is:<br/>
    `if stack is full: return null`<br/> 
    `top = top + 1`<br/>
    `stack[top] = data`<br/>
2. Pop():
   > 1.` Checks if the stack is empty.`<br/>
   2.` If the stack is empty, produces an error and exit.`<br/>
   3.` If the stack is not empty, accesses the data element at which top is pointing.`<br/>
   4.` Decreases the value of top by 1.`

   >Algorithm for push() operation is:<br/>
    `if stack is empty: return null`<br/> 
    `data = stack[top]`<br/>
    `top = top - 1`<br/>
    `return data`
3. Peek():
   > Code for peek() operation:<br/>
   `return stack[top]`