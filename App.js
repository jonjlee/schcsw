import React from 'react';
import { createAppContainer } from 'react-navigation';
import Navigator from './app/Navigator';

const AppContainer = createAppContainer(Navigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
