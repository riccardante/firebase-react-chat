import React, { Component } from 'react';
import FBApp from './firebaseConfig'

import InputBar from './inputBar'
import MessageList from "./messageList";

import './App.css';


class App extends Component {
  state = {
    user: null,
    messages: []
  };

  constructor() {
    super()

    // login user and get or generate userdata
    this.auth = FBApp.auth().signInAnonymously().then(user => {
      let userdata 
      FBApp.database().ref('user_repo').once('value', snap => {
        let userlist = {}
        Object.keys(snap.val()).forEach(function(key) {
          if (snap.val()[key].userid === user.user.uid) {
            // user is in DB get userdata
            userdata = snap.val()[key]
          } else {
            // add data to userlist
            if (!snap.val()[key].userid) {
              userlist[key] = snap.val()[key]
            }
          }
        });
        if(!userdata){
          var keys = Object.keys(userlist)
          let randomkey = keys.length * Math.random() << 0
          userdata = userlist[keys[randomkey]]
          userdata['userid'] = user.user.uid 
          FBApp.database().ref('user_repo/'+ keys[randomkey]).update({userid: user.user.uid})            
        }
        this.setState({user:userdata})
      })
    })
  }
  
  componentDidMount() {
    let messages = [];
    // add a listner to chat data 
    FBApp.database().ref('chat').on("child_added", (snap, prevChild) => {
      let message = {}
      Object.keys(snap.val()).forEach(function(key) {
        message[key]= snap.val()[key]
      });
      message['key'] = snap.key
      messages.push(message);
      this.setState({ messages });
    });  



  }

  render() {
    const { messages } = this.state;
    return (
      <div className="App">
        <MessageList messages={messages} />
        <InputBar user={this.state.user}/>
      </div>
    );
  }
}

export default App;
