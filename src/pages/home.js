import React, { Component } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import * as StyleUtils from '../utils/style-utils';
import { fetchUserStories } from '../data/actions/story-actions';
import { retrieveData, storeData } from '../routines/async-storage-routine';
import { setUserAvatar } from '../data/actions/avatar-actions';
import LogoElement from '../components/logo-element';
import OptionButtonElement from '../components/option-button-element';
import TextElement from '../components/text-element';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        retrieveData("user_avatar")
        .then(avatar => {
            if(avatar != null) {
                this.props.setUserAvatar(avatar);
            }
            else this.props.setUserAvatar("male_avatar_black");
        }).catch(error => {
            storeData("user_avatar", "male_avatar_black");
        });
    }

    render() {
        return (
            <View style={ style.main }>
                <View style={ style.viewButtons }>
                    <View style={ style.rowButtons }>
                        <TouchableOpacity style={ style.buttonContainer } onPress={ () => Actions.listenStory({ title: "Ouvir História" }) } activeOpacity={ 0.7 }>
                            <OptionButtonElement title="Ouvir História" icon="radio" styleIcon={ {width: 70, height: 70} }/>
                        </TouchableOpacity>
                        <TouchableOpacity style={ style.buttonContainer } onPress={ () => Actions.tellStory({ title: "Contar História" }) } activeOpacity={ 0.7 }>
                            <OptionButtonElement title="Contar História" icon="microphone" styleIcon={ {width: 70, height: 70} } />
                        </TouchableOpacity>
                    </View>
                    <View style={ style.rowButtons }>
                        <TouchableOpacity style={ style.buttonContainer } onPress={ () => Actions.myStories({ title: "Minhas Histórias" }) } activeOpacity={ 0.7 }>
                            <OptionButtonElement title="Histórias Gravadas" icon="folder_story" styleIcon={ {width: 90, height: 60} }/>
                        </TouchableOpacity>
                        <TouchableOpacity style={ style.buttonContainer } onPress={ () => Actions.changeAvatar({ title: "Mudar Personagem" }) } activeOpacity={ 0.7 }>
                            <OptionButtonElement title="Mudar Personagem" icon="male_avatar_black" styleIcon={ {width: 65, height: 65} } />
                        </TouchableOpacity>
                    </View>
                    <View style={ style.rowButtons }>
                        <TouchableOpacity style={ style.buttonContainer } onPress={ () => Actions.moreOptions({ title: "Mais Opções" }) } activeOpacity={ 0.7 }>
                            <OptionButtonElement title="Mais Opções" icon="more" styleIcon={ {width: 65, height: 65} }/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
// <View style={ style.header }>
//     <LogoElement styleLogo={ {width: 70, height: 70, marginVertical: 10} }/>
//     <TextElement text="Fábrica de Histórias" styleText={ style.textTitle }/>
// </View>

const mapDispatchToProps = dispatch => (
    {
        fetchUserStories: () => dispatch(fetchUserStories()),
        setUserAvatar: (avatar) => dispatch(setUserAvatar(avatar))
    }
);

const style = StyleSheet.create({
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
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
        bottom: 10
    }
});

export default connect(null, mapDispatchToProps)(Home);
