import React from 'react';

2

import { StatusBar } from 'expo-status-bar';

3

import { Stylesheet, View } from 'react-native';

4

import Cesta from './src/Telas/cesta'; //ου. /src/Telas/Cesta, conforme o nome do arquivo

5

import {Dimensions) from 'react-native';

6

7

const { width, height } = Dimensions.get ('window');

8

export default function App() {

9

return (

1

<View style={estilos.container}>

2

<Cesta />

<StatusBar style="auto" />

</View>

5

);

5}

const estilos StyleSheet.create({

container: {

flex: 1,

22

23

24

backgroundColor: '#fff',

19 20 21 }, justifyContent: 'flex-start', // delus a inages no topo

alignItems: 'center',

Prettier {}

Editor Expo

Bar
