import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';

interface Pokemon {
  name: string;
  image: string;
  types: string[];
}

// 🎨 Mapeamento de cores por tipo
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

export default function Index() {
  const [search, setSearch] = useState('');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Carrega lista inicial
  async function loadPokemons() {
    try {
      setLoading(true);
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = await response.json();

      const detailedData = await Promise.all(
        data.results.map(async (p: { name: string; url: string }) => {
          const res = await fetch(p.url);
          const pokeData = await res.json();
          return {
            name: pokeData.name,
            image: pokeData.sprites.other['official-artwork'].front_default,
            types: pokeData.types.map((t: any) => t.type.name),
          };
        })
      );

      setPokemons(detailedData);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar os Pokémons.');
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Busca por nome
  async function handleSearch() {
    if (!search.trim()) {
      loadPokemons();
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      if (!response.ok) throw new Error('Pokémon não encontrado');

      const data = await response.json();
      setPokemons([
        {
          name: data.name,
          image: data.sprites.other['official-artwork'].front_default,
          types: data.types.map((t: any) => t.type.name),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', error instanceof Error ? error.message : 'Erro inesperado');
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPokemons();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>POKEDEX</Text>

        <TextInput
          placeholder="Busque pelo nome"
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />

        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <MaterialIcons name="catching-pokemon" size={36} color="black" />
        </TouchableOpacity>

        <Image style={styles.logo} source={require('../assets/images/ball.png')} />
      </View>

      {/* Lista de Pokémons */}
      <View style={styles.resultContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="red" />
        ) : (
          <FlatList
            data={pokemons}
            keyExtractor={(item) => item.name}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => {
              const mainType = item.types[0];
              const backgroundColor = typeColors[mainType] || '#f2f2f2';
              return (
                <View style={[styles.card, { backgroundColor }]}>
                  <Image source={{ uri: item.image }} style={styles.pokemonImage} />
                  <Text style={styles.pokemonName}>{item.name.toUpperCase()}</Text>
                  <Text style={styles.pokemonTypes}>{item.types.join(', ')}</Text>
                </View>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
