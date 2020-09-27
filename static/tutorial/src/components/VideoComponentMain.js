import React, { Component, useState } from "react";
import VideoPlayer from './videoplayer';
import Tabs from './Tabs';
import Tab from './Tabs';
import axios from 'axios';
import moment from 'moment-timezone';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

var r ;
class Main extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isOpen: false,
      resource: null
    }
  this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    if (this.props.current_foss && this.props.tutorial && this.props.current_language) {
    axios.get("https://spoken-tutorial.org/api/st_video_resource/"+window.location.search)
          .then(res => {
            this.setState({
              resource: res.data
            });
          })
        }
  }
  
  handleClick(){
    this.setState({ isOpen : !this.state.isOpen})
  }

  render(){

   const mainStatus = this.state.isOpen ? "isopen" : "";
   const videoJsOptions = {
    autoplay: true,
    muted: true,
    controls: true,
    sources: [{
      src: this.props.tutorial.sources[0],
      type: 'video/ogg'
    }]
  }

    return(
    <div className={mainStatus} id="main" >
        <div className="columns topBanner blueBg">
        <div className="column is-one-third toggleWrapper">
          <button onClick={this.handleClick} className="playlistToggle">
          <i class="fas fa-list"></i>  <span>Tutorial List</span>
        </button>
          
        </div>
        <div className="column">
          <button className="videoTitle blueBg">
          <span className="is-size-6 mb-2">{this.props.tutorial.title}</span>
          <span className="tutorialProgress"><progress className="progress is-info mr-3" value={this.props.progressValue} max="100" ></progress></span>
        </button>
        </div>
        </div>
        
      <div className="main">
        <div>
          <VideoPlayer isOpen={mainStatus} current_foss={this.props.current_foss} current_language={this.props.current_language} tutorial_title={this.props.tutorial.title} time_completed={this.props.time_completed} is_authenticated ={this.props.is_authenticated} { ...videoJsOptions } />
          <div className="tabsWrapper">
        
       <Tabs>
         <Tab label="Course Details">
           <div>
             <p className="has-text-weight-bold is-size-5">Tutorial Details : </p>
             <p>{this.props.current_foss}  : {this.props.tutorial.title}</p>
             <p className="has-text-grey">Time : {this.props.tutorial.duration} </p>
             <hr/>
             <p className="has-text-weight-bold">Description : </p>
             <p>{this.props.tutorial.description} </p>
             
           </div>
         </Tab>
         <Tab label="Resources">
         <div>
             <p className="has-text-weight-bold is-size-5 mb-3">Tutorial Resources : </p>
             <div class="tags has-addons res">
              <a href={this.state.resource ? this.state.resource.prerequisite : "#"} target="_blank">
              <i class="far fa-file-video mr-3 resIcon"></i> 
              <span>Watch Prerequisite Video</span></a>
            </div>
             <div class="tags has-addons res">
                <a href={this.state.resource ? this.state.resource.installation_sheet : "#"} target="_blank">
                <i class="fas fa-file-download resIcon"></i>
                <span >Installation Sheet</span>
                </a>
            </div>
             <div class="tags has-addons res">
                <a href={this.state.resource ? this.state.resource.code_file : "#"} target="_blank">
                <i class="fas fa-file-download resIcon"></i>
                <span >Code Files</span>
                </a>
            </div>
             <div class="tags has-addons res">
                <a href={this.state.resource ? this.state.resource.assignment : "#"} target="_blank">
                <i class="fas fa-file-download resIcon"></i>
                <span >Assignments</span>
                </a>
            </div>
             <div class="tags has-addons res">
                <a href={this.state.resource ? this.state.resource.slide : "#"} target="_blank">
                <i class="fas fa-file-download resIcon"></i>
                <span >Slides</span>
                </a>
            </div>
             <div class="tags has-addons res">
                <a href={this.state.resource ? this.state.resource.script : "#"} target="_blank">
                <i class="fas fa-external-link-alt resIcon"></i>
                <span >Script</span>
                </a>
            </div>
             <div class="tags has-addons res">
                <a href={this.state.resource ? this.state.resource.timed_script : ""} target="_blank">
                <i class="fas fa-external-link-alt resIcon"></i>
                <span >Timed Script</span>
                </a>
            </div>
          </div>
         </Tab>
         <Tab label="Forums">
         {this.state.resource ? this.state.resource.questions.map(item => (
         <article class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p className="forumInfo">
                  <i class="fas fa-link"></i>
                    <a target="_blank" className="forumTitle" href={"https://forums.spoken-tutorial.org/question/"+item.id}>{item.question}</a>
                    <p><i class="far fa-clock"></i><span>{item.minute_range}</span> : <span>{item.second_range}</span></p>
                  </p>
                </div>
                <nav class="level is-mobile">
                <div class="level-left">
                  <p class="level-item forumInfo">
                  <i class="far fa-calendar-alt"></i><span>{moment(item.date).tz(moment.tz.guess()).format('MMMM Do YYYY, h:mm:ss a')}</span>
                  </p>
                  <p class="level-item forumInfo">
                  <i class="far fa-envelope"></i><span>{item.user}</span>
                  </p>
                </div>
              </nav>
            </div>
          </article>
         )): ""}
         </Tab>
       </Tabs>
      </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Main