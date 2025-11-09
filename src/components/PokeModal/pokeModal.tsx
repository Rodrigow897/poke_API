import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

// Mesmas cores do Index.tsx
const typeColors: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

interface PokemonModalProps {
  visible: boolean;
  onClose: () => void;
  pokemon: any | null;
}

export default function PokemonModal({ visible, onClose, pokemon }: PokemonModalProps) {
  if (!pokemon) return null;

  // tipo principal do Pokémon
  const mainType = pokemon.types[0]?.type?.name || 'normal';
  const backgroundColor = typeColors[mainType] || '#f2f2f2';

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={28} color="white" />
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.content}>
            <Image
              source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
              style={styles.image}
            />

            <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>

            <Text style={styles.label}>Tipo(s):</Text>
            <Text style={styles.value}>
              {pokemon.types.map((t: any) => t.type.name).join(', ')}
            </Text>

            <Text style={styles.label}>Altura:</Text>
            <Text style={styles.value}>{pokemon.height / 10} m</Text>

            <Text style={styles.label}>Peso:</Text>
            <Text style={styles.value}>{pokemon.weight / 10} kg</Text>

            <Text style={styles.label}>Habilidades:</Text>
            <Text style={styles.value}>
              {pokemon.abilities.map((a: any) => a.ability.name).join(', ')}
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
