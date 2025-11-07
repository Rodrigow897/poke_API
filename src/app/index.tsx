import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';

export default function Index() {
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>POKEDEX</Text>
                <TextInput placeholder='Busque pelo nome' style={styles.input}
                    
                />
                <TouchableOpacity style={styles.button}>
                    <MaterialIcons name="catching-pokemon" size={36} color="black" />
                </TouchableOpacity>
                <Image style={styles.logo} source={require('../assets/images/ball.png')}/>
            </View>
        </SafeAreaView>
    )
}
