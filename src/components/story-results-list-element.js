import React from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import ResultItemElement from '../components/result-item-element';

export default props => (
    <FlatList
    style={ style.main }
    data={ props.data }
    numColumns={ 2 }
    contentContainerStyle={ props.data.length > 1 ? style.listContentMultiple : style.listContentSingle }
    renderItem={ ({item}) => <ResultItemElement result={ item } title={ item.date }/> }
    keyExtractor={ item => props.data.indexOf(item).toString() }
    />
);

const style = StyleSheet.create({
    listContentMultiple: {
        flexDirection: "column",
        alignItems: "center"
    },
    listContentSingle: {
        flexDirection: "row"
    },
    main: {
        marginVertical: 10
    }
});
