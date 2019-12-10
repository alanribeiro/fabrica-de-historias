import React, { Component } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import * as StyleUtils from '../utils/style-utils';
import { images } from '../utils/image-utils';
import { retrieveData } from '../routines/async-storage-routine';
import HeaderElement from '../components/header-element';
import StoryResultsListElement from '../components/story-results-list-element';
import TextElement from '../components/text-element';

class ResultsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedResults: false,
            storyResults: []
        }
    }

    componentDidMount() {
        retrieveData(`story${JSON.parse(this.props.story).number}Results`)
        .then(results => {
            if(results != null) {
                this.setState({ fetchedResults: true, storyResults: JSON.parse(results) });
            }
            else {
                this.setState({ fetchedResults: true });
            }
        }).catch(error => {
            this.setState({ fetchedResults: true });
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.storyResults != nextState.storyResults || this.state.fetchedResults != nextState.fetchedResults) {
            return true;
        }
        else return false;
    }

   renderStoryList = (stories) => {
       return (
           <StoryResultsListElement data={ stories }/>
       );
   }

    render() {
        if(this.state.fetchedResults) {
            if(this.state.storyResults.length > 0) {
                return (
                    <View style={ style.main }>
                        <HeaderElement title={ this.props.title }/>
                        <ScrollView>
                            { this.renderStoryList(this.state.storyResults) }
                        </ScrollView>
                    </View>
                );
            }
            else return (
                <View style={ style.main }>
                    <HeaderElement title={ this.props.title }/>
                    <View style={ style.viewContent }>
                        <Image style={ style.avatar } source={ images[this.props.userAvatar] } resizeMode="contain"/>
                        <TextElement text="Não existem resultados para esta história ainda" styleText={ style.textEmpty } viewText={ style.viewTextEmpty }/>
                    </View>
                </View>
            );
        }
        else return (
            <View style={ [style.main, {alignItems: "center", justifyContent: "center"}] }>
                <ActivityIndicator size={ 70 } color={ StyleUtils.secondary_color }/>
                <TextElement text="Carregando Resultados..." styleText={ style.textLoading }/>
            </View>
        );
    }
}

const mapStateToProps = state => (
    {
        userAvatar: state.AvatarReducer.userAvatar
    }
);

const style = StyleSheet.create({
    avatar: {
        height: 150
    },
    main: {
        flex: 1,
        backgroundColor: StyleUtils.primary_color
    },
    textEmpty: {
        textAlign: "center",
        fontFamily: StyleUtils.font_bold,
        color: StyleUtils.secondary_font_color,
        fontSize: StyleUtils.empty_data_font_size
    },
    textLoading: {
        fontFamily: StyleUtils.font_bold,
        color: StyleUtils.secondary_font_color
    },
    viewContent: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 30
    },
    viewTextEmpty: {
        marginVertical: 20,
        alignSelf: "center"
    }
});

export default connect(mapStateToProps, null)(ResultsPage);
