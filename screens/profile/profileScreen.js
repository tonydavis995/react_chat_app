import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Modal,
  StatusBar,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PhotoUpload from 'react-native-photo-upload';
import Colors from '../../constants/colors'
import {connect} from 'react-redux';
import { addAvatar, addEmail, addName} from '../../store/actions/auth';

const mapStateToProps = state => {
  return {
    nameState: state.nameReducer,
    loginState: state.loginReducer
  };
};
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalNameVisible: false,
      modalNumberVisible: false,
      modalEmailVisible: false,
      modalFeedBackVisible: false,
    };
  }
  setModalNameVisible(visible) {
    this.setState({modalNameVisible: visible});
  }
  setModalNumberVisible(visible) {
    this.setState({modalNumberVisible: visible});
  }
  setModalEmailVisible(visible) {
    this.setState({modalEmailVisible: visible});
  }
  setModalFeedBackVisible(visible) {
    this.setState({modalFeedBackVisible: visible});
  }
  componentDidMount() {}
  renderModalName() {
    const {modalNameVisible} = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        onRequestClose={() => {
          this.setModalNameVisible(false);
        }}
        visible={modalNameVisible}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                this.setModalNameVisible(false);
              }}>
              <Icon name="arrow-back" style={styles.backButtonIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <View style={styles.inputModal}>
              <Text style={styles.labelModal}>Name</Text>
              <TextInput
                value={'Tony Davis'}
                keyboardType="default"
                style={styles.textInputModal}></TextInput>
            </View>
            <View style={styles.saveButtonContainer}>
              <TouchableHighlight
                style={styles.saveButton}
                onPress={() => console.log('pressed')}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  renderModalNumber() {
    const {modalNumberVisible} = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        onRequestClose={() => {
          this.setModalNumberVisible(false);
        }}
        visible={modalNumberVisible}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                this.setModalNumberVisible(false);
              }}>
              <Icon name="arrow-back" style={styles.backButtonIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <View style={styles.inputModal}>
              <Text style={styles.labelModal}>Phone Number</Text>
              <TextInput
                value={'7012912325'}
                keyboardType="numeric"
                style={styles.textInputModal}></TextInput>
            </View>
            <View style={styles.saveButtonContainer}>
              <TouchableHighlight
                style={styles.saveButton}
                onPress={() => console.log('pressed')}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderModalEmail() {
    const {modalEmailVisible} = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        onRequestClose={() => {
          this.setModalEmailVisible(false);
        }}
        visible={modalEmailVisible}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                this.setModalEmailVisible(false);
              }}>
              <Icon name="arrow-back" style={styles.backButtonIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <View style={styles.inputModal}>
              <Text style={styles.labelModal}>Email</Text>
              <TextInput
                placeholder={'Enter your email address'}
                keyboardType="email-address"
                style={styles.textInputModal}></TextInput>
            </View>
            <View style={styles.saveButtonContainer}>
              <TouchableHighlight
                style={styles.saveButton}
                onPress={() => console.log('pressed')}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderModalFeedBack() {
    const {modalFeedBackVisible} = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        onRequestClose={() => {
          this.setModalFeedBackVisible(false);
        }}
        visible={modalFeedBackVisible}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                this.setModalFeedBackVisible(false);
              }}>
              <Icon name="arrow-back" style={styles.backButtonIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <View style={styles.inputModal}>
              <Text style={styles.labelModal}>Feedback</Text>
              <TextInput
                placeholder={`We're extremely resilient founders, committed to make your life easier, we are yet to provide the very best service. Give your feedback and make us better!`}
                multiline={true}
                numberOfLines={6}
                keyboardType="default"
                style={styles.textInputAreaModal}></TextInput>
            </View>
            <View style={styles.saveButtonContainer}>
              <TouchableHighlight
                style={styles.saveButton}
                onPress={() => console.log('pressed')}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const {
      modalNameVisible,
      modalNumberVisible,
      modalEmailVisible,
      modalFeedBackVisible,
    } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.accent} />
        {modalNameVisible && this.renderModalName()}
        {modalNumberVisible && this.renderModalNumber()}
        {modalEmailVisible && this.renderModalEmail()}
        {modalFeedBackVisible && this.renderModalFeedBack()}

        <PhotoUpload
          containerStyle={styles.avatarContainer}
          onPhotoSelect={avatar => {
            if (avatar) {
              console.log('Image base64 string: ', avatar);
            }
          }}>
          {/* <View style={styles.avatarEditContainer}> */}
          <Icon name="edit" style={styles.editIcon} />

          <Image
            style={styles.avatar}
            resizeMode="cover"
            source={{
              uri: 'https://placeimg.com/140/140/any',
            }}
          />
          {/* </View> */}
        </PhotoUpload>
        <View style={styles.inputContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.setModalNameVisible(true);
            }}>
            <View style={styles.input}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                value={'Tony Davis'}
                editable={false}
                style={styles.textInput}></TextInput>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.setModalNumberVisible(true);
            }}>
            <View style={styles.input}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                value={'7012912325'}
                editable={false}
                style={styles.textInput}></TextInput>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.setModalEmailVisible(true);
            }}>
            <View style={styles.input}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder={'Enter your email'}
                editable={false}
                style={styles.textInput}></TextInput>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.feedbackContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.setModalFeedBackVisible(true);
            }}>
            <View style={styles.input}>
              <Text style={styles.label}>FeedBack</Text>
              <TextInput
                placeholder={`We're extremely resilient founders, committed to make your life easier, we are yet to provide the very best service. 
Give your feedback and make us better!`}
                multiline={true}
                numberOfLines={6}
                editable={false}
                style={styles.textInputArea}></TextInput>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.logoutButton}
            onPress={() => console.log('pressed')}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
ProfileScreen.navigationOptions = () => {
  return {
    headerTitle: 'Profile',
  };
};
export default connect(
  mapStateToProps,
  {addAvatar, addEmail, addName},
)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    flexDirection: 'column',
  },

  avatarContainer: {
    flex: 0.2,
    position: 'relative',

    marginBottom: 10,
  },
  avatarEditContainer: {
    flex: 1,
    flexDirection: 'row',

    position: 'relative',
    width: '100%',
    margin: 'auto',
  },
  editIcon: {
    fontSize: 30,
    color: Colors.white,
    zIndex: 1,
    bottom: 20,
    right: 20,
    position: 'absolute',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    top: 0,
    left: 0,
    zIndex: 0,
  },
  inputContainer: {
    flex: 0.4,
    marginBottom: 10,
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  feedbackContainer: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  input: {
    width: '100%',
    borderBottomColor: Colors.paytmBorder,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 12,
  },
  buttonContainer: {
    flex: 0.2,
    paddingVertical: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  textInput: {
    height: 50,
    fontSize: 16,
    color: Colors.text,
  },
  textInputArea: {
    height: 100,
    fontSize: 13,
    borderBottomWidth: 1,
    borderBottomColor: Colors.paytmBorder,
    color: 'black',
  },
  logoutButton: {
    width: '80%',
    margin: 10,
    height: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: Colors.accent,
  },
  logoutText: {
    fontSize: 15,
    color: Colors.white,
  },
  modal: {
    flex: 1,
    flexDirection: 'column',
  },
  modalHeader: {
    height: 60,
    width: '100%',
    backgroundColor: Colors.white,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backButton: {
    margin: 20,
  },
  backButtonIcon: {
    fontSize: 30,
    color: Colors.accent,
  },
  modalBody: {
    marginHorizontal: 20,
    marginVertical: 40,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  inputModal: {
    width: '100%',
    borderBottomColor: Colors.accent,
    borderBottomWidth: 1,
  },
  labelModal: {
    fontSize: 12,
  },
  textInputModal: {
    height: 50,
    fontSize: 16,
    color: Colors.text,
  },
  textInputAreaModal: {
    height: 200,
    fontSize: 13,
    borderBottomWidth: 1,
    borderBottomColor: Colors.accent,
    color: 'black',
  },
  saveButtonContainer: {
    paddingVertical: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  saveButton: {
    width: '80%',
    margin: 10,
    height: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: Colors.accent,
  },
  saveText: {
    fontSize: 15,
    color: Colors.white,
  },
});
