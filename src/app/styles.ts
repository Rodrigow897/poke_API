import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    header:{
        width: '100%',
        height: 200,
        maxHeight: 200,
        justifyContent: 'center',
    },
    logo:{
        height: 250,
        width: 250,
        alignSelf: 'flex-end',
        position: 'absolute',
        right: -80,
        top: -25,
        opacity: 0.08,
    },
    button:{
        zIndex: 2,
        alignSelf: 'flex-end',
        paddingRight: 27,
        paddingTop: 3,
    },
    input:{
        position: 'absolute',
        borderWidth: 1,
        borderColor: '#c4c3c3ff',
        width: 200,
        right: 75,
        borderRadius: 10,
        backgroundColor: 'white',
        zIndex: 2,
        paddingHorizontal: 10,
        height: 40
    },
    title:{
        position: 'absolute',
        left: 15,
        fontWeight: 'bold',
        fontSize: 20
    }
});

export default styles