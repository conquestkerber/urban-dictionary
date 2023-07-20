import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import axios from "axios";
import FontAwesome from "react-native-fontawesome";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [words, setWords] = useState([]);
  const [dateOfPost, setDateOfPost] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `https://mashape-community-urban-dictionary.p.rapidapi.com/define`,
        params: { term: inputValue },
        headers: {
          "X-RapidAPI-Key":
            "5ce1171e8cmsh08bc54db6697345p1f708fjsn96ee0024ee1b",
          "X-RapidAPI-Host":
            "mashape-community-urban-dictionary.p.rapidapi.com",
        },
      });
      setWords(response.data.list);
      const dateObj = new Date(response.data.list.written_on);
    } catch (error) {
      alert(error);
    }
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // Add 1 to get the correct month
    const year = dateObj.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Urban Dictionary</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Enter text"
          onChangeText={(value) => setInputValue(value)}
        />
        <Button
          title="Find"
          onPress={() => {
            fetchData();
          }}
        />
      </View>
      <FlatList
        data={words}
        renderItem={({ item }) => (
          <View style={styles.form}>
            <Text style={styles.text}>{item.definition}</Text>
            <Text style={styles.text}>{item.example}</Text>
            <Text style={styles.text}>
              Author:{item.author} {formatDate(item.written_on)}
            </Text>
            <Text style={styles.text}>{item.thumbs_up}</Text>
            <FontAwesome icon="fa-light fa-thumbs-up" />
            <Text style={styles.text}>{item.thumbs_down}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  column: {
    marginTop: 20,
    alignItems: "center",
  },
  form: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 20,
  },
});

export default Home;
