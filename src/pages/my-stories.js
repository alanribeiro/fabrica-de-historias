import React, { Component } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import Sound from 'react-native-sound';

import * as StyleUtils from '../utils/style-utils';
import { images } from '../utils/image-utils';
import { fetchUserStories } from '../data/actions/story-actions';
import HeaderElement from '../components/header-element';
import MyStoriesListElement from '../components/my-stories-list-element';
import TextElement from '../components/text-element';

class MyStories extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUserStories();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.fetchedStories != nextProps.fetchedStories || this.props.userStories != nextProps.userStories) {
            return true;
        }
        else return false;
    }

   renderStoryList = (stories) => {
       return (
           <MyStoriesListElement data={ stories }/>
       );
   }

    render() {
        if(this.props.fetchedStories) {
            if(this.props.userStories.length > 0) {
                return (
                    <View style={ style.main }>
                        <HeaderElement title={ this.props.title }/>
                        <ScrollView>
                            { this.renderStoryList(this.props.userStories) }
                        </ScrollView>
                    </View>
                );
            }
            else return (
                <View style={ style.main }>
                    <HeaderElement title={ this.props.title }/>
                    <View style={ style.viewContent }>
                        <Image style={ style.avatar } source={ images[this.props.userAvatar] } resizeMode="contain"/>
                        <TextElement text="Você não gravou nenhuma história ainda" styleText={ style.textEmpty } viewText={ style.viewTextEmpty }/>
                    </View>
                </View>
            );
        }
        else return (
            <View style={ [style.main, {alignItems: "center", justifyContent: "center"}] }>
                <ActivityIndicator size={ 70 } color={ StyleUtils.secondary_color }/>
                <TextElement text="Carregando Histórias..." styleText={ style.textLoading }/>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => (
    {
        fetchUserStories: () => dispatch(fetchUserStories())
    }
);

const mapStateToProps = state => (
    {
        fetchedStories: state.StoryReducer.fetchedStories,
        userAvatar: state.AvatarReducer.userAvatar,
        userStories: state.StoryReducer.userStories
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

export default connect(mapStateToProps, mapDispatchToProps)(MyStories);
