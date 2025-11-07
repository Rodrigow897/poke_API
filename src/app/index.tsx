import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';

export default function Index() {
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <MaterialIcons style={styles.icon} name="catching-pokemon" size={30} color="black" />
                <Image style={styles.logo} source={require('../assets/images/ball.png')}/>
            </View>
        </SafeAreaView>
    )
}
