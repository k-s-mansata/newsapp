import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      progress : 0
    };
  };
  render() {
    const pageSize = 12;
    const apiKey = process.env.REACT_APP_NEWS_API;

    this.setProgress = (progress) => {
      this.setState({progress : progress});
    };
    
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element = {<News apiKey = {apiKey} setProgress = {this.setProgress} key="general" pageSize = {pageSize} country = "in" category = "general"/>} />
            <Route exact path="/sports" element = {<News apiKey = {apiKey} setProgress = {this.setProgress} key="sports" pageSize = {pageSize} country = "in" category = "sports"/>} />
            <Route exact path="/business" element = {<News apiKey = {apiKey} setProgress = {this.setProgress} key="business" pageSize = {pageSize} country = "in" category = "business"/>} />      
            <Route exact path="/science" element = {<News apiKey = {apiKey} setProgress = {this.setProgress} key="science" pageSize = {pageSize} country = "in" category = "science"/>} />
            <Route exact path="/health" element = {<News apiKey = {apiKey} setProgress = {this.setProgress} key="health" pageSize = {pageSize} country = "in" category = "health"/>} />
            <Route exact path="/entertainment" element = {<News apiKey = {apiKey} setProgress = {this.setProgress} key="entertainment" pageSize = {pageSize} country = "in" category = "entertainment"/>} />  
            <Route exact path="/technology" element = {<News apiKey = {apiKey} setProgress = {this.setProgress} key="technology" pageSize = {pageSize} country = "in" category = "technology"/>} />
          </Routes>
        </Router>
      </div>
    )
  }
}

