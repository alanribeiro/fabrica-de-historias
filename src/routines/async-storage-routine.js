import AsyncStorage from '@react-native-community/async-storage';

export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        return error;
    }
}

export const retrieveData = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key);
        if(data != null) {
            return data;
        }
        else return null;
    } catch (error) {
        return error;
    }
}

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        return error;
    }
}
