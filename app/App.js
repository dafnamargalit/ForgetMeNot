/**
 * ForgetMeNot (new)
 * Author: Dafna Margalit
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  Modal,
  TextInput
} from 'react-native';

import {
  Icon,
  Header,
  List,
  ListItem,
  Card,
  Button,
  FormInput,
} from 'react-native-elements';

import Overlay from 'react-native-modal-overlay';

import NotificationsIOS, { NotificationAction, NotificationCategory } from 'react-native-notifications';

export default class App extends Component{
  constructor(props) {
    super(props);
    NotificationsIOS.addEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
    NotificationsIOS.requestPermissions();
    NotificationsIOS.addEventListener('notificationReceivedForeground', this.onNotificationReceivedForeground.bind(this));
    NotificationsIOS.addEventListener('notificationReceivedBackground', this.onNotificationReceivedBackground.bind(this));
    this.state = {
      viewPlants: false,
      viewNewPlant: false,
      viewMyPlant: false,
      newPlant: '',
      newName: '',
      myPlant: '',
      myPlants: [],
    };
  }

  onPushRegistered(deviceToken) {
    console.log("Device Token Received: " + deviceToken);
  }

  onNotificationReceivedForeground(notification) {
    console.log("Notification Received Foreground: " + JSON.stringify(notification));
  }

  onNotificationReceivedBackground(notification) {
    console.log("Notification Received Background: " + JSON.stringify(notification));
  }

  componentWillUnmount() {
      // prevent memory leaks!
      NotificationsIOS.removeEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
      NotificationsIOS.removeEventListener('notificationReceivedBackground', this.onNotificationReceivedBackground.bind(this));
      NotificationsIOS.removeEventListener('notificationReceivedForeground', this.onNotificationReceivedForeground.bind(this));
  }

  viewPlants(visible) {
    this.setState({viewPlants: visible});
  }

  viewNewPlant(visible) {
    this.setState({viewNewPlant: visible});
  }

  viewMyPlant(visible) {
    this.setState({viewMyPlant: visible});
  }

  addPlant(plant) {
    this.state.myPlants.push(plant);
    this.viewNewPlant(false);
    if(plant.name == 'Tulip') //3 times a week
    {
    let newNotification = NotificationsIOS.localNotification({
      alertBody: "Make sure to water your " + plant.name + "!",
      alertTitle: "Your " + plant.name + " needs to be watered",
      fireDate: new Date(Date.now() + (5 * 1000)),
      repeatInterval: 'week',
      alertAction: "Click here to open",
      soundName: "chime.aiff",
      userInfo: { }
    });
    let new2Notification = NotificationsIOS.localNotification({
      alertBody: "Make sure to water your " + plant.name + "!",
      alertTitle: "Your " + plant.name + " needs to be watered",
      fireDate: new Date(Date.now() + (2 * 86400 * 1000)), //2 days
      repeatInterval: 'week',
      alertAction: "Click here to open",
      soundName: "chime.aiff",
      userInfo: { }
    });
    let new3Notification = NotificationsIOS.localNotification({
      alertBody: "Make sure to water your " + plant.name + "!",
      alertTitle: "Your " + plant.name + " needs to be watered",
      fireDate: new Date(Date.now() + ( 4 * 86400* 1000)), //4 days
      repeatInterval: 'week',
      alertAction: "Click here to open",
      soundName: "chime.aiff",
      userInfo: { }
    });
  }
  else if(plant.name == 'Cactus') //once a week
  {
    let newNotification = NotificationsIOS.localNotification({
      alertBody: "Make sure to water your " + plant.name + "!",
      alertTitle: "Your " + plant.name + " needs to be watered",
      fireDate: new Date(Date.now() + (10 * 1000)),
      repeatInterval: 'week',
      alertAction: "Click here to open",
      soundName: "chime.aiff",
      userInfo: { }
    });
  }
  else if(plant.name == 'Hibiscus') //twice a day
 {   let newNotification = NotificationsIOS.localNotification({
      alertBody: "Make sure to water your " + plant.name + "!",
      alertTitle: "Your " + plant.name + " needs to be watered",
      fireDate: new Date(Date.now() + (15 * 1000)),
      repeatInterval: 'day',
      alertAction: "Click here to open",
      soundName: "chime.aiff",
      userInfo: { }
    });
    let new2Notification = NotificationsIOS.localNotification({
      alertBody: "Make sure to water your " + plant.name + "!",
      alertTitle: "Your " + plant.name + " needs to be watered",
      fireDate: new Date(Date.now() + (3 * 60 * 1000)),
      repeatInterval: 'day',
      alertAction: "Click here to open",
      soundName: "chime.aiff",
      userInfo: { }
    });
  }
  }
    
  removePlant(plant) {
    var newArray = this.state.myPlants.slice();
    var index = newArray.indexOf(plant);
    if(index > -1) {
      newArray.splice(index,1);
    }
    this.setState({myPlants: newArray});
  }

  render() {
    const plants = [
      {
        name: 'Cactus',
        icon: 'https://cdn0.iconfinder.com/data/icons/flowers-6/200/11-256.png',
        description: 'Cactus plants require little maintenance, and do well in sunny or shady locations. Water your Cactus once a week.',
      },
      {
        name: 'Hibiscus',
        icon: 'https://cdn0.iconfinder.com/data/icons/flowers-6/200/09-256.png',
        description: 'Hibiscus plants require lots of water, and prefer partially shady locations. Water your Hibiscus twice a day.',
      },
      {
        name: 'Tulip',
        icon: 'https://cdn0.iconfinder.com/data/icons/flowers-6/200/01-256.png',
        description: 'Tulips require moderate care, and enjoy partially shady locations. It is recommended to water your Tulips three times a week.',
      },
    ]

    return (
      <View style={styles.view}>
        <Modal animationType={"slide"} visible={this.state.viewPlants} onRequestClose={() => {}}>
        <Overlay visible={this.state.viewNewPlant}
              animationType="bounceIn"
              onClose={() => {this.viewNewPlant(false)}}
              containerStyle={{backgroundColor: 'rgba(56, 56, 56, 0.78)'}}
              childrenWrapperStyle={{backgroundColor: '#eee'}}
              animationDuration={500}>
              <Text>Add Plant</Text>
              <Button
          
                onPress={() => {this.addPlant({name: this.state.newPlant.name, icon: this.state.newPlant.icon, description: this.state.newPlant.description})}}
                
                title='ADD TO GARDEN' />
        </Overlay>
        <Header
            leftComponent={<Icon transparent name="close" color="#fff" onPress={() => {this.viewPlants(false)}}/>}
            centerComponent={{ text: 'ADD PLANTS', style: { color: '#fff' } }}
            rightComponent={{ }}
          />
          <View style={styles.view}>
            <List>
            {
              plants.map((item, i) => (
                  <ListItem
                    key={i}
                    title={item.name}
                    avatar={{uri: item.icon}}
                    onPress = {() => {this.setState({newPlant:item});this.viewNewPlant(true)}}
                  />
              ))
            }
            </List>
          </View>
        </Modal> 
        <View style={styles.view}>
          <Header
            leftComponent={{  }}
            centerComponent={{ text: 'FORGET ME NOT', style: { color: '#fff' } }}
            rightComponent={<Icon transparent name="add" color="#fff" onPress={() => {this.viewPlants(true)}}/>}
          />
          <View style={styles.view}>
            <Overlay visible={this.state.viewMyPlant}
                animationType="bounceIn"
                onClose={() => {this.viewMyPlant(false)}}
                containerStyle={{backgroundColor: 'rgba(56, 56, 56, 0.78)'}}
                childrenWrapperStyle={{backgroundColor: '#eee'}}
                animationDuration={500}>
                <Text>{this.state.myPlant.name}</Text>
                <Text>{this.state.myPlant.description}</Text>
                <Button
                  onPress={() => {this.removePlant(this.state.myPlant);this.viewMyPlant(false)}}
                  title='REMOVE FROM GARDEN' />
          </Overlay>
            <Text>Click the '+' to add plants to your garden!</Text>
            <List>
            {
              this.state.myPlants.map((item, i) => (
                  <ListItem
                    key={i}
                    title={item.name}
                    avatar={{uri: item.icon}}
                    onPress = {() => {this.setState({myPlant:item});this.viewMyPlant(true)}}
                  />
              ))
            }
            </List>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


