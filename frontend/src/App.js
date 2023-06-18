import React, { Component } from 'react'
import './App.css';


const tasks = [
{
  id: 3,
  title: "Order Release",
  desciption: "Check out customers accounts and release or block orders accordingly."
  completed: true
},
{
  id: 4,
  title: "Weekly Reports",
  desciption: "Sending the weekly reports for overdue invoices."
  completed: false  
},
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      viewCompleted:false,
      taskList:tasks

    };
  }

  displayCompleted = status => {
    if (status) {
      return this.setstatus({ viewCompleted: true })
    }
    return this.setstatus({ viewCompleted: false })
  }
  
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Completed
            </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.displayCompleted ? "" : "active"}
        >
          Incompleted
            </span>
      </div>
    )
  }



}

export default App;