import React, {Component} from "react";
import {
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardFooter,
  CardBlock,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormFeedback
} from "reactstrap";
import axios from 'axios';
class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      street:'',
      city:'',
      state:'',
      country:'',
      modal: false,
      errors:{}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    var headers = {
      'Content-Type':'application/json'
    }
    axios.post('api/entity', this.state, headers).then(
      (res) => this.setState({
        modal: !this.state.modal
      })
    ).catch(
      (err) => this.setState({
        errors:err.response.data,
      })
    );
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const {name, street, city, state, country, modal, errors} = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Hospital Info</strong>
              </CardHeader>
              <CardBlock className="card-body">
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label>Hospital</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="name"
                             id="name-input"
                             name="name"
                             placeholder="Enter hospital name"
                             value={name}
                             onChange={this.onChange}/>
                      <FormText color="muted">Please enter your hospital name</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="street-input">Street</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                              type="street"
                              id="street-input"
                              name="street"
                              placeholder="Enter street"
                              value={street}
                              onChange={this.onChange}/>
                      <FormText className="help-block">Please enter the street</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="city-input">City</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="city"
                             id="city-input"
                             name="city"
                             placeholder="Enter city"
                             value={city}
                             onChange={this.onChange}/>
                      <FormText className="help-block">Please enter the city</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="address-input">State</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="state"
                             id="state-input"
                             name="state"
                             placeholder="Enter state"
                             value={state}
                             onChange={this.onChange}/>
                      <FormText className="help-block">Please enter state</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="age-input">Country</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="country"
                             id="country-input"
                             name="country"
                             placeholder="Enter country"
                             value={country}
                             onChange={this.onChange}/>
                      <FormText className="help-block">Please enter country</FormText>
                    </Col>
                  </FormGroup>

                </Form>
              </CardBlock>
              <CardFooter>
                <Row>
                <Col md="1">
                <Button type="submit" size="sm" color="primary" onClick={this.onSubmit}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                </Col>
                <Col md="1">
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                </Col>
                </Row>
              </CardFooter>
            <Modal isOpen={this.state.modal}>
              <ModalHeader toggle={this.toggle}>Success!</ModalHeader>
              <ModalBody>
                  You have successfully create an entity!
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle}>Go back</Button>{' '}
              </ModalFooter>
            </Modal>
            </Card>

          </Col>
        </Row>
      </div>
    )
  }
}

export default Forms;
