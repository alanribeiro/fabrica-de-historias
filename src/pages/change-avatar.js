import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import * as StyleUtils from '../utils/style-utils';
import { disableChangeAvatarStatus, saveSelectedAvatar } from '../data/actions/avatar-actions';
import { images } from '../utils/image-utils';
import HeaderElement from '../components/header-element';
import RoundButtonElement from '../components/round-button-element';
import StatusFeedbackElement from '../components/status-feedback-element';

class ChangeAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }
        this.disableAlert = this.disableAlert.bind(this);
        this.saveAvatar = this.saveAvatar.bind(this);
    }

    componentDidMount() {
        if(this.props.userAvatar != null) {
            this.setState({ selected: this.props.userAvatar });
        }
        else this.setState({ selected: "male_avatar_black" });

    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.selected != nextState.selected || this.props.avatarChangeStatus != nextProps.avatarChangeStatus) {
            return true;
        }
        else return false;
    }

    disableAlert = async () => {
        await this.props.disableChangeAvatarStatus();
        Actions.pop();
    }

    renderFeedback = (status) => {
        if(status != null) {
            return (
                <StatusFeedbackElement icon={ this.props.avatarChangeStatus } disable={ this.disableAlert } message={ this.props.avatarChangeStatus == "success" ? "Pronto! Personagem trocado." : "Não deu certo trocar o personagem agora, tente novamente" }/>
            );
        }
        else return null;
    }

    saveAvatar = () => {
        if(this.props.userAvatar != this.state.selected) {
            this.props.saveSelectedAvatar(this.state.selected);
        }
        else Actions.pop();
    }

    render() {
        return (
            <View style={ style.main }>
                { this.renderFeedback(this.props.avatarChangeStatus) }
                <HeaderElement title={ this.props.title }/>
                <View style={ style.viewContent }>
                    <View style={ style.avatarRow }>
                        <TouchableOpacity style={ [style.viewAvatar, this.state.selected == "male_avatar_black" ? style.selected : {}] } onPress={ () => this.setState({ selected: "male_avatar_black" }) } activeOpacity={ 0.7 }>
                            <Image source={ require('../assets/elements/avatars/male-avatar-black.png') } resizeMode="contain" style={ style.imageAvatar }/>
                        </TouchableOpacity>
                        <TouchableOpacity style={ [style.viewAvatar, this.state.selected == "female_avatar_black" ? style.selected : {}] } onPress={ () => this.setState({ selected: "female_avatar_black" }) } activeOpacity={ 0.7 }>
                            <Image source={ require('../assets/elements/avatars/female-avatar-black.png') } resizeMode="contain" style={ style.imageAvatar }/>
                        </TouchableOpacity>
                    </View>
                    <View style={ [style.avatarRow, {marginBottom: 10}] }>
                        <TouchableOpacity style={ [style.viewAvatar, this.state.selected == "male_avatar_white" ? style.selected : {}] } onPress={ () => this.setState({ selected: "male_avatar_white" }) } activeOpacity={ 0.7 }>
                            <Image source={ require('../assets/elements/avatars/male-avatar-white.png') } resizeMode="contain" style={ style.imageAvatar }/>
                        </TouchableOpacity>
                        <TouchableOpacity style={ [style.viewAvatar, this.state.selected == "female_avatar_white" ? style.selected : {}] } onPress={ () => this.setState({ selected: "female_avatar_white" }) } activeOpacity={ 0.7 }>
                            <Image source={ require('../assets/elements/avatars/female-avatar-white.png') } resizeMode="contain" style={ style.imageAvatar }/>
                        </TouchableOpacity>
                    </View>
                    <View style={ style.viewButton }>
                        <TouchableOpacity onPress={ () => this.saveAvatar() } activeOpacity={ 0.7 }>
                            <RoundButtonElement text="Confirmar" icon={ this.state.selected } styleIcon={ {width: 60, height: 60} } disabled={ false }/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => (
    {
        disableChangeAvatarStatus: () => dispatch(disableChangeAvatarStatus()),
        saveSelectedAvatar: (avatar) => dispatch(saveSelectedAvatar(avatar))
    }
);

const mapStateToProps = state => (
    {
        avatarChangeStatus: state.AvatarReducer.avatarChangeStatus,
        userAvatar: state.AvatarReducer.userAvatar
    }
);

const style = StyleSheet.create({
    avatarRow: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    imageAvatar: {
        width: 100,
        height: 110
    },
    main: {
        flex: 1,
        backgroundColor: StyleUtils.primary_color
    },
    selected: {
        borderRadius: 40,
        backgroundColor: "#4B82A7",
        borderWidth: 3,
        borderColor: "#FFF"
    },
    viewAvatar: {
        justifyContent: "center",
        alignItems: "center",
        width: 150,
        paddingVertical: 20
    },
    viewButton: {
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    viewContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAvatar);
