import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  BackHandler,
} from 'react-native';
import Colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import IconBack from 'react-native-vector-icons/MaterialIcons';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';
import OtpInputs from 'react-native-otp-inputs';

export default class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      backButton: false,
      message: '',
      codeInput: '',
      phoneNumber: '',
      invalid: false,
      confirmResult: null,
    };
  }
  handleBackPress = () => {
    const {confirmResult, codeInput, user} = this.state;
    if (confirmResult) {
      this.setState({confirmResult: null});
      return true;
    } else if (codeInput) {
      this.setState({codeInput: '', confirmResult: null});
      return true;
    } else {
    }
  };


  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user: user.toJSON()});
        console.log(user);
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          backButton: false,
          message: '',
          codeInput: '',
          phoneNumber: '',
          invalid: false,
          confirmResult: null,
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }
  goBack = () => {
    this.setState({confirmResult: null, backButton: null});
  };
  goChat =() => {
    this.props.navigation.navigate('chat');
  }

  signIn = () => {
    const {phoneNumber} = this.state;
    const phoneNumberWithCode = '+91' + phoneNumber;
    this.setState({message: 'Sending code ...'});

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumberWithCode)
      .then(confirmResult =>
        this.setState({
          confirmResult,
          message: 'Code has been sent!',
          backButton: true,
        }),
      )
      .catch(error =>
        this.setState({
          message: `Sign In With Phone Number Error: ${error.message}`,
        }),
      );
  };


  confirmCode = () => {
    const {codeInput, confirmResult} = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then(user => {
          this.setState({message: 'Code Confirmed!'});
        })
        .catch(error =>
          
          {
            this.setState({message: `Code Confirm Error: ${error.message}`, invalid: true})}
        );
    }
  };
  phoneNumberInputHandler = (number) => {
    const validNumber = number.replace(/[^0-9]/g,'')
    this.setState({phoneNumber: validNumber})
  }
  renderPhoneNumberInput() {
    const {phoneNumber} = this.state;

    return (
      <View style={styles.bottomContainer}>
        <View style={styles.bottomDiv}>
          <Text style={styles.helperText}>Your Mobile Number Is...</Text>
        </View>
        <View style={styles.bottomDiv2}></View>
        <View style={styles.bottomDiv3}>
          <Text style={styles.text}>+91</Text>
          <View style={styles.textInput}>
            <TextInput
              textAlignVertical="bottom"
              maxLength={10}
              onChangeText={value => this.phoneNumberInputHandler(value)}
              value={phoneNumber}
              keyboardType="numeric"
              style={styles.input}></TextInput>
            <Icon name="screen-smartphone" style={styles.mobileIcon} />
          </View>
        </View>
        <View style={styles.bottomDiv4}>
          <TouchableOpacity onPress={this.signIn} style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  renderVerificationCodeInput() {
    const {codeInput, phoneNumber, invalid} = this.state;

    return (
      <View style={styles.bottomContainer}>
        <View style={styles.bottomDiv}>
          <Text style={styles.helperText}>
            Please enter the Verification Code...
          </Text>
        </View>
        <View style={styles.bottomDiv6}>
          <View style={styles.mobileInfo}>
            <Text style={styles.mobileInfoText}>{'+91' + phoneNumber}</Text>
          </View>
          <TouchableOpacity onPress={this.signIn} style={styles.retryInfo}>
            <Text style={styles.retryInfoText}>{'Resend'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomDiv5}>
          <View style={styles.otpInput}>
            <OtpInputs
              handleChange={value => this.setState({codeInput: value})}
              numberOfInputs={6}
              keyboardType="numeric"
              containerStyles={styles.inputOtp}
              inputsContainerStyles={styles.inputContainerOtp}
              inputContainerStyles={styles.inputContainerOne}
              inputStyles={this.getTextStyle(invalid)}
              value={codeInput}
            />
          </View>
        </View>
        <View style={styles.bottomDiv4}>
          <TouchableOpacity onPress={this.confirmCode} style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  getTextStyle(invalid) {
    if(invalid) {
     return {
      
      borderBottomColor: '#ff7f7f',
      borderBottomWidth: 1,
      height: '100%',
      width: '100%',

     }
    } else {
      return {
        height: '100%',
    padding: 2,
    margin: 2,
    width: '100%',
    fontSize: 25,
      }
    }
   }
  renderBackButton() {
    return (
      <TouchableOpacity
        style={{
          position: 'absolute',

          top: '5%',
          width: 25,
          height: 25,
          left: '6%',
        }}
        onPress={this.goBack}>
        <IconBack
          name="arrow-back"
          style={{
            fontSize: 25,
            color: '#fff',
          }}
        />
      </TouchableOpacity>
    );
  }
  renderNameScreen() {
    return (
      <View style={styles.bottomContainer}>
        <View style={styles.bottomDiv}>
          <Text style={styles.helperText}> Your Name Is...</Text>
        </View>
        <View style={styles.bottomDiv2}></View>
        <View style={styles.bottomDiv7}>
          <View style={styles.textInput1}>
            <TextInput
              keyboardType="default"
              style={styles.inputName}></TextInput>
            <Icon name="user" style={styles.mobileIcon} />
          </View>
        </View>
        <View style={styles.bottomDiv4}>
          <TouchableOpacity onPress={this.goChat} style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    const {user, confirmResult, backButton} = this.state;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <KeyboardAvoidingView
          behavior="height"
          keyboardVerticalOffset={50}
          style={styles.screen}>
          <View style={styles.topContainer}>
            <StatusBar backgroundColor="#6e45e2" />
            <LinearGradient
              colors={['#6e45e2', '#88d3ce']}
              style={styles.gradientContainer}>
              {backButton && this.renderBackButton()}

              <View style={styles.logoContainer}>
                <Image
                  style={styles.image}
                  source={require('../../assets/icon.png')}
                />
              </View>
            </LinearGradient>
          </View>
          {!user && !confirmResult && this.renderPhoneNumberInput()}
          {!user && confirmResult && this.renderVerificationCodeInput()}
          {user && this.renderNameScreen()}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

AuthScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
  },
  gradientContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    flex: 0.65,
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
  bottomContainer: {
    flex: 0.35,
    marginHorizontal: '15%',
  },
  helperText: {
    flex: 1,
    color: '#121212',
    fontSize: 16,
  },
  bottomDiv: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  bottomDiv6: {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  mobileInfo: {
    flex: 1,
  },
  mobileInfoText: {
    fontSize: 16,
  },
  retryInfo: {
    flex: 1,
  },
  retryInfoText: {
    fontSize: 16,
    color: Colors.primary,
    textAlign: 'left',
    textDecorationLine: 'underline',
    textDecorationColor: Colors.primary,
  },
  bottomDiv3: {
    flex: 3,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bottomDiv7: {
    flex: 3,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 0,
  },
  bottomDiv5: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    textAlign: 'left',
    fontSize: 25,

    color: '#121212',
    flex: 2,
  },
  textInput: {
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput1: {
    flex: 8,
    flexDirection: 'row',
    textAlign: 'left',
    marginLeft: 0,
    alignItems: 'center',
  },
  otpInput: {
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputOtp: {
    flex: 8,
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  inputContainerOtp: {
    flex: 8,
    flexDirection: 'row',

    width: '100%',
    height: '100%',
  },
 
  inputContainerOne: {
    flex: 8,
    margin: 2,
    width: '100%',

    height: '100%',
  },
  inputEnterOtp: {
    height: '100%',
    margin: 2,
    width: '100%',
    fontSize: 25,
  },
  input: {
    flex: 8,
    marginLeft: '5%',
    height: '100%',
    width: '100%',
    fontSize: 25,
  },
  inputName: {
    flex: 8,
    height: '100%',
    width: '100%',
    textAlign: 'left',
    fontSize: 25,
    marginLeft: 0,
  },
  mobileIcon: {
    textAlign: 'center',
    flex: 2,
    fontSize: 25,
    color: Colors.primary,
  },
  bottomDiv4: {
    flex: 3,
    // backgroundColor: "yellow",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    width: '100%',
    height: 50,
    borderRadius: 50,
    flexDirection: 'column',

    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.white,
    width: '100%',
    fontSize: 18,
  },
});
