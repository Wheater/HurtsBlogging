describe('addNodes', function(){
  
  it('respond with success from the server', function () {

    var node2 = {
      last: node1,
      value: 6,
      next: null
    }
    var node1 = {
      last: null,
      value: 5,
      next: node2
    }
    var node4 = {
      last: node3,
      value: 6,
      next: null
    }
    var node3 = {
      last: null,
      value: 5,
      next: node4
    }

    expect(addLists(node1, node3)).toBe(1);
  });
});