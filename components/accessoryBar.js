import Feather from 'react-native-vector-icons/EvilIcons';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Colors from '../constants/colors'

// import { getLocationAsync, pickImageAsync, takePictureAsync } from './mediaUtils';

export default class AccessoryBar extends React.Component {



pickImageAsync(onSend){
  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);
   
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
    
      // const source = { uri: response.path };

      // You can also display the image using data:
      const source = { uri: 'data:image/jpeg;base64,' + response.data };
      onSend([{ image: source.uri}]);
     
    }
  });
}
pickLocationAsync(onGoMap){
  onGoMap()
}
  render() {
    const {onSend, onGoMap} = this.props;
    return (
      <View  style={styles.container}>
        <Button onPress={() =>  this.pickLocationAsync(onGoMap)}  name="location" />
        {/* <Button  name="camera" /> */}
        <Button onPress={() => this.pickImageAsync(onSend)} name="image" />
      </View>
    );
  }
}

const Button = ({size = 28, color = Colors.accent, ...props}) => (
  <TouchableOpacity >
    <Feather style={{padding: 5}} size={size} color={color} {...props} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
