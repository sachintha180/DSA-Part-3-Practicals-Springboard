"use strict";
// main.ts
// For testing the functionality request in Part 3: Practical
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AVLTree_1 = __importDefault(require("./AVLTree"));
// (a) Initialize new AVLTree of student marks
const studentMarks = new AVLTree_1.default();
// (b) Add a random set of 10 marks into the AVLTree
[80, 30, 55, 45, 85, 60, 15, 100, 65, 75].forEach(mark => {
    studentMarks.insert(mark);
});
// (c) Traverse the AVLTree to check if all marks were added
studentMarks.inOrderTraversal(studentMarks.root);
// (d) Output the height
console.log("Height:", studentMarks.height());
// (e) Output the node count
console.log("Node count:", studentMarks.countNodes());
// (f) Delete one node
studentMarks.delete(60);
