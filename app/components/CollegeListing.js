import React from 'react';

class CollegeListing extends React.Component{
  constructor(props){
    super(props);

    this.checkEligibility = this.checkEligibility.bind(this);
  }
  checkEligibility(){
    var style = {};
    var eligibility = this.eligibility;
    var text = "";
    if (eligibility == 0){
      style = {color:"red"};
      text = "Not Eligible";
    }
    if (eligibility == 1){
      style = {color:"yellow"};
      text = "Nearly Eligible";
    }
    if (eligibility == 2){
      style = {color:"green"};
      text = "Eligible";
    }
    return (<div style={style}>{text}</div>);
  }
  render(){
    return(
      <div className="list-items">
        <div className="name">{this.props.college["uni-name"]}</div>
        <div className="eligibility">{this.checkEligibility}</div>
        <div className="chosen">{this.props.college.Location.City}</div>
      </div>
    );
  }
}

export default CollegeListing;