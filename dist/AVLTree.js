"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AVLNode_1 = __importDefault(require("./AVLNode"));
class AVLTree {
    constructor() {
        this.root = null;
        this.count = 0;
    }
    // ------------------ HELPER METHODS ------------------
    // updateHeight(node): update the height of the provided AVLNode
    updateHeight(node) {
        node.height =
            1 + Math.max(this.getHeight(node.left), this.getHeight(node.left));
    }
    // getBalanceFactor(node): return the balance factor of the provided AVLNode
    getBalanceFactor(node) {
        return this.getHeight(node.left) - this.getHeight(node.right);
    }
    // rightRotate(node): return the new root after performing a right rotation on the provided AVLNode
    rightRotate(node) {
        //    [node]
        // [x]
        //    [T2]
        let x = node.left;
        let T2 = x.right;
        //     [x]
        // [T2]   [node]
        x.right = node;
        node.left = T2;
        this.updateHeight(node);
        this.updateHeight(x);
        return x;
    }
    // leftRotate(node): return the new root after performing a left rotation on the provided AVLNode
    leftRotate(node) {
        // [node]
        //       [x]
        //   [T2]
        let x = node.right;
        let T2 = x.left;
        //       [x]
        // [node]   [T2]
        x.left = node;
        node.right = T2;
        this.updateHeight(node);
        this.updateHeight(x);
        return x;
    }
    // _insert(node, key): insert the provided key to the correct position of the provided AVLNode w/ rotation
    _insert(node, key) {
        // traverse the AVLTree and insert the key
        if (!node) {
            return new AVLNode_1.default(key);
        }
        else if (key < node.key) {
            node.left = this._insert(node.left, key);
        }
        else if (key > node.key) {
            node.right = this._insert(node.right, key);
        }
        else {
            return node;
        }
        // update the node's height
        this.updateHeight(node);
        // get the node's balance factor
        let balance = this.getBalanceFactor(node);
        // if left heavy, perform L / LR rotate
        if (balance > 1) {
            if (key < node.left.key) {
                return this.rightRotate(node);
            }
            else {
                node.left = this.leftRotate(node.left);
                return this.rightRotate(node);
            }
        }
        // if right heavy, perform L / RL rotate
        if (balance < -1) {
            if (key > node.right.key) {
                return this.leftRotate(node);
            }
            else {
                node.right = this.rightRotate(node.right);
                return this.leftRotate(node);
            }
        }
        // return inserted node
        return node;
    }
    minValueNode(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }
    // _delete(node, key): delete the provided key from the provided AVLNode
    _delete(node, key) {
        // traverse the AVLTree and delete the key
        if (!node) {
            return null;
        }
        else if (key < node.key) {
            node.left = this._delete(node.left, key);
        }
        else if (key > node.key) {
            node.right = this._delete(node.right, key);
        }
        else {
            if (!node.left) {
                return node.right;
            }
            else if (!node.right) {
                return node.left;
            }
            // node has two children
            let temp = this.minValueNode(node.right);
            node.key = temp.key;
            node.right = this._delete(node.right, temp.key);
        }
        // update the node's height
        this.updateHeight(node);
        // get the node's balance factor
        let balance = this.getBalanceFactor(node);
        // if left heavy, perform L / LR rotate
        if (balance > 1) {
            if (this.getBalanceFactor(node.left) < 0) {
                node.left = this.leftRotate(node.left);
                return this.rightRotate(node);
            }
            else {
                return this.rightRotate(node);
            }
        }
        // if right heavy, perform L / RL rotate
        if (balance < -1) {
            if (key > node.right.key) {
                node.right = this.rightRotate(node.right);
                return this.leftRotate(node);
            }
            else {
                return this.leftRotate(node);
            }
        }
        // return next node
        return node;
    }
    // inOrderTraversal(node): traverses the AVLTree (LEFT -> ROOT -> RIGHT) w/ counting
    inOrderTraversal(node) {
        if (node) {
            this.inOrderTraversal(node.left);
            console.log(node.key);
            this.inOrderTraversal(node.right);
        }
    }
    // getHeight(node) to return the height of the provided AVLNode
    getHeight(node) {
        return node ? node.height : 0;
    }
    // ------------------ HELPER METHODS ------------------
    // (Q1): insert(mark) to add the provided mark to the current AVLTree
    insert(mark) {
        this.root = this._insert(this.root, mark);
        // increment the node count
        this.count++;
    }
    // (Q2): search(mark) to search for the provided mark in the current AVLTree
    search(node, mark) {
        if (node) {
            if (node.key === mark) {
                return true;
            }
            else if (mark < node.key) {
                return this.search(node.left, mark);
            }
            else {
                return this.search(node.right, mark);
            }
        }
        return false;
    }
    // (Q3): height() to return the height of the tree
    height() {
        return this.root.height;
    }
    // (Q4): countNodes() to return the total nodes of the AVLTree
    countNodes() {
        return this.count;
    }
    // (Q5): delete() to delete a given mark from the AVLTree
    delete(mark) {
        this.root = this._delete(this.root, mark);
        // decrement the node count
        this.count--;
    }
}
exports.default = AVLTree;
