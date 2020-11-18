import React from 'react';
import { GiftedChat, SystemMessage } from 'react-native-gifted-chat'; // 0.3.0
import firebaseSvc from '../FirebaseSvc';

type Props = {
  name?: string,
  email?: string,
  avatar?: string,
};

class Chat extends React.Component<Props> {

  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  state = {
    messages: [],
  };
  

  get user() {
    return {
      name: this.props.navigation.state.params.name,
      email: this.props.navigation.state.params.email,
      avatar: this.props.navigation.state.params.avatar,
      id: firebaseSvc.uid,
      _id: firebaseSvc.uid, 
    };
  }

  
onDelete(messageIdToDelete) {
  this.setState(previousState =>
    ({ messages: previousState.messages.filter(message => message.id !== messageIdToDelete) }))
  }

    onLongPress(context, message) {
    console.log(context, message);
    const options = ['Delete Message', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions({
        options,
        cancelButtonIndex
    }, (buttonIndex) => {
        switch (buttonIndex) {
            case 0:
                this.onDelete(messageIdToDelete);
                break;
            case 1:
                break;
        }
    });

}


  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={firebaseSvc.send}
        user={this.user}
        onLongPress={this.onLongPress}
      />
    );
  }

  componentDidMount() {
    firebaseSvc.refOn(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    firebaseSvc.refOff();
  }
}


export default Chat


