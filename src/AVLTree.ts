import AVLNode from "./AVLNode";

class AVLTree {
  public root: AVLNode | null;
  private count: number;

  constructor() {
    this.root = null;
    this.count = 0;
  }

  // ------------------ HELPER METHODS ------------------

  // updateHeight(node): update the height of the provided AVLNode
  private updateHeight(node: AVLNode): void {
    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.left));
  }

  // getBalanceFactor(node): return the balance factor of the provided AVLNode
  private getBalanceFactor(node: AVLNode): number {
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  // rightRotate(node): return the new root after performing a right rotation on the provided AVLNode
  private rightRotate(node: AVLNode): AVLNode {
    //    [node]
    // [x]
    //    [T2]
    let x = node.left!;
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
  private leftRotate(node: AVLNode): AVLNode {
    // [node]
    //       [x]
    //   [T2]
    let x = node.right!;
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
  private _insert(node: AVLNode | null, key: number): AVLNode {
    // traverse the AVLTree and insert the key
    if (!node) {
      return new AVLNode(key);
    } else if (key < node.key) {
      node.left = this._insert(node.left, key);
    } else if (key > node.key) {
      node.right = this._insert(node.right, key);
    } else {
      return node;
    }

    // update the node's height
    this.updateHeight(node);

    // get the node's balance factor
    let balance = this.getBalanceFactor(node);

    // if left heavy, perform L / LR rotate
    if (balance > 1) {
      if (key < node.left!.key) {
        return this.rightRotate(node);
      } else {
        node.left = this.leftRotate(node.left!);
        return this.rightRotate(node);
      }
    }

    // if right heavy, perform L / RL rotate
    if (balance < -1) {
      if (key > node.right!.key) {
        return this.leftRotate(node);
      } else {
        node.right = this.rightRotate(node.right!);
        return this.leftRotate(node);
      }
    }

    // return inserted node
    return node;
  }

  private minValueNode(node: AVLNode): AVLNode {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  // _delete(node, key): delete the provided key from the provided AVLNode
  private _delete(node: AVLNode | null, key: number): AVLNode | null {
    // traverse the AVLTree and delete the key
    if (!node) {
      return null;
    } else if (key < node.key) {
      node.left = this._delete(node.left, key);
    } else if (key > node.key) {
      node.right = this._delete(node.right, key);
    } else {
      if (!node.left) {
        return node.right;
      } else if (!node.right) {
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
      if (this.getBalanceFactor(node.left!) < 0) {
        node.left = this.leftRotate(node.left!);
        return this.rightRotate(node);
      } else {
        return this.rightRotate(node);
      }
    }

    // if right heavy, perform L / RL rotate
    if (balance < -1) {
      if (key > node.right!.key) {
        node.right = this.rightRotate(node.right!);
        return this.leftRotate(node);
      } else {
        return this.leftRotate(node);
      }
    }

    // return next node
    return node;
  }

  // inOrderTraversal(node): traverses the AVLTree (LEFT -> ROOT -> RIGHT) w/ counting
  public inOrderTraversal(node: AVLNode | null): void {
    if (node) {
      this.inOrderTraversal(node.left);
      console.log(node.key);
      this.inOrderTraversal(node.right);
    }
  }

  // getHeight(node) to return the height of the provided AVLNode
  private getHeight(node: AVLNode | null): number {
    return node ? node.height : 0;
  }

  // ------------------ HELPER METHODS ------------------

  // (Q1): insert(mark) to add the provided mark to the current AVLTree
  public insert(mark: number): void {
    this.root = this._insert(this.root, mark);

    // increment the node count
    this.count++;
  }

  // (Q2): search(mark) to search for the provided mark in the current AVLTree
  public search(node: AVLNode | null, mark: number): boolean {
    if (node) {
      if (node.key === mark) {
        return true;
      } else if (mark < node.key) {
        return this.search(node.left, mark);
      } else {
        return this.search(node.right, mark);
      }
    }
    return false;
  }

  // (Q3): height() to return the height of the tree
  public height(): number {
    return this.root!.height;
  }

  // (Q4): countNodes() to return the total nodes of the AVLTree
  public countNodes(): number {
    return this.count;
  }

  // (Q5): delete() to delete a given mark from the AVLTree
  public delete(mark: number): void {
    this.root = this._delete(this.root, mark);

    // decrement the node count
    this.count--;
  }
}

export default AVLTree;
