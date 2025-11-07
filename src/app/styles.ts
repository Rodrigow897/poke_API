import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    header:{
        width: '100%',
        height: 200,
        borderWidth: 1,
        borderColor: 'red',
        justifyContent: 'center',
    },
    logo:{
        height: 250,
        width: 250,
        alignSelf: 'flex-end',
        position: 'absolute',
        right: -80,
        top: -25,
        opacity: 0.08
    },
    icon:{
        alignSelf: 'flex-end',
        paddingRight: 30,
        paddingTop: 5
    }
});

export default styles