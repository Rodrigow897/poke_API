import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
},
container: {
    width: '85%',
    maxHeight: '80%',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 10,
},
closeButton: {
    alignSelf: 'flex-end',
  },
  content: {
    alignItems: 'center',
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 10,
},
name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
},
label: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginTop: 8,
},
value: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
},
});

export default styles