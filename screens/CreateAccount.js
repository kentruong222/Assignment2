import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
  StyleSheet, Text,
  TextInput, View,
  Button, ImageEditor, TouchableOpacity,
} from 'react-native';
import firebaseSvc from '../FirebaseSvc';
import '@firebase/storage';

class CreateAccount extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };

  state = {
    name: 'biggie',
    email: 'big@gmail.com',
    password: 'bigbig',
    avatar: '',
  };

  onPressCreate = async () => {
    console.log('create account... email:' + this.state.email);
    try {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        avatar: this.state.avatar,
      };
      await firebaseSvc.createAccount(user);
    } catch ({ message }) {
      console.log('create account failed. catch error:' + message);
    }
  };

  onChangeTextEmail = email => this.setState({ email });
  onChangeTextPassword = password => this.setState({ password });
  onChangeTextName = name => this.setState({ name });


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
        <Text style={styles.title}>Name:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={this.onChangeTextName}
          value={this.state.name}
        />
        <TouchableOpacity
        style={styles.button}
        onPress={this.onPressCreate}
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

export default CreateAccount;
