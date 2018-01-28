import React from 'react';
import {
  Text,
  Image,
  Platform,
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import FadeIn from 'react-native-fade-in-image';
import { withNavigation } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import NavigationOptions from '../config/NavigationOptions';
import { Ionicons } from '@expo/vector-icons';

import state from '../state';

import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { BoldText, RegularText, SemiBoldText } from '../components/StyledText';
import { Colors, FontSizes } from '../constants';

// TODO: Hard code password for now
// Add top nav bar with Back button
//      on back button press, redirect to Home screen
// alternately, is there a home button for the top nav bar?
//
// If password is correct, enable capo mode (using AsyncStorage?) and go back to CapoHome.js
// If password is incorrect, show invalid password message

@withNavigation
export default class CapoLogin extends React.Component {
  static navigationOptions = {
    title: 'Capo Login',
    ...NavigationOptions
  };

  render() {
    return (
      <LoadingPlaceholder>
        <Text style={styles.instructions}>Enter password to unlock</Text>
        <TextInput onChangeText={this._setPassword} />
        <ClipBorderRadius>
          <RectButton
            style={styles.bigButton}
            onPress={this._handlePressSubmitButton}
            underlayColor="#fff"
          >
            <Ionicons
              size={23}
              style={{
                color: '#fff',
                marginTop: 3,
                backgroundColor: 'transparent',
                marginRight: 5
              }}
            />
            <SemiBoldText style={styles.bigButtonText}>Submit</SemiBoldText>
          </RectButton>
        </ClipBorderRadius>
        <Text style={styles.error}>Invalid password</Text>
      </LoadingPlaceholder>
    );
  }

  _setPassword = password => {
    state.password = password;
  };

  _handlePressSubmitButton = () => {
    if (state.password === 'beccaisprettytoday') {
      state.unlocked = true;
      this.props.navigation.navigate('CapoHome');
    }
  };
}

const ClipBorderRadius = ({ children, style }) => {
  return (
    <View
      style={[
        { borderRadius: BORDER_RADIUS, overflow: 'hidden', marginTop: 10 },
        style
      ]}
    >
      {children}
    </View>
  );
};

const BORDER_RADIUS = 3;

const styles = StyleSheet.create({
  instructions: {},
  error: {
    color: '#FF0000'
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    ...Platform.select({
      ios: {
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 2, height: 2 }
      },
      android: {
        elevation: 3
      }
    })
  },
  bigButton: {
    backgroundColor: Colors.green,
    paddingHorizontal: 15,
    height: 50,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    flexDirection: 'row'
  },
  bigButtonText: {
    fontSize: FontSizes.normalButton,
    color: '#fff',
    textAlign: 'center'
  }
});
