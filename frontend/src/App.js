import React, { Component } from 'react';
import './App.css';
import Modal from "./components/Modal";
import axios from 'axios';



// const tasks = [
//   {
//     id: 1,
//     title: "Call Clients",
//     description: "Call clients for overdue invoices.",
//     completed: true
//   },
//   {
//     id: 2,
//     title: "Dunning",
//     description: "Sending dunning letters to clients for uncollected cash.",
//     completed: false
//   },
//   {
//     id: 3,
//     title: "Order Release",
//     description: "Check out customers' accounts and release or block orders accordingly.",
//     completed: true
//   },
//   {
//     id: 4,
//     title: "Weekly Reports",
//     description: "Sending the weekly reports for overdue invoices.",
//     completed: false  
//   },
// ];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal:false,
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList : []
    };
  }

  // Add componentDidMount()
  componentDidMount() {
    this.refreshList();
  }

 
  refreshList = () => {
    axios   //Axios to send and receive HTTP requests
      .get("http://localhost:8000/api/tasks/")
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  };


  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
      .put(`https://localhost:8000/api/tasks/${item.id}`, item)
      .then(res => this.refreshList());
      return;
    }
    // if new post to submit
    axios
      .post("http://localhost:8000/api/tasks", item)
      .then(res => this.refreshList());
  };

  handleDelete = item => {
    axios
    .delete(`https://localhost:8000/api/tasks/${item.id}`)
    .then(res => this.refreshList())
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal })
  };

  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal })
  };




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

  // Main variable to render items on the screen
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );

    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
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
      <main className="content p-3 mb-2 bg-info">
        <h1 className="text-white text-uppercase text-center my-4">Task Manager</h1>
        <div className="row">
          <div className="col-md-6 col-sma-10 mx-auto p-0">
            <div className="card p-3">
              <div>
                <button onClick={this.createItem} className="btn btn-warning">Add Task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        <footer className="my-3 mb-2 bg-info text-white text-center">Copyright 2023 &copy; All Rights Reserved</footer>
        {this.state.modal ? (
          <Modal 
          activeItem={this.state.activeItem} 
          toggle={this.toggle}
          onSave={this.handleSubmit} 
          />
        ) : null }
      </main>
    );
  }
}

export default App;
