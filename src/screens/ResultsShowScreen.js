import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import yelp from "../api/yelp";
import SingleResultDetail from "../components/SingleResultDetail";

const ResultsShowScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const [ristoDetail, setRistoDetail] = useState(null);

  const getResult = async (id) => {
    try {
      const response = await yelp.get(`/${id}`);

      setRistoDetail(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getResult(id);
  }, []);

  if (!ristoDetail) {
    return null;
  }
  return (
    <View>
      <SingleResultDetail detail={ristoDetail} />
    </View>
  );
};

export default ResultsShowScreen;
