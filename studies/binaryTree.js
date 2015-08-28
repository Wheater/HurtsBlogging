function BinarySearchTree() {
    this.root = null;
}

BinarySearchTree.prototype = {

    //restore constructor
    constructor: BinarySearchTree,

    add: function (value){
      var node = {
        value: value,
        left: null,
        right: null
      };
      if(this.root == null){
        this.root = node;
      } else {
        var current = this.root;
        while(true){
          if(node.value >= current.value){
            if(current.right == null){
              current.right = node;
              break;
            } else {
              current = current.right;
            }
          } else if(node.value < current.value){
            if(current.left == null){
              current.left = node;
              break;
            } else {
              current = current.left;
            }
          } else {
            break;
          }
        }
      }
    },

    contains: function(value){
      var current = this.root;
      var found = false;
      var searchStack = [];

      while(!found && current){
        if(current.value == value){
          found = true;
        } else if(value > current.value){
          current = current.right;
        } else if(value < current.value){
          current = current.left;
        } 
      }

      return found;
    },

    remove: function(value){
      var found = false;
      var current = this.root;
      var last;
      while(!found && current){
        if(current.value == value){
          found = true;
        } else if(value < current.value){
          last = current;
          current = current.left;
        } else if(value > current.value){
          last = current;
          current = current.right;
        }
      }

      if(found){
        //no children
        if(!current.left && !current.right){

        }
      }
    },

    size: function(){

      var count = 0;

      this.traverse(function(){ //callback to increase count
        count++;
      })

      return count;
    },

    toArray: function(){
      var treeAsArray = [];

      this.traverse(function(value){
        treeAsArray.push(value);
      })

      return treeAsArray;
    },

    toString: function(){
      var treeAsString = '';

      this.traverse(function(value){
        treeAsString = treeAsString + ' ' + value;
      })

      return treeAsString.trim();
    },

    traverse: function(process){

      function inOrder(node){
        if(node != null){
          //continue searching left
          inOrder(node.left);
          //call callback function to process the node found
          process(node.value);
          //continue searching right
          inOrder(node.right);
        }
      }

      //start at root
      inOrder(this.root);
    },

    traverseByBreadth: function(process, root){
      var queue = [];
      var current = root;

      while(current != null){
        process(current.value);

        if(current.left != null)
          queue.push(current.left);
        if(current.right != null)
          queue.push(current.right);

        current = queue.shift();
      }
    }
};