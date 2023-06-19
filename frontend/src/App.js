import React, { Component } from 'react'
import './App.css';


const tasks = [
{
  id: 1,
  title: "Call Clients",
  desciption: "Call clients for overdue invoices.",
  completed: true
},
  {
  id: 2,
  title: "Dunning",
  desciption: "Sending dunning letters to clients for uncollected cash.",
  completed: false
},
{
  id: 3,
  title: "Order Release",
  desciption: "Check out customers accounts and release or block orders accordingly.",
  completed: true
},
{
  id: 4,
  title: "Weekly Reports",
  desciption: "Sending the weekly reports for overdue invoices.",
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

// Rendering items in the list (completed || incompleted)
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
      item => item.completed ==viewCompleted
    );
  
    return newItems.map(item => (
      <li key={item.id} className="list-group-item d-flex justify-content-between 
      align-items-center">
        <span className={`todo-title mr-2 ${this.state.viewCompleted }`}>

        {item.title}


        </span>
      </li>
    ))
  };



  render() {
    return (
      <main className="context">
        <h1 className="text-black text-uppercase text-center my-4"> Task Manager </h1>
        <div className="row">
          <div className="col-md-6 col-sma-10 mx-auto p-0">
            <div className="card p-3">
              <div>
                <button className="btn btn-warning">Add Task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>

          </div>
        </div>
      </main>
    )
  }
}

export default App;