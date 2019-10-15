import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../../constants/colors.js'

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }
  getData = async () => {
    try {
      
      const value = await AsyncStorage.getItem('@UserStore:token')
      const name = await AsyncStorage.getItem('@UserStore:name')
      if(value !== null) {

        if(name){
        this.props.navigation.navigate('chat',{
            name: name
        });
        }
        else {
        this.props.navigation.navigate('auth');
        }
      }
      else {
        this.props.navigation.navigate('auth');
      }
    } catch(e) {
      console.log(e)
    }
  }

  componentDidMount() {
    setTimeout(() => {
        this.getData()
    }, 2500);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.gradient1} />
        <LinearGradient
          colors={[Colors.gradient1, Colors.gradient2]}
          style={styles.gradientContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/icon.png')}
            />
          </View>
        </LinearGradient>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  gradientContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 100,
  },
});
