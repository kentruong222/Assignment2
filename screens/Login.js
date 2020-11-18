import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
  StyleSheet, Text,
  TextInput,  TouchableOpacity, View,
  Button, ImageEditor,
} from 'react-native';
import firebaseSvc from '../FirebaseSvc';
import firebase from 'firebase';
import { auth, initializeApp, storage } from 'firebase';
import uuid from 'uuid';

class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  state = {
    name: 'Biggie',
    email: 'big@gmail.com',
    password: 'bigbig',
    avatar: '',
  };

  // using Fire.js
  onPressLogin = async () => {
    console.log('pressing login... email:' + this.state.email);
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      avatar: this.state.avatar,
    };

    const response = firebaseSvc.login(
      user,
      this.loginSuccess,
      this.loginFailed
    );
  };

  loginSuccess = () => {
    console.log('login successful, navigate to chat.');
    this.props.navigation.navigate('Chat', {
      name: this.state.name,
      email: this.state.email,
      avatar: this.state.avatar,
    });
  };
  loginFailed = () => {
    console.log('login failed ***');
    alert('Login failure. Please tried again.');
  };


  onChangeTextEmail = email => this.setState({ email });
  onChangeTextPassword = password => this.setState({ password });


  render() {
    return (
      <View>
        <Text style={styles.title}>Email:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="test3@gmail.com"
          onChangeText={this.onChangeTextEmail}
          value={this.state.email}
        />
        <Text style={styles.title}>Password:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={this.onChangeTextPassword}
          value={this.state.password}
        />
        <TouchableOpacity
        style={styles.button}
        onPress={this.onPressLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        onPress={() => this.props.navigation.navigate("CreateAccount")}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const offset = 16;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    margin: offset,
    paddingHorizontal: offset,
    borderColor: 'skyblue',
    borderWidth: 2,
    fontSize: offset,
    backgroundColor: "white",
    borderRadius: 40,
    padding: 20,
    marginBottom: 20,
  },
  button: {
    margin: offset,
    paddingHorizontal: offset,
    borderColor: 'skyblue',
    borderWidth: 2,
    fontSize: offset,

    backgroundColor: "skyblue",
    borderRadius: 40,
    marginBottom: 10,
    padding: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "700",
  },
});

export default Login;
