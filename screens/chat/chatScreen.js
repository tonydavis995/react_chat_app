import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Modal,
  Platform,
} from 'react-native';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconCheck from 'react-native-vector-icons/AntDesign';
import IconSend from 'react-native-vector-icons/EvilIcons';
import AccessoryBar from '../../components/accessoryBar';
import {connect} from 'react-redux';
import {openChat, sendMessage} from '../../store/actions/chat';
import UserAvatar  from 'react-native-user-avatar';
import ImageViewer from 'react-native-image-zoom-viewer';
import AsyncStorage from '@react-native-community/async-storage';
import Paytm from '@philly25/react-native-paytm';
import Colors from '../../constants/colors';


const paytmConfig = {
  MID: 'yxfSYX93676064839454',
  WEBSITE: 'WEBSTAGING',
  CHANNEL_ID: 'WAP',
  INDUSTRY_TYPE_ID: 'Retail',
  CALLBACK_URL: 'https://securegw.paytm.in/theia/paytmCallback?ORDER_ID='
};
const mapStateToProps = state => {
  return {
    messageState: state.messageReducer,
    nameState: state.nameReducer,
    loginState: state.loginReducer
  };
};
const user = {
  _id: 1,
  name: 'Developer',
}

class ChatScreen extends React.Component {

 static navigationOptions = ({navigation}) => {
   try {
    const { params = {name} } = navigation.state;
    return {
      headerTitle: (
        <View
          style={{
            backgroundColor: Colors.accent,
            flex: 1,
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              flex: 0.8,
              width: '20%',
              height: '100%',
            }}>
            <Image
              source={require('../../assets/icon.png')}
              style={{
                margin: '3%',
                width: 100,
                height: 40,
                position: 'relative',
              }}></Image>
          </View>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Profile')}>
            <View
              style={{
                right: 10,
                backgroundColor: Colors.white,
                width: 40,
                height: 40,
                borderRadius: 100,
                position: 'absolute',
              }}>
               <UserAvatar size="40" style={{position: 'relative'}} colors={[Colors.accent, Colors.accent, Colors.error]} name={params.name || 'User'}  />
              {/* <Image
                source={require('../../assets/images/paytm.png')}
                style={{position: 'relative', width: 40, height: 40}}></Image> */}
            </View>
          </TouchableWithoutFeedback>
        </View>
      ),
    };
   } catch (error) {
     console.log(error)
   }
    
      
    };
    runTransaction(amount, customerId, orderId, mobile, email, checkSum) {
      const callbackUrl = `${paytmConfig.CALLBACK_URL}${orderId}`;
      const details = {
        mode: 'Staging', // 'Staging' or 'Production'
        MID: paytmConfig.MID,
        INDUSTRY_TYPE_ID: paytmConfig.INDUSTRY_TYPE_ID,
        WEBSITE: paytmConfig.WEBSITE,
        CHANNEL_ID: paytmConfig.CHANNEL_ID,
        TXN_AMOUNT: `${amount}`, // String
        ORDER_ID: orderId, // String
        EMAIL: email, // String
        MOBILE_NO: mobile, // String
        CUST_ID: customerId, // String
        CHECKSUMHASH: checkSum, //From your server using PayTM Checksum Utility 
        CALLBACK_URL: callbackUrl,
      };
      try {
        console.log(details)
        Paytm.startPayment(details);
      } catch (error) {
        console.log(error)
      }
     
  }
  constructor(props) {
    super(props);
      this.state = {
        modalImageVisible: false,
        imageUrl : null,
        messages: [],
      };
    this.openImageViewer = this.openImageViewer.bind(this);
    this.buttonPress = this.buttonPress.bind(this);
    this.onGoToMap = this.onGoToMap.bind(this)
  }
  openImageViewer(images)  {
    console.log(images)
    console.log(images.splice(1))
    this.setState({modalImageVisible: true, imageUrl: images})
  }
  buttonPress() {
    console.log('pressed');
    this.props.navigation.navigate('Profile');
  }
  setName = async() => {
    const name = await AsyncStorage.getItem('@UserStore:name')

    this.props.navigation.setParams({ name: JSON.parse(name) });
  }
  onPayTmResponse = (resp) => {
    const {STATUS, status, response} = resp;
    console.log(resp)

    if (Platform.OS === 'ios') {
      if (status === 'Success') {
        const jsonResponse = JSON.parse(response);
        const {STATUS} = jsonResponse;

        if (STATUS && STATUS === 'TXN_SUCCESS') {
          // Payment succeed!
        }
      }
    } else {
      if (STATUS && STATUS === 'TXN_SUCCESS') {
        console.log('kkkk',resp, 'dasdsadasdsdsd')
       try {
        fetch('http://13.126.12.242/api/paytm/verifychecksum', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        resp: resp
      })
    })
       } catch (error) {
         console.log(error)
       }
      }
    }
  };
  componentWillUnmount(){
    Paytm.removeListener(Paytm.Events.PAYTM_RESPONSE, this.onPayTmResponse);
  }
  componentDidMount() {
    Paytm.addListener(Paytm.Events.PAYTM_RESPONSE, this.onPayTmResponse);
   
   this.setName()
    openChat({phoneNumber: '7012912325'});

  }

  onSend(messages = []) {
    this.props.sendMessage({to: '9999999999', from: '7012912325', message: messages}, messages[0]);
    console.log(messages);
    console.log(this.props.messageState)
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }));
  }

  renderMessageImage(props) {
    const images = [{
      // Simplest usage.
      url: props.currentMessage.image,
      // You can pass props to <Image />.
      props: {
        // headers: ...
      }
    }, {
      props: {
        // Or you can set source directory.
        // source: require('../background.png')
      }
    }];
    return(
      <TouchableOpacity onPress={() => props.imageProps.openImageViewer(images)}>
        <Image
          source={{ uri: props.currentMessage.image }}
          style = {styles.image}
        />
      </TouchableOpacity>
    );
  }
  //   renderMessage(props) {
  //     // const {
  //     //   currentMessage: {text: currText},
  //     // } = props;
  // return(
  //   <View style={{backgroundColor: 'black'}}>
  //     <GiftedChat {...props} />
  //   </View>
  // )
  //     // let messageTextStyle;

  //     // Make "pure emoji" messages much bigger than plain text.
  //     // if (currText && emojiUtils.isPureEmojiString(currText)) {
  //     //   messageTextStyle = {
  //     //     fontSize: 28,
  //     //     // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
  //     //     lineHeight: Platform.OS === 'android' ? 34 : 30,
  //     //   };
  //     // }
  //   }
  paytmPay=() => {
    const orderid = Math.floor(Math.random() * 1000);
    const orderstringid  = orderid.toString()
    console.log(orderstringid)
  try {
    const callbackUrl = `${paytmConfig.CALLBACK_URL}${orderstringid}`;
    fetch('http://13.126.12.242/api/paytm/generatechecksum', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ORDER_ID: orderstringid,
        CUST_ID: '8',
        TXN_AMOUNT: '100',
        EMAIL: 'vinayakvnair007@gmail.com',
        MOBILE_NO: '7777777777',
        CALLBACK_URL: callbackUrl
      })
    }).then( async (response)=> {
      let json = await response.json();
     
      this.runTransaction('100','8',orderstringid,'7777777777','vinayakvnair007@gmail.com',json)
    }).catch((error)=> console.log(error))
  } catch (error) {
    console.log(error)
  }
  }
  renderSend(props) {
    return (
      <Send {...props}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginRight: 12,
            marginBottom: 12,
          }}>
          <IconSend
            style={{fontSize: 35, color: Colors.accent}}
            name="sc-telegram"></IconSend>
        </View>
      </Send>
    );
  }
  onSendFromUser = (messages = []) => {
    const createdAt = new Date()
    const messagesToUpload = messages.map(message => ({
      ...message,
      user,
      createdAt,
      _id: Math.round(Math.random() * 1000000),
    }))
    this.onSend(messagesToUpload)
  }
  onGoToMap()
  {
    this.props.navigation.navigate('map')
    // this.props.navigation.navigate('map')
  }
  renderCustomActions = props => {
    return <AccessoryBar {...props} onGoMap={this.onGoToMap} onSend={this.onSendFromUser} />
  }
  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors.accent,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 25,
            borderBottomLeftRadius: 25,
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 5,
            elevation: 2,
          },
          left: {
            paddingHorizontal: 10,
            paddingTop: 5,
            backgroundColor: Colors.white,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 25,
            borderBottomRightRadius: 25,
            borderBottomLeftRadius: 25,
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 5,
            elevation: 2,
          },
        }}
      />
    );
  };
  renderCustomView = props => {
    if (props.currentMessage.payTm) {
      return (
        <View
          style={{
            borderTopRightRadius: 25,
            borderBottomRightRadius: 25,
            borderBottomLeftRadius: 25,
            borderTopLeftRadius: 0,
          }}>
          <View
            style={{
              width: 200,
              height: 150,
              borderRadius: 13,
              margin: 3,
              borderColor: Colors.accent,
              borderWidth: 2,
              borderStyle: 'dashed',
              flexDirection: 'column',
            }}>
            <View
              style={{
                position: 'relative',
                marginLeft: '8%',
                marginTop: '8%',

                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  flex: 0.2,
                  position: 'relative',
                }}>
                <Icon
                  style={{
                    position: 'relative',
                    fontSize: 25,
                  }}
                  name="rupee"></Icon>
              </View>
              <View
                style={{
                  flex: 0.5,
                  position: 'relative',
                }}>
                <Text
                  style={{
                    color: Colors.text,
                    position: 'relative',
                    fontSize: 35,
                  }}>
                  100
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: '8%',
                bottom: 0,
                marginHorizontal: '5%',
                marginBottom: 5,
                position: 'relative',
                width: '90%',

                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableHighlight
                onPress={() => {
                  this.paytmPay()
                }}
                style={{
                  width: '45%',
                  height: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',

                  backgroundColor: Colors.accent,
                  opacity: 1,
                  borderRadius: 50,
                }}>
                <Text
                  style={{
                    color: Colors.white,
                  }}>
                  Pay
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  width: '45%',
                  height: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  borderColor: Colors.accent,
                  borderWidth: 2,
                }}>
                <Text
                  style={{
                    color: Colors.accent,
                  }}>
                  Decline
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      );
    }
    if (props.currentMessage.payTmPaid) {
      return (
        <View
          style={{
            borderTopRightRadius: 25,
            borderBottomRightRadius: 25,
            borderBottomLeftRadius: 25,
            borderTopLeftRadius: 0,
          }}>
          <View
            style={{
              width: 200,
              height: 150,
              borderRadius: 13,
              margin: 3,
              borderColor: Colors.paytmBorder,
              borderWidth: 2,
              borderStyle: 'dashed',
              flexDirection: 'column',
            }}>
            <View
              style={{
                position: 'relative',
                marginLeft: '8%',
                marginTop: '8%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  flex: 0.2,
                  position: 'relative',
                }}>
                <Icon
                  style={{
                    position: 'relative',
                    fontSize: 25,
                  }}
                  name="rupee"></Icon>
              </View>
              <View
                style={{
                  flex: 0.5,
                  position: 'relative',
                }}>
                <Text
                  style={{
                    color: Colors.text,
                    position: 'relative',
                    fontSize: 35,
                  }}>
                  100
                </Text>
              </View>
              <View
                style={{
                  flex: 0.2,
                  position: 'relative',
                }}>
                <IconCheck
                  style={{
                    position: 'relative',
                    fontSize: 25,
                    color: Colors.paytmSuccessIcon,
                  }}
                  name="checkcircle"></IconCheck>
              </View>
            </View>
            <View
              style={{
                marginTop: '8%',
                bottom: 0,
                marginHorizontal: '5%',
                marginBottom: 5,
                position: 'relative',
                width: '90%',

                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{}}>
                <Text
                  style={{
                    color: Colors.text,
                  }}>
                  Payment Successful
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={Colors.accent} />
        <ImageBackground
          source={require('../../assets/background.png')}
          style={{flex: 1,}}>
          <GiftedChat
            messages={this.props.messageState}
            messageIdGenerator={(messages)=> {
                return Math.round(Math.random() * 1000000)
            }}
            renderAvatarOnTop={true}
            renderCustomView={this.renderCustomView}
            alwaysShowSend={true}
            isAnimated={true}
            placeholder="Your assistant is waiting!!!"
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
            renderMessageImage={this.renderMessageImage}
            imageProps={{openImageViewer: this.openImageViewer}}
            renderSend={this.renderSend}
              renderActions={this.renderCustomActions}
            // renderComposer={this.renderAccessory}
            renderBubble={this.renderBubble}
            // renderMessage={this.renderMessage}
            parsePatterns={linkStyle => [
              {
                pattern: /#(\w+)/,
                // style: { ...linkStyle, color: 'red' },
                onPress: props => alert(`press on ${props}`),
              },
            ]}
          />
           <Modal
        visible={this.state.modalImageVisible}
        onRequestClose={() => {
          this.setState({modalImageVisible: false});
        }}
        transparent={true}
      >
        <ImageViewer
          imageUrls={this.state.imageUrl}
        />
      </Modal>
        </ImageBackground>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  {openChat, sendMessage},
)(ChatScreen);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  paymentContainer: {
    maxWidth: '55%',
    height: 130,
    marginLeft: '3%',

    flexDirection: 'column',
    paddingRight: '5%',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 5,
    borderColor: Colors.accent,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  paymentTopContainer: {
    //   position: "relative",
    marginLeft: '8%',
    marginTop: '8%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  rupeeContainer: {
    flex: 0.2,
    position: 'relative',
  },
  iconRupee: {
    position: 'relative',
    fontSize: 25,
  },
  amountContainer: {
    flex: 0.5,
    position: 'relative',
  },
  amount: {
    color: Colors.text,
    position: 'relative',
    fontSize: 35,
  },
  actionContainer: {
    marginTop: '8%',
    bottom: 0,
    marginHorizontal: '5%',
    marginBottom: 5,
    position: 'relative',
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  payButtonContainer: {
    width: '45%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: Colors.accent,
    opacity: 1,
    borderRadius: 50,
  },
  textPay: {
    color: Colors.white,
  },
  textDecline: {
    color: Colors.accent,
  },

  declineButtonContainer: {
    width: '45%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderColor: Colors.accent,
    borderWidth: 2,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
});
