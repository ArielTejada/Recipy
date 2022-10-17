import React, {useState} from "react";
import { NavigationContainer } from '@react-navigation/native';
import BottomNavBar from "./navigation/bottomNavBar";
import { StoreProvider, createStore } from "easy-peasy";
import model from './state/model'
import * as Font from 'expo-font';

const store = createStore(model);

let customFonts = {
  'GrandHotel-Regular': require('./fonts/GrandHotel-Regular.ttf'),
  'Festive-Regular': require('./fonts/Festive-Regular.ttf'),
  'AmaticSC-Regular': require('./fonts/AmaticSC-Regular.ttf'),
  'AmaticSC-Bold': require('./fonts/AmaticSC-Bold.ttf'),
  'Courgette-Regular': require('./fonts/Courgette-Regular.ttf'),
};

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return null;
    }
  
    return (
      <StoreProvider store={store}>
        <NavigationContainer>
          <BottomNavBar/>
        </NavigationContainer>
      </StoreProvider>
    );

}
}
