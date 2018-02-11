import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';

class DaWay extends React.Component {
  render(){
    return(
      <body background='pic4.jpg' id="bg">
        <div class="grid">
          <div id="box">
            <h1 class="title">My Path</h1>
            <div class="info">
              <p>Welcome to My Path. We will help you:</p>
                <li>Discover your passions</li>
                <li>Find eligible Colleges</li>
                <li>Pinpoint your next steps</li>
                <li>Unlock your true potential</li>
              <p>The process is very easy and intuitive. Simply answer the following questions to the best of your ability, and we will generate for you a list of Colleges tailored to your interests.</p>
              <div>
                <button href="college_path_questions.html" type="button" onclick="next()" id="nextButton"> Start My Path </button>
              </div>
            </div>
          </div>
        </div>
        <script src="scripts.js"></script>
      </body>
    );
  }
}

export default DaWay;