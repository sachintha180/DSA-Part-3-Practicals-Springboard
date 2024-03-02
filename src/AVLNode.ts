class AVLNode {
  public key: number;
  public left: AVLNode | null;
  public right: AVLNode | null;
  public height: number;

  constructor(key: number) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

export default AVLNode;
