import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

const ResultsDetail = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: props.image_url }} />
      <Text style={styles.name}>{props.name}</Text>
      <Text>
        {props.rating} <Entypo name="star" size={14} color="black" /> ,{" "}
        {props.review_count} recensioni
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  image: {
    width: 250,
    height: 100,
    borderRadius: 4,
  },
  name: {
    fontWeight: "bold",
  },
});

export default ResultsDetail;
