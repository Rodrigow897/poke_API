import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';
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
import PokemonModal from '../components/PokeModal/pokeModal';
import styles from './styles';

interface Pokemon {
  name: string;
  image: string;
  types: string[];
  url?: string;
}

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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null);

  async function loadPokemons() {
    try {
      setLoading(true);
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
      const results = response.data.results;

      const detailedData = await Promise.all(
        results.map(async (p: { name: string; url: string }) => {
          const res = await axios.get(p.url);
          const pokeData = res.data;
          return {
            name: pokeData.name,
            image: pokeData.sprites.other['official-artwork'].front_default,
            types: pokeData.types.map((t: any) => t.type.name),
            url: p.url,
          };
        })
      );

      setPokemons(detailedData);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao carregar os Pokémons.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch() {
  const query = search.trim().toLowerCase();

  if (!query) {
    loadPokemons();
    return;
  }

  try {
    setLoading(true);

    // Busca a lista completa (ou um conjunto grande)
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const results = response.data.results;

    // Filtra os pokémons que contém o texto digitado no nome
    const filtered = results.filter((p: { name: string }) => p.name.includes(query));

    if (filtered.length === 0) {
      Alert.alert('Erro', 'Nenhum Pokémon encontrado com essas letras.');
      setPokemons([]);
      return;
    }

    // Puxa os dados detalhados dos pokémons filtrados
    const detailedData = await Promise.all(
      filtered.slice(0, 20).map(async (p: { name: string; url: string }) => {
        const res = await axios.get(p.url);
        const pokeData = res.data;
        return {
          name: pokeData.name,
          image: pokeData.sprites.other['official-artwork'].front_default,
          types: pokeData.types.map((t: any) => t.type.name),
          url: p.url,
        };
      })
    );

    setPokemons(detailedData);
  } catch (error) {
    console.error(error);
    Alert.alert('Erro', 'Falha ao buscar os Pokémons.');
  } finally {
    setLoading(false);
  }
}

  async function openModal(pokemon: Pokemon) {
    try {
      const response = await axios.get(pokemon.url!);
      setSelectedPokemon(response.data);
      setModalVisible(true);
    } catch {
      Alert.alert('Erro', 'Falha ao carregar detalhes do Pokémon');
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
                <TouchableOpacity
                  style={[styles.card, { backgroundColor }]}
                  onPress={() => openModal(item)}
                >
                  <Image source={{ uri: item.image }} style={styles.pokemonImage} />
                  <Text style={styles.pokemonName}>{item.name.toUpperCase()}</Text>
                  <Text style={styles.pokemonTypes}>{item.types.join(', ')}</Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>

      <PokemonModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        pokemon={selectedPokemon}
      />
    </SafeAreaView>
  );
}
