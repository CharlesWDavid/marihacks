function next() {
  'use strict';
  window.open("college_path_questions.html","_self")
}

function brew_results() {
  var e = document.getElementById("travel");
  var UserInputTravel = e.options[e.selectedIndex].value; 
  
  var f = document.getElementById("finance");
  var UserInputTravel = f.options[e.selectedIndex].value; 
  
  var ideal_college = ""
  
  if (UserInputTravel = "yes") {
    ideal_college = "University of British Columbia";
  if (UserInputTravel = "notsure")
    ideal_college = "University of McGill";
  if (UserInputTravel = "no")
    ideal_college = "University of McGill";
  }
  window.open("results.html","_self");
  document.getElementById("recommended").innerHTML = ideal_college;
}
