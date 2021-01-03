import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Linking,
  Modal,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
const { width: screenWidth } = Dimensions.get("window");
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const SingleResultDetails = ({ detail }) => {
  const [openModal, setOpenModal] = useState(false);
  const carouselRef = useRef(null);
  const _renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View
        style={{
          borderRadius: 15,
          height: 200,
        }}
      >
        {/* <Image style={{ width: 300, height: "100%" }} source={{ uri: item }} /> */}
        <ParallaxImage
          source={{ uri: item }}
          containerStyle={styles.imageContainer}
          parallaxFactor={0.8}
          {...parallaxProps}
        />
      </View>
    );
  };

  const addSymbol = (price) => {
    let initPrice = "";
    for (let index = 0; index <= price.length; index++) {
      price[0] === "€" ? (initPrice += "€") : (initPrice += "$");
    }
    return initPrice;
  };

  const dialCall = (phone) => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = `tel:${phone}`;
    } else {
      phoneNumber = `telprompt:${phone}`;
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        padding: 5,
      }}
    >
      <Text style={styles.name}>{detail.name}</Text>
      <Text>
        {detail.rating}
        <Ionicons name="ios-star" size={14} color="black" /> -{" "}
        {detail.review_count} recensioni
      </Text>
      <Text>
        {detail.price} - {addSymbol(detail.price, detail.price)}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AntDesign
          style={{ marginRight: 5 }}
          name="clockcircleo"
          size={21}
          color="black"
        />
        {detail.is_open_now ? (
          <Text style={styles.clock}>Ora aperto</Text>
        ) : (
          <Text style={styles.clock}>Ora chiuso</Text>
        )}
      </View>

      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        data={detail.photos}
        layoutCardOffset={50}
        renderItem={_renderItem}
        // sliderHeight={300}
        itemHeight={30}
        // sliderWidth={200}
        itemWidth={screenWidth - 100}
        hasParallaxImages={true}
        layoutCardOffset={18}
        autoplay={true}
      />
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
          }}
          onPress={() => dialCall(detail.phone)}
        >
          <Feather name="phone" size={24} color="black" />
          <Text>Chiama</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
          }}
          onPress={() => setOpenModal(true)}
        >
          <Feather name="map-pin" size={24} color="black" />
          <Text>Mappa</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={openModal} animationType={"slide"}>
        <MapView
          style={{ width: "100%", height: "100%" }}
          region={{
            latitude: detail.coordinates.latitude,
            longitude: detail.coordinates.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: detail.coordinates.latitude,
              longitude: detail.coordinates.longitude,
            }}
          />
        </MapView>
        <TouchableOpacity
          onPress={() => setOpenModal(false)}
          style={{ position: "absolute", right: 0 }}
        >
          <FontAwesome name="close" size={35} color="black" />
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
  },
  clock: {
    fontWeight: "bold",
  },
  // image: {
  //   // ...StyleSheet.absoluteFillObject,
  //   // resizeMode: "cover",
  //   height: 150,
  // },
});

export default SingleResultDetails;
