import Login from './screens/Login';
import CreateAccount from './screens/CreateAccount';
import Chat from './screens/Chat';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';

const navigator = createStackNavigator({
  Login: { screen: Login },
  CreateAccount: { screen: CreateAccount },
  Chat: { screen: Chat },
});


export default createAppContainer(navigator);