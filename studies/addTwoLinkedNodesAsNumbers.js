//You have two numbers represented by a linked list
//Each node contains a singl digit. The digits
//are stored in reverse order, (i.e. 10,325 is stored
//as 523,01). Write a function that adds the two numbers
//and returns the sum as a linked list

var Node = function(){
  this.last = null;
  this.value = null;
  this.next = null;
}

function addLists(l1, l2){

  var sum = new Node();
  var carry = 0;
  var c1 = l1;
  var c2 = l2;

  while ((c1 != null && c2 != null ) || carry != 0){

    if(sum.last != null){
      sum.last.next = new Node();
      sum = sum.last.next;
    }
    if(c1 != null && c2 != null)
    sum.value = c1.value + c2.value + carry;
    else 
      sum.value = carry;
    
    if(sum.value >= 10){
      sum.value -= 10;
      carry = 1;
    } else {
      carry = 0;
    }
    console.log(sum);
    //prepare for next loop
    if(c1 != null && c2 != null){
      c1 = c1.next;
      c2 = c2.next;
    }
  }

  return sum.value;
}