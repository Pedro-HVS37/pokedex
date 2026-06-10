import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-web';

export default function BuscaPokemon() {

  const [pesquisa, setPesquisa] = useState("");
  const [pokemon, setPokemon] = useState(null);

  async function buscarPokemon() {
    try {
      const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pesquisa.toLowerCase()}`
      );

      if (!resposta.ok) {
        Alert.alert("Erro", "Pokemon não encontrado");
        return;
      }

      const dados = await resposta.json();
      setPokemon(dados);

    } catch (error) {
      Alert.alert("Erro", "Erro ao buscar Pokemon");
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}>
        <Image
          source={require('./assets/adaptive-icon-dark.png')}
          style={{ width: 150, height: 120, marginTop: 20,  }}
        />
        <Text style={styles.titulo}>Pokedex</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome ou ID do Pokémon"
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      <TouchableOpacity style={styles.buscar} onPress={buscarPokemon}>
        <Text style={styles.textoBotao}>Buscar</Text>
      </TouchableOpacity>

      {pokemon && (
        <View>
          <Image
            source={{ uri: pokemon.sprites.other['showdown'].front_default }}
            style={{
              width: 340,
              height: 340,
              marginBottom: 10,
              margin: 12,
              borderColor: '#FFFFFF',
              borderWidth: 2,
              borderRadius: 12,
              backgroundColor: '#FFFFFF',
            }}
          />

          <Text style={styles.nome}>{pokemon.name}</Text>
          <Text style={styles.tipo}>
            {pokemon.types.map(t => t.type.name).join(', ')}
          </Text>
          <Text style={styles.habilidades}>{pokemon.abilities.map(a => a.ability.name).join(', ')}</Text>
          
          <Text style={styles.titulo}>• Stats</Text>

          <Text style={styles.stats}>
            Experiencia base: {pokemon.base_experience}
          </Text>
          <Text style={styles.stats}>
            ❤ HP: {pokemon.stats.find(s => s.stat.name === 'hp').base_stat}
          </Text>
          <Text style={styles.stats}>
            🗡 Ataque: {pokemon.stats.find(s => s.stat.name === 'attack').base_stat}
          </Text>
            <Text style={styles.stats}>
            🛡 Defesa: {pokemon.stats.find(s => s.stat.name === 'defense').base_stat}
          </Text>
          <Text style={styles.stats}>
            ⚔ Ataque-Especial: {pokemon.stats.find(s => s.stat.name === 'special-attack').base_stat}
          </Text>
          <Text style={styles.stats}>
            🛡 Defesa-Especial: {pokemon.stats.find(s => s.stat.name === 'special-defense').base_stat}
          </Text>
          <Text style={styles.stats}>
            🏃‍♂️ Velocidade: {pokemon.stats.find(s => s.stat.name === 'speed').base_stat}
          </Text>
            <Text style={styles.stats}>
            ⚖ Peso: {pokemon.weight} hg
          </Text>
          <Text style={styles.stats}>
            📏 Altura: {pokemon.height} dm
          </Text>

            <Text style={styles.titulo}>• Sprites</Text>

            <Text style={styles.subtitulo}>Normal</Text>

            <Image
            source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
            style={{
              width: 300,
              height: 300,
              marginBottom: 10,
              margin: 12,
              borderColor: '#FFFFFF',
              borderWidth: 2,
              borderRadius: 12,
              backgroundColor: '#FFFFFF',
            }}
          />

            <Text style={styles.subtitulo}>Shiny</Text>
            <Image
            source={{ uri: pokemon.sprites.other['official-artwork'].front_shiny }}
            style={{
              width: 300,
              height: 300,
              marginBottom: 10,
              margin: 12,
              borderColor: '#FFFFFF',
              borderWidth: 2,
              borderRadius: 12,
              backgroundColor: '#FFFFFF',
            }}
          />

          <Text style={styles.subtitulo}>3D</Text>
          <Image
            source={{ uri: pokemon.sprites.other['home'].front_default }}
            style={{
              width: 300,
              height: 300,
              marginBottom: 10,
              margin: 12,
              borderColor: '#FFFFFF',
              borderWidth: 2,
              borderRadius: 12,
              backgroundColor: '#FFFFFF',
            }}
          />

          
          
        </View>
      )}

      <Text style={{ color: '#FFFFFF', marginTop: 20 }}>Fear Nintendo</Text>
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: '#0e0e0e',
  },

  titulo: {
    marginTop: 10,
    fontSize: 40,
    marginBottom: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subtitulo: {
    marginTop: 10,
    fontSize: 30,
    marginBottom: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 20,
    color: '#FFFFFF',
    borderRadius: 8,
    fontSize: 18,
    backgroundColor: '#1e1e1e',
  },
  buscar: {
    marginBottom: 20,
    backgroundColor: '#1c65ec',
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  tipo: {
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor: '#A3A3A3',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    textAlign: 'center',
  },
  habilidades: {
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor: '#2575DB',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    textAlign: 'center',
  },
  stats: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  medidas: {
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor: '#A3A3A3',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    textAlign: 'center',
  },
});