import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#faf7f7ff'
    },
    header:{
        width: '100%',
        height: 200,
        maxHeight: 200,
        justifyContent: 'center',
        backgroundColor: '#ffffffff'
    },
    logo:{
        height: 250,
        width: 250,
        alignSelf: 'flex-end',
        position: 'absolute',
        right: -80,
        top: -25,
        opacity: 0.1,
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
    },
    resultContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    listContainer: {
        alignItems: 'center',
        paddingBottom: 40,
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 15,
        margin: 8,
        width: 150,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    pokemonImage: {
        width: 100,
        height: 100,
    },
    pokemonName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#fff',
        textShadowColor: '#0003',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    pokemonTypes: {
        fontSize: 14,
        color: '#fff',
        marginTop: 3,
        textTransform: 'capitalize',
    },

});

export default styles