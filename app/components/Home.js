import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import CollegeListing from './CollegeListing.js';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      location:"none",
      program:"none",
      colleges:[]
    };

    this.filter = this.filter.bind(this);
    this.globalChangeHandler = this.globalChangeHandler.bind(this);
  }
  globalChangeHandler(event){
    this.setState({[event.target.id]:event.target.value});
  }
  filter(){
    var link = "http://localhost:3000";
    console.log(link);
    $.ajax(link + "/filter/?location=" + this.state.location + "&program=" + this.state.program).then(
      college => {this.setState({colleges:college}); console.log(college)}, this
    );
  }
  render() {
    return (
      <div className="container-fluid">
        <div id="college-dashboard">
          <div className="filter">
            <div className="filter-title">
              Filters
            </div>
            <div className="filter-options">
              <div className="filter-label">
                Location
              </div>
              <select className="filter-picker" id="location" onChange={this.globalChangeHandler}>
                <option value="none"></option>
                <option value="Montreal">Montreal</option>
                <option value="Waterloo">Waterloo</option>
                <option value="Vancouver">Vancouver</option>
              </select>
              <div className="filter-label">
                Eligibility
              </div>
              <select className="filter-picker">
              </select>
              <div className="filter-label">
                Programs
              </div>
              <select className="filter-picker" id="program" onChange={this.globalChangeHandler}>
                <option value="none"></option>
                <option value="Computer Science">Computer Science</option>
                <option value="Software Engineering (COOP)">Software Engineering</option>
              </select>
              <div className="filter-label">
                Tuition
              </div>
              <select className="filter-picker">
              </select>
              <div className="filter-label">
                Campus Size
              </div>
              <select className="filter-picker">
              </select>
              <div className="filter-label">
                Student Teacher Ratio
              </div>
              <select className="filter-picker">
              </select>
              <div className="filter-label">
                Sports and Activities
              </div>
              <select className="filter-picker">
              </select>
              <div className="filter-label">
                Housing
              </div>
              <select className="filter-picker">
              </select>
            </div>
            <button className="filter-btn btn" onClick={this.filter}>Filter</button>
          </div>
          {/*<div className="v-separator"><div></div></div>*/}
          <div className="college-list">
            <div className="sorting">
              <button className="btn-link">Top Colleges</button>
              <button className="btn-link">Selectivity</button>
              <button className="btn-link">Alphabetical</button>
              <button className="btn-link">Your Colleges</button>
            </div>
            <div className="h-separator"></div>
            <div className="lists">
              <div className="listing-label">
                <div className="name">name</div>
                <div className="eligibility">eligibility</div>
                <div className="chosen"><select></select></div>
              </div>
              {this.state.colleges.map(college => <CollegeListing college={college}/>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Home);
