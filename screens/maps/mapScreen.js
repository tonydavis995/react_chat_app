import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
  StatusBar,
  BackHandler,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';
import IconLocation from 'react-native-vector-icons/MaterialIcons';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
let {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0019;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const API = 'AIzaSyAtGZAJvy1qfM8vs6I97ygKKu744XBiJNg';
import Colors from '../../constants/colors'

export default class MapScreen extends Component {
  constructor() {
    super();
    this.state = {
      modalLocationVisible: false,
      placeName: null,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }
  static navigationOptions = ({navigation}) => {
    return {
      headerTransparent: true,
      
    };
  };

  getUrlWithParameters(lat, long, API) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?';
    const location = `latlng=${lat},${long}`;
    const key = `&key=${API}`;
    return `${url}${location}${key}`;
  }
  updateState(location) {
    this.setState({
      region: {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    });
    this.getPlaces();
  }
  getPlaces() {
    const url = this.getUrlWithParameters(
      this.state.region.latitude,
      this.state.region.longitude,
      API,
    );
    console.log(url);
    fetch(url).then(data =>
      data.json().then(res => {
        this.setState({placeName: res.results[0].formatted_address});
        console.log(res.results[0].formatted_address);
      }),
    );
  }
  onMapRegionChange(region) {
    console.log(region);
    this.setState({
      region: {
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      },
    });
    this.getPlaces();
  }
  getCoordsFromName(location) {
    this.updateState({
      latitude: location.lat,
      longitude: location.lng,
    });
    this.setModalLocationVisible(false);
  }
  setModalLocationVisible(visible) {
    this.setState({modalLocationVisible: visible});
  }
  renderModalLocation() {
    const {modalLocationVisible} = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        onRequestClose={() => {
          this.setModalLocationVisible(false);
        }}
        visible={modalLocationVisible}>
        <StatusBar backgroundColor={Colors.white} />
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                this.setModalLocationVisible(false);
              }}>
              <IconLocation name="arrow-back" style={styles.backButtonIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <GooglePlacesAutocomplete
              //    style={{position: 'absolute', top: 50, width: 300, height: 50}}
              placeholder={'Search Location'}
              minLength={2}
              returnKeyType={'search'}
              styles={{
                textInputContainer: {
                  backgroundColor: Colors.white,
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                },
                textInput: {
                  marginLeft: 0,
                  marginRight: 0,
                  height: 40,
                  backgroundColor: Colors.mapTextBox,
                  borderRadius: 30,
                  color: Colors.mapText,
                  fontSize: 16,
                }
              }}
              listViewDisplayed={'auto'}
              fetchDetails={true}
              onPress={(data, details = null) => {
                console.log(details);
                this.getCoordsFromName(details.geometry.location);
              }}
              query={{
                key: API,
                language: 'en',
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={200}
            />
          </View>
        </View>
      </Modal>
    );
  }
  getLocation() {
    Geolocation.getCurrentPosition(
      position => {
        this.updateState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        // this.setState({
        //   region: {
        //     latitude: position.coords.latitude,
        //     longitude: position.coords.longitude,
        //     latitudeDelta: LATITUDE_DELTA,
        //     longitudeDelta: LONGITUDE_DELTA,
        //   },
        // });
      },
      error => console.log(error.message),
      {enableHighAccuracy: true, timeout: 5000},
    );
  }
  handleBackPress = () => {
    this.props.navigation.navigate('chat');
    return true;
  };
  goBack = () => {
    this.props.navigation.navigate('chat');
  };
  componentWillUnmount() {
    this.backHandler.remove()
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
    this.getLocation();
  }
  render() {
    const {modalLocationVisible} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        {modalLocationVisible && this.renderModalLocation()}
        <IconLocation onPress={this.goBack} name="arrow-back" style={{position: 'absolute', zIndex: 2, top: 50, color: Colors.accent, left: 30, fontSize: 30}} />
        {this.state.region['latitude'] ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            zoomEnabled={false}
            zoomTapEnabled={false}
            showsUserLocation={true}
            loadingEnabled={true}
            scrollEnabled={true}
            style={styles.map}
            animateToRegion={{region: this.state.region, duration: 1000}}
            onRegionChangeComplete={reg => this.onMapRegionChange(reg)}
            region={this.state.region}>
            <MapView.Marker coordinate={this.state.region} />
          </MapView>
        ) : null}
        <View style={styles.mapSearch}>
          <View style={styles.crosshair}>
            <IconLocation
              onPress={() => {
                this.getLocation();
              }}
              name="my-location"
              style={styles.crosshairIcon}
            />
          </View>
          <View style={styles.mapDetails}>
            <View style={styles.mapInput}>
              <View style={styles.mapBox}>
                <Text style={styles.mapText}>Address:</Text>
              </View>

              <View style={styles.addressBox}>
                <Icon name="home" style={styles.instructionIcon} />

                <TextInput
                  keyboardType="default"
                  placeholder={'House Name | Floor'}
                  style={styles.instruction}></TextInput>
              </View>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setModalLocationVisible(true);
                }}>
                <View style={styles.instructionBox}>
                  <Icon name="map-pin" style={styles.locationIcon} />
                  <TextInput
                    keyboardType="default"
                    editable={false}
                    multiline={true}
                    numberOfLines={4}
                    value={this.state.placeName}
                    placeholder={'Your Address'}
                    style={styles.addressInput}></TextInput>
                </View>
              </TouchableWithoutFeedback>

              <TouchableOpacity style={styles.buttonBox}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}> Send Location</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 0.7,
    zIndex: 0,
  },
  mapSearch: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  crosshair: {
    height: 50,
    width: '100%',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
  },
  crosshairIcon: {
    color: Colors.accent,
    textAlign: 'center',

    marginHorizontal: 20,
    fontSize: 35,
  },
  mapDetails: {
    height: 300,
    position: 'relative',
    width: '100%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  mapInput: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  mapBox: {
    flex: 0.2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  addressBox: {
    flex: 0.2,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.mapTextBox,
    borderRadius: 18,
    height: 40,
    marginBottom: 10,
  },
  instructionBox: {
    flex: 0.3,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.mapTextBox,
    borderRadius: 18,
    height: 40,
    marginBottom: 10,
  },
  buttonBox: {
    flex: 0.3,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 16,
  },
  locationIcon: {
    flex: 0.1,
    color: Colors.accent,
    marginHorizontal: 10,
    fontSize: 20,
  },
  addressInput: {
    flex: 0.9,
  },
  instructionIcon: {
    flex: 0.1,
    color: Colors.accent,
    marginHorizontal: 10,
    fontSize: 20,
  },
  instruction: {
    flex: 0.9,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.white,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.accent,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 1,
  },
});
