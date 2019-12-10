import React from 'react';
import { Text, View } from 'react-native';

export default props => (
    <View style={ props.viewText }>
        <Text style={ props.styleText }>{ props.text }</Text>
    </View>
);
