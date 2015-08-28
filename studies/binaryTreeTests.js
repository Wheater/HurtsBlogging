describe('addNodes', function(){
  
  var tree = new BinarySearchTree();

  beforeEach(function(){
      tree.add(125);
      tree.add(150);
      tree.add(1);
      tree.add(200);
      tree.add(100);
      tree.add(132);
      tree.add(83);
      tree.add(25);

      console.log(tree.toArray());
      console.log(tree.toString());
    });

  it('adding nodes to a tree works', function () {
    tree.add(200);

    tree.traverseByBreadth(function(value){
            if(value == 200){
              console.log(true + ' ' + value);
            } else{
              console.log(false + ' ' + value);
            }
          },
          tree.root
    );

    expect(tree.size()).toBe(9);
  });


});