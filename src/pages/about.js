import React from 'react';
import { StyleSheet, View } from 'react-native';

import * as StyleUtils from '../utils/style-utils';
import HeaderElement from '../components/header-element';
import TextElement from '../components/text-element';

export default props => (
    <View style={ style.main }>
        <HeaderElement title="Informações"/>
        <View style={ style.appInformation }>
            <TextElement text="Fábrica de Histórias" styleText={ style.appInformationText }/>
            <TextElement text="Versão 1.0" styleText={ style.appInformationText }/>
        </View>
        <View style={ style.contactInformation }>
            <TextElement text="Desenvolvido por: Alan Ribeiro" styleText={ style.textInformation }/>
            <TextElement text="alanribeirodsantos@gmail.com" styleText={ style.textInformation }/>
            <TextElement text="(88) 99654-2426" styleText={ style.textInformation }/>
        </View>
    </View>
);

const style = StyleSheet.create({
    appInformation: {
        marginVertical: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    appInformationText: {
        marginVertical: 10,
        fontFamily: StyleUtils.font_bold,
        color: StyleUtils.secondary_font_color,
        fontSize: 30
    },
    contactInformation: {
        alignItems: "center",
        justifyContent: "center"
    },
    main: {
        flex: 1,
        backgroundColor: StyleUtils.primary_color
    },
    textInformation: {
        marginVertical: 10,
        fontFamily: StyleUtils.font_bold,
        color: StyleUtils.secondary_font_color,
        fontSize: 22
    }
});
