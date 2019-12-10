import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default props => (
    <Image style={ props.styleLogo } source={ require('../assets/elements/icons/logo.png') } resizeMode="contain"/>
);
