import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "react-native-vector-icons/Entypo";
import { DetailButton, PrimaryButton } from "../components/Button";
import COLORS from "../constants/colors";
import Icon from "react-native-vector-icons/Octicons";

const OrchidDetail = ({ navigation, route }) => {
  const { item } = route.params;

  const addFavoriteOrchid = async (orchid) => {
    try {
      const storedOrchids = await AsyncStorage.getItem("favoriteOrchids");
      let favoriteOrchids = [];
      if (storedOrchids) {
        favoriteOrchids = JSON.parse(storedOrchids);
      }
      // Check for duplicate ID
      const duplicateOrchid = favoriteOrchids.find((o) => o.id === orchid.id);
      if (duplicateOrchid) {
        Alert.alert(
          "Opppp...",
          "This orchid is already in your favorite list",
          [{ text: "Close", onPress: () => console.log("OK Pressed") }]
        );
        return;
      }
      favoriteOrchids.push(orchid);
      await AsyncStorage.setItem(
        "favoriteOrchids",
        JSON.stringify(favoriteOrchids)
      );
      Alert.alert("Add successfully", "Your orchid taste is so special!", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } catch (error) {
      console.log("Error adding favorite orchid:", error);
    }
  };
  return (
    <>
      <View style={styles.top}>
        <Pressable onPress={navigation.goBack}>
          <View
            style={{ width: 50, paddingLeft: 20, justifyContent: "center" }}
          >
            <Icon name="chevron-left" size={30} />
          </View>
        </Pressable>
        <View style={styles.viewPlaceStyle}>
          <View style={styles.placeStyle}>
            <Text style={styles.place}>Detail</Text>
          </View>
        </View>
        <View style={styles.avatar}>
          <Icon name="kebab-horizontal" size={30} />
        </View>
      </View>
      <ScrollView style={styles.container}>
        {/* <TouchableOpacity onPress={() => navigation.goBack("Home")}>
        <Entypo
          name="chevron-left"
          style={{
            fontSize: 22,
            color: COLORS.dark,
            padding: 12,
            backgroundColor: COLORS.light,
            borderRadius: 10,
          }}
        />
      </TouchableOpacity> */}

        <Image style={styles.image} source={{ uri: `${item.image}` }} />
        {/* <DetailButton
        style={styles.goBack}
        title={"Go back"}
        onPress={() => navigation.goBack()}
      /> */}
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <PrimaryButton
          title="Add to Favorite"
          onPress={() => addFavoriteOrchid(item)}
        />
      </ScrollView>
    </>
  );
};

const styles = {
  container: {
    backgroundColor: COLORS.light,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    // borderRadius: 20,
  },
  info: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  goBack: {
    display: "absolute",
    top: 0,
    left: 0,
  },
  top: {
    paddingTop: 40,
    marginBottom: 10,
    flexDirection: "row",
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  placeStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewPlaceStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 20,
  },
};

export default OrchidDetail;
