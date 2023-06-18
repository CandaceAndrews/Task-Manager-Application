import React, { Component } from 'react'
import './App.css';


const tasks = [
{
id: 3,
title: "Order Release",
desciption: "Check out customers accounts and release or block orders accordingly."
},
{
  id: 4,
  title: "Weekly Reports",
  desciption: "Sending the weekly reports for overdue invoices."
  },
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      viewCompleted:false,
      taskList:tasks

    }
  }
}

export default App;