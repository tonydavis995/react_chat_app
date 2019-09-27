import Feather from 'react-native-vector-icons/EvilIcons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// import { getLocationAsync, pickImageAsync, takePictureAsync } from './mediaUtils';

export default class AccessoryBar extends React.Component {

  render() {
    const { onSend } = this.props;
    return (
      <View style={styles.container}>
        <Button  name="location" />
        {/* <Button  name="camera" /> */}
        <Button  name="image" />
      </View>
    );
  }

}

const Button = ({size = 28, color = '#4A90E2', ...props }) => (
  <TouchableOpacity >
    <Feather style={{ padding: 5}} size={size} color={color} {...props} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    
    marginLeft: 10, marginBottom: 10,
    flexDirection : 'row', alignItems: 'center', justifyContent: 'flex-start'
  },
});
