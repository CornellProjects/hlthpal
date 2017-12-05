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
  InputGroupButton
} from "reactstrap";

class Forms extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
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
                      <Input type="text" id="text-input" name="text-input" placeholder="Enter hospital name"/>
                      <FormText color="muted">Please enter your hospital name</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Street</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="email" id="email-input" name="email-input" placeholder="Enter street"/>
                      <FormText className="help-block">Please enter the street</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="password-input">City</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="password" id="password-input" name="password-input" placeholder="Enter city"/>
                      <FormText className="help-block">Please enter the city</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="address-input">State</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="address" id="address-input" name="address-input" placeholder="Enter state"/>
                      <FormText className="help-block">Please enter state</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="age-input">Country</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="age" id="age-input" name="age-input" placeholder="Enter country"/>
                      <FormText className="help-block">Please enter country</FormText>
                    </Col>
                  </FormGroup>

                </Form>
              </CardBlock>
              <CardFooter>
                <Row>
                <Col md="1">
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                </Col>
                <Col md="1">
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                </Col>
                </Row>
              </CardFooter>
            </Card>

          </Col>
        </Row>
      </div>
    )
  }
}

export default Forms;
