
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Container,
         Content,
         Item,
         Button,
         Icon,
         View,
         Text,
         Spinner,
         Label } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Grid, Row,Col } from 'react-native-easy-grid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { chooseLanguage } from '../../actions/user';
import styles from './styles';
import TextField from '../TextField'

class Language extends Component {

// redirects to pages in English
  onButtonPressEng() {
      // redirect successful login to homepage
      Actions.home();
  }

// redirects to pages in Kinyarwanda
  onButtonPressKin() {
      Actions.home_k();
   }

  renderButtons() {
      const { loading } = this.props;

      return <Grid>
         <Col>
             <Button rounded bordered style={styles.center} onPress={this.onButtonPressEng.bind(this)} active={!this.props.loading}>
               <Text>English</Text>
             </Button>
         </Col>
         <Col>
             <Button rounded bordered style={styles.center} onPress={this.onButtonPressKin.bind(this)} active={!this.props.loading}>
               <Text>Kinyarwanda</Text>
             </Button>
         </Col>
      </Grid>;
  }

  render() {
    return (
      <Container>
          <Content>
              <View style={styles.bg}>
                <Text style={styles.text}>
                    Please select a language to continue
                </Text>
                {this.renderButtons()}
              </View>
          </Content>
      </Container>
    );
  }
}

export default connect()(Language);