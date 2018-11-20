import React, { Component } from 'react'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';

import FBApp from './firebaseConfig'


const CLASS = 'inputBar'


class InputBar extends Component {
  state = {
    message: '',
    user: '' //this.props.user
  }
  
    saveData = m => {
    const timestamp = new Date().getTime();
    this.database = FBApp.database().ref('chat')    
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

    if(!this.props.user){
      return       <div><CircularProgress className='progress' /></div>      
    }


    return (
      <div className={CLASS}>
{/* 
        {this.props.user ? (
                  <Avatar src={"./"+this.props.user.avatar} />
                ) : (
                  <Avatar>
                    <AccountCircle />
                  </Avatar>
                )}
                 */}


                {/* <InputLabel htmlFor="input-with-icon-adornment">
                {this.props.user? this.props.user.name : '...'}
                </InputLabel> */}
        <Input
          className={`${CLASS}-input`}
          placeholder="Write a message..."
          onChange={this.handleChange}
          onKeyPress={this.handleAddTasks}
          value={message}

          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
            {this.props.user ? (
                  <Avatar src={"./"+this.props.user.avatar} />
                ) : (
                  <Avatar>
                    <AccountCircle />
                  </Avatar>
                )}

            </InputAdornment>
          }
        />

        {/* <Input
          className={`${CLASS}-input`}
          placeholder="Write a message..."
          onChange={this.handleChange}
          onKeyPress={this.handleAddTasks}
          value={message}
        /> */}
        
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
