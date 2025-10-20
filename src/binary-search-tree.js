const { NotImplementedError } = require("../extensions/index.js");
const { Node } = require('../extensions/list-tree.js');

module.exports = class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    this._root = this._addNode(this._root, data);
  }

  _addNode(node, data) {
    if (!node) {
      return new Node(data);
    }
    
    if (data < node.data) {
      node.left = this._addNode(node.left, data);
    } else if (data > node.data) {
      node.right = this._addNode(node.right, data);
    }
    
    return node;
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    return this._findNode(this._root, data);
  }

  _findNode(node, data) {
    if (!node) return null;
    if (data === node.data) return node;
    if (data < node.data) return this._findNode(node.left, data);
    return this._findNode(node.right, data);
  }

  remove(data) {
    this._root = this._removeNode(this._root, data);
  }

  _removeNode(node, data) {
    if (!node) return null;
    
    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data);
    } else {
      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      
      const minRight = this._minNode(node.right);
      node.data = minRight.data;
      node.right = this._removeNode(node.right, minRight.data);
    }
    
    return node;
  }

  min() {
    if (!this._root) return null;
    return this._minNode(this._root).data;
  }

  _minNode(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  max() {
    if (!this._root) return null;
    return this._maxNode(this._root).data;
  }

  _maxNode(node) {
    while (node.right) {
      node = node.right;
    }
    return node;
  }
};