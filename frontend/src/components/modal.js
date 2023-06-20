import React, { Component } from 'react'

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';


// To check if the checkbox is checked or not
class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }


    handleChange = e => {
        let { name, value } = e.target;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        const activeItem = {...this.state.activeItem, [name]: value };
        this.setState({ activeItem })
    };

    render() {
        const { toggle, onSave } = this.props;
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Task Item</ModalHeader>

            <ModalBody>

              <Form>

                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input
                      type="text"
                      name="title"
                      value={this.state.activeItem.title}
                      onChange={this.handleChange}
                      placeholder="Enter Task Title"
                    />
                </FormGroup>

                {/* { 2 description label } */}
              </Form>

            </ModalBody>

            </Modal>
        )
    }







}