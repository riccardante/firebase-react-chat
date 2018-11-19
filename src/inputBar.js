import React, { Component } from 'react'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";

import FBApp from './firebaseConfig'

const CLASS = 'inputBar'

class InputBar extends Component {
  state = {
    message: '',
    user: '' //this.props.user
  }

//   constructor() {
//     super()


//     // login user and get or generate userdata
//     this.auth = FBApp.auth().signInAnonymously().then(user => {
//         let userdata 
//         console.log('user', user.user.uid)
//         FBApp.database().ref('user_repo').once('value', snap => {
//             let userlist = {}
//             Object.keys(snap.val()).forEach(function(key) {
//                 console.log('key', key)
//               if (snap.val()[key].userid == user.user.uid) {
//                 // user is in DB get userdata
//                 console.log('user in DB ..')
//                 userdata = snap.val()[key]
//               } else {
//                 console.log('user NOT in DB ..')
//                 // add data to userlist
//                 if (!snap.val()[key].userid) {
//                   userlist[key] = snap.val()[key]
//                 }
//               }
//             });
//             if(!userdata){
//               var keys = Object.keys(userlist)
//               let randomkey = keys.length * Math.random() << 0
//               userdata = userlist[keys[randomkey]]
//               FBApp.database().ref('user_repo/'+ keys[randomkey]).update({userid: user.user.uid})            
//             }
//             this.setState({user:userdata})
//             console.log('FFFF',userdata, this.state.user)
//         })

//       })
  
    
//   }

  saveData = m => {
    const timestamp = new Date().getTime();
    this.database = FBApp.database().ref('chat')    
    // console.log('uuuu', this.props.user.avatar)
    this.database.push({
        text: m, 
        time: timestamp, 
        uid: this.props.user.userid,
        name: this.props.user.name,
        avatar: './' + this.props.user.avatar
    })
  }

  handleAddTasks = e => {
    const { message } = this.state
    if (e.key === 'Enter' && message !== '') {
      this.saveData(message)
      this.setState({ message: '' })
    }
  }

  handleClick = () => {
    const { message } = this.state
    this.saveData(message)
    this.setState({ message: '' })
  }

  handleChange = e => {
    const message = e.target.value
    this.setState({ message })
  }

  render () {
    const { message } = this.state
    console.log('Input', this.props.user)
    return (
      <div className={CLASS}>

        {this.props.user ? (
                  <Avatar src={"./"+this.props.user.avatar} />
                ) : (
                  <Avatar>
                    <AccountCircle />
                  </Avatar>
                )}
                
        <Input
          className={`${CLASS}-input`}
          placeholder="Write a message..."
          onChange={this.handleChange}
          onKeyPress={this.handleAddTasks}
          value={message}
        />
        <Button
          variant="contained"
          color="primary"
          className={`${CLASS}-button`}
          onClick={this.handleClick}
        >
          Send
        </Button>
      </div>
    )
  }
}

export default InputBar
