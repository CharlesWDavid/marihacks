function next() {
  'use strict';
  window.open("college_path_questions.html","_self")
}

function brew_results() {
  var checkedValue = null; 
  var inputElements = document.getElementsByClassName('activity');
  for(var i=0; inputElements[i]; ++i){
    if(inputElements[i].checked){
      checkedValue = inputElements[i].value;
      break;
      }
}
}