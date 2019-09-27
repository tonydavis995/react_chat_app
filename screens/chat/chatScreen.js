import React from 'react';
import {View, StyleSheet, Image, TouchableHighlight, Text} from 'react-native';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconCheck from 'react-native-vector-icons/AntDesign';
import IconSend from 'react-native-vector-icons/EvilIcons';
import AccessoryBar from '../../components/accessoryBar'
// import emojiUtils from 'emoji-utils';

export default class ChatScreen extends React.Component {
  state = {
    messages: [],
  };
  //test

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'https://placeimg.com/140/140',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: Math.round(Math.random() * 1000000),

          createdAt: new Date(),
          user: {
            _id: 3,
            name: 'React Native',
            avatar: require('../../assets/images/paytm.png'),
          },
          sent: true,
          received: true,
          payTmPaid: {
            latitude: 48.864601,
            longitude: 2.398704,
          },
        },
        {
          _id: 3,
          text: 'Sorry',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
          image: 'https://placeimg.com/140/140/any',
          location: {
            latitude: 48.864601,
            longitude: 2.398704,
          },
        },
        // {
        //     _id: 9,
        //     text: 'Chat with US',
        //     createdAt: new Date(),
        //     system: true
        //   },
      ],
    });
  }

  onSend(messages = []) {
    console.log(messages);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  renderMessage(props) {
    const {
      currentMessage: {text: currText},
    } = props;

    let messageTextStyle;

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === 'android' ? 34 : 30,
      };
    }
  }
  renderSend(props) {
    return (
        <Send
            {...props}
        >
            <View style={{flexDirection : 'row', alignItems: 'center', justifyContent: 'flex-start',marginRight: 12, marginBottom: 12}}>
            <IconSend style={{ fontSize: 35, color: '#4A90E2' }}
                  
                  name="sc-telegram"></IconSend>
            </View>
        </Send>
    );
}
  renderActions = () => <AccessoryBar  />
  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'rgba(74,144,226,1)',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 25,
            borderBottomLeftRadius: 25,
            shadowColor: 'black',
            shadowOpacity: 0.2,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 3,
            elevation: 3,
          },
          left: {
            paddingHorizontal: 10,
            paddingTop: 5,
            backgroundColor: '#F7F8FB',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 25,
            borderBottomRightRadius: 25,
            borderBottomLeftRadius: 25,
            shadowColor: 'black',
            shadowOpacity: 0.2,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 3,
            elevation: 3,
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
              borderColor: 'rgba(74,144,226,1)',
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
                    color: '#121212',
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
                onPress={() => console.log('pressed')}
                style={{
                  width: '45%',
                  height: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',

                  backgroundColor: 'rgba(74,144,226,1)',
                  opacity: 1,
                  borderRadius: 50,
                }}>
                <Text
                  style={{
                    color: 'white',
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
                  borderColor: 'rgba(74,144,226,1)',
                  borderWidth: 2,
                }}>
                <Text
                  style={{
                    color: 'rgba(74,144,226,1)',
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
              borderColor: '#dddddd',
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
                    color: '#121212',
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
                    color: '#1ed761',
                   
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
              <View
                style={{
                  
                }}>
                <Text
                  style={{
                    color: '#121212',
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
      <GiftedChat
        messages={this.state.messages}
        // messageIdGenerator={(messages)=> {
        //     return '33434'
        // }}
        renderAvatarOnTop={true}
        renderCustomView={this.renderCustomView}
        alwaysShowSend={true}
        isAnimated={true}
        placeholder="Your assistant is waiting!!!"
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
        renderSend ={this.renderSend}
        renderActions = {this.renderActions}
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
    );
  }
}

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
    borderColor: 'rgba(74,144,226,1)',
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
    color: '#121212',
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

    backgroundColor: 'rgba(74,144,226,1)',
    opacity: 1,
    borderRadius: 50,
  },
  textPay: {
    color: 'white',
  },
  textDecline: {
    color: 'rgba(74,144,226,1)',
  },

  declineButtonContainer: {
    width: '45%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderColor: 'rgba(74,144,226,1)',
    borderWidth: 2,
  },
});
