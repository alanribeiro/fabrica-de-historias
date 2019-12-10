import React, { Component } from 'react';
import { FlatList, Linking, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import * as StyleUtils from '../utils/style-utils';
import * as ResultsModuleUtils from '../utils/results-module-utils';
import HeaderElement from '../components/header-element';
import TextElement from '../components/text-element';

const InfoElement = ({text}) => {
    return (
        <View style={ style.viewInfoElement }>
            <TextElement text={ text } styleText={ style.infoText }/>
        </View>
    );
}

export default class ResultsDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            informations: [
                {
                    key: 1,
                    text: "A nota de corte estabelecida pelo teste é de 22 pontos"
                },
                {
                    key: 2,
                    text: "Se o idoso possuir baixo nível de alfabetização (menor que 4 anos) ou analfabetismo, a nota de corte estabelecida pelo teste é de 14 pontos"
                },
                {
                    key: 3,
                    text: "O status 'Considerações' indica que houve erros. Se o idoso possui baixo nível de alfabetização ou analfabetismo, deve-se considerar 'Excelente' a nota igual ou acima de 14 pontos. Caso contrário, os erros podem ter sido causados dificuldades de atenção, compreensão ou percepção"
                },
                {
                    key: 4,
                    text: "O status 'Atenção' indica que houve erros mais graves. Os erros podem ter sido causados por dificuldades de atenção, compreensão, raciocínio e até memorização. Neste caso, sugere-se levar o idoso a um profissional especializado em neurologia ou gerontologia"
                },
                {
                    key: 5,
                    text: "O teste é baseado no conteúdo do Mini Exame do Estado Mental, modelo médico criado em 1975 e amplamente utilizado para o rastreamento de disfunções cognitivas. O teste não substitui uma avaliação mais detalhada e feito por um profissional especializado, portanto não serve como diagnóstico mas sim para indicar funções que precisam ser investigadas"
                }
            ]
        }
    }

    checkColor = (score) => {
        if(score >= ResultsModuleUtils.scholar_score) {
            return StyleUtils.option_yes_color;
        }
        else if(score >= ResultsModuleUtils.no_scholar_score && score < ResultsModuleUtils.scholar_score) {
            return StyleUtils.tertiary_color;
        }
        else return StyleUtils.option_no_color;
    }

    render() {
        return (
            <ScrollView style={ style.main }>
                <HeaderElement title="Resultados"/>
                <View style={ style.content }>
                    <TextElement text={ `Resultados de ${JSON.parse(this.props.result).date}` } styleText={ style.textTitle } viewText={ style.viewTitle }/>
                    <View style={ style.containerScore }>
                        <View style={ style.viewScore }>
                            <TextElement text="A nota foi:" styleText={ style.scoreInfo }/>
                            <TextElement text={ JSON.parse(this.props.result).score } styleText={ [style.score, {color: this.checkColor(JSON.parse(this.props.result).score) }] }/>
                        </View>
                        <View style={ style.viewLegend }>
                            <View style={ style.legendContainer }>
                                <View style={ [style.circle, {backgroundColor: StyleUtils.option_yes_color}] }></View>
                                <TextElement text="Excelente" styleText={ style.legendText }/>
                            </View>
                            <View style={ style.legendContainer }>
                                <View style={ [style.circle, {backgroundColor: StyleUtils.tertiary_color}] }></View>
                                <TextElement text="Considerações" styleText={ style.legendText }/>
                            </View>
                            <View style={ style.legendContainer }>
                                <View style={ [style.circle, {backgroundColor: StyleUtils.option_no_color}] }></View>
                                <TextElement text="Atenção" styleText={ style.legendText }/>
                            </View>
                        </View>
                    </View>
                    <View style={ style.viewInfo }>
                        <TextElement text="Confira abaixo algumas informações sobre o teste:" styleText={ [style.scoreInfo, {textAlign: "center"}] } viewText={ style.viewInfoTitle }/>
                        <FlatList
                        contentContainerStyle={ {alignItems: "center"} }
                        data={ this.state.informations }
                        renderItem={ ({item}) => <InfoElement text={ item.text }/> }
                        keyExtractor={ item => item.key.toString() }
                        />
                    </View>
                    <View style={ style.viewLink }>
                        <TextElement text="Você pode encontrar informações sobre o teste clicando abaixo" styleText={ style.textLink }/>
                        <TouchableOpacity onPress={ () => Linking.openURL("https://aps.bvs.br/apps/calculadoras/?page=11") } activeOpacity={ 0.7 }>
                            <TextElement text="Mini Exame do Estado Mental" styleText={ style.link } viewText={ {marginVertical: 15} }/>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const style = StyleSheet.create({
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    containerScore: {
        marginVertical: 20
    },
    infoText: {
        fontFamily: StyleUtils.font_bold,
        fontSize: StyleUtils.results_info_font_size,
        color: StyleUtils.secondary_font_color,
        lineHeight: 22,
        textAlign: "center"
    },
    legendContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    legendText: {
        fontFamily: StyleUtils.font_bold,
        color: StyleUtils.secondary_font_color,
        fontSize: StyleUtils.results_legend_font_size
    },
    link: {
        fontFamily: StyleUtils.font_bold,
        color: StyleUtils.tertiary_color,
        fontSize: StyleUtils.results_legend_font_size,
        textAlign: "center"
    },
    main: {
        flex: 1,
        backgroundColor: StyleUtils.primary_color
    },
    scoreInfo: {
        fontFamily: StyleUtils.font_bold,
        fontSize: StyleUtils.header_font_size,
        color: StyleUtils.secondary_font_color
    },
    score: {
        fontFamily: StyleUtils.font_bold,
        fontSize: StyleUtils.score_font_size
    },
    textLink: {
        fontFamily: StyleUtils.font_bold,
        fontSize: StyleUtils.results_info_font_size,
        color: StyleUtils.secondary_font_color,
        textAlign: "center"
    },
    textTitle: {
        fontFamily: StyleUtils.font_bold,
        fontSize: StyleUtils.header_title_font_size,
        color: StyleUtils.secondary_font_color
    },
    viewInfoElement: {
        flexDirection: "row",
        paddingHorizontal: 15,
        marginVertical: 10
    },
    viewInfoTitle: {
        marginVertical: 20
    },
    viewLegend: {
        flexDirection: "row",
        marginVertical: 10,
        marginHorizontal: 20,
        justifyContent: "space-between"
    },
    viewLink: {
        marginTop: 20,
        paddingHorizontal: 15
    },
    viewScore: {
        alignItems: "center",
        justifyContent: "center"
    },
    viewTitle: {
        alignSelf: "center",
        marginVertical: 20
    }
});
