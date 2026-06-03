import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

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
      <Text style={styles.titulo}>Pokedex</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite um Pokemon"
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      <Button style={styles.buscar} title="Buscar" onPress={buscarPokemon} />

      {pokemon && (
        <View>
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={{
              width: 300,
              height: 220,
              marginBottom: 10,
              margin: 12,
              borderColor: '#FFFFFF',
              borderWidth: 2,
              borderRadius: 12,
            }}
          />

          <Text style={styles.nome}>{pokemon.name}</Text>
          <Text style={styles.tipo}>
            {pokemon.types.map(t => t.type.name).join(', ')}
          </Text>
          <Text style={styles.habilidades}>{pokemon.abilities.map(a => a.ability.name).join(', ')}</Text>
          <Text style={styles.stats}>
            {pokemon.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join('\n')}
          </Text>
        </View>
      )}

      <Text style={{ color: '#FFFFFF', marginTop: 20 }}>Fear Nintendo</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: '#262626',
  },

  titulo: {
    fontSize: 30,
    marginBottom: 20,
    color: '#FFFFFF',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 20,
    color: '#FFFFFF',
    borderRadius: 8,
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
});