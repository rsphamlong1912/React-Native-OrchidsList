import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Pressable,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../constants/colors";
import { DetailButton, SecondaryButton } from "../components/Button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const FavoriteOrchidsScreen = ({ navigation }) => {
  const [favoriteOrchids, setFavoriteOrchids] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchFavoriteOrchids();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchFavoriteOrchids = async () => {
    try {
      const storedOrchids = await AsyncStorage.getItem("favoriteOrchids");
      if (storedOrchids) {
        setFavoriteOrchids(JSON.parse(storedOrchids));
      }
    } catch (error) {
      console.log("Error fetching favorite orchids:", error);
    }
  };

  const removeFavoriteOrchid = async (orchid) => {
    try {
      const updatedOrchids = favoriteOrchids.filter((o) => o.id !== orchid.id);
      setFavoriteOrchids(updatedOrchids);
      await AsyncStorage.setItem(
        "favoriteOrchids",
        JSON.stringify(updatedOrchids)
      );
    } catch (error) {
      console.log("Error removing favorite orchid:", error);
    }
  };

  const removeAllFavoriteOrchids = () => {
    Alert.alert("Oh no no?!", "Are you sure to delete all your list?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          try {
            setFavoriteOrchids([]);
            await AsyncStorage.removeItem("favoriteOrchids");
          } catch (error) {
            console.log("Error removing all favorite orchids:", error);
          }
        },
      },
    ]);
  };

  // const renderOrchidItem = ({ item }) => (
  //   <View style={{ marginVertical: 10 }}>
  //     <Text>Name: {item.name}</Text>
  //     <Text>Color: {item.color}</Text>
  //     <Button title="Remove" onPress={() => removeFavoriteOrchid(item)} />
  //   </View>
  // );

  const renderOrchidItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate("OrchidDetail", { item })}>
      <View style={style.itemCard}>
        <Image
          source={{ uri: `${item.image}` }}
          style={{ height: 80, width: 80, borderRadius: 5 }}
        />
        <View
          style={{
            height: 100,
            marginLeft: 15,
            paddingVertical: 15,
            flex: 1,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>
            {item.name}
          </Text>
          <Text style={{ fontSize: 13, color: COLORS.grey }}>
            <Icon name="invert-colors" size={15} color={COLORS.primary} />
            {item.color}
          </Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 60 }}>
          <View style={{}}>
            <DetailButton
              title="Unlike"
              onPress={() => removeFavoriteOrchid(item)}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );

  if (favoriteOrchids.length !== 0) {
    return (
      <View style={{ flex: 1, padding: 20, marginTop: 40 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
          Favorite Orchids
        </Text>
        <FlatList
          data={favoriteOrchids}
          keyExtractor={(item) => item.id}
          renderItem={renderOrchidItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        <SecondaryButton
          title="Remove All"
          onPress={removeAllFavoriteOrchids}
        />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, padding: 20, marginTop: 40 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
          Favorite Orchids
        </Text>
        <Text style={{ fontSize: 16, marginTop: 40, textAlign: "center" }}>
          Empty favorite list!
        </Text>
      </View>
    );
  }
};

const style = StyleSheet.create({
  itemCard: {
    height: 100,
    elevation: 1,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 5,
    marginLeft: 20,
    marginRight: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
});

export default FavoriteOrchidsScreen;
