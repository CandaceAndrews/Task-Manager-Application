import React, { Component } from 'react';
import './App.css';
import CustomModel from './components/modal'

const tasks = [
  {
    id: 1,
    title: "Call Clients",
    description: "Call clients for overdue invoices.",
    completed: true
  },
  {
    id: 2,
    title: "Dunning",
    description: "Sending dunning letters to clients for uncollected cash.",
    completed: false
  },
  {
    id: 3,
    title: "Order Release",
    description: "Check out customers' accounts and release or block orders accordingly.",
    completed: true
  },
  {
    id: 4,
    title: "Weekly Reports",
    description: "Sending the weekly reports for overdue invoices.",
    completed: false  
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal:false,
      viewCompleted: false,
      taskList: tasks
      activeItem: {
        title: "",
        description: "",
        completed: false
      }
    };
  }

  toggle = () => {
    this.state({modal: !this.state.modal});
  };
  handleSubmit = item => {
    this.toggle();
    alert('Saved!' + JSON.stringify(item));
  }
  handleDelete = item => {
    alert('Deleted!' + JSON.stringify(item));
  }

  displayCompleted = status => {
    this.setState({ viewCompleted: status });
  };
  
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
          className={!this.state.viewCompleted ? "active" : ""}
        >
          Incompleted
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
      item => item.completed === viewCompleted
    );

    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.title}
        >
          {item.title}
        </span>
        <span>
          <button className="btn btn-info mr-2">Edit</button>
          <button className="btn btn-danger mr-2">Delete</button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="context">
        <h1 className="text-black text-uppercase text-center my-4">Task Manager</h1>
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
    );
  }
}

export default App;
