import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = (props) => {
  const { search, onSearchChange, onSearchSubmit } = props;
  return (
    <View style={styles.backgroundStyle}>
      <Feather style={styles.IconStyle} name="search" />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={search}
        onChangeText={onSearchChange}
        style={styles.inputStyle}
        placeholder="Cerca"
        onEndEditing={onSearchSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#e8e8e8",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  IconStyle: {
    alignSelf: "center",
    fontSize: 35,
    marginHorizontal: 10,
  },
});

export default SearchBar;
