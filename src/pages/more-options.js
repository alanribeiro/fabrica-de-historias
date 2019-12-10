import React, { Component } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import * as StyleUtils from '../utils/style-utils';
import HeaderElement from '../components/header-element';
import OptionButtonElement from '../components/option-button-element';

export default class MoreOptions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={ style.main }>
                <HeaderElement title={ this.props.title }/>
                <View style={ style.viewButtons }>
                    <View style={ style.rowButtons }>
                        <TouchableOpacity style={ style.buttonContainer } onPress={ () => Actions.needHelp({ title: "Preciso de Ajuda" }) } activeOpacity={ 0.7 }>
                            <OptionButtonElement title="Preciso de Ajuda" icon="help" styleIcon={ {width: 65, height: 65} }/>
                        </TouchableOpacity>
                        <TouchableOpacity style={ style.buttonContainer } onPress={ () => Actions.results({ title: "Resultados" }) } activeOpacity={ 0.7 }>
                            <OptionButtonElement title="Resultados" icon="folder_results" styleIcon={ {width: 100, height: 70} }/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    main: {
        flex: 1,
        backgroundColor: StyleUtils.primary_color
    },
    rowButtons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15
    },
    textTitle: {
        fontSize: StyleUtils.header_title_font_size,
        fontFamily: StyleUtils.font_black,
        color: StyleUtils.secondary_font_color
    },
    viewButtons: {
        width: Dimensions.get("window").width,
        position: "absolute",
        top: 100
    }
});
