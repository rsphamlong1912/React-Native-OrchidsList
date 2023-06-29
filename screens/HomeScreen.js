import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  Button,
  Pressable,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import { DetailButton } from "../components/Button";
import COLORS from "../constants/colors";
import { orchids } from "../constants/data";
import { orchidsList } from "../constants/data";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const HomeScreen = ({ navigation, route }) => {
  const [orchids, setOrchids] = useState(orchidsList);
  const [color, setcolor] = useState("All");
  const [dataList, setDataList] = useState(orchids);
  const setcolorFilter = (color) => {
    if (color !== "All") {
      setDataList([...orchids.filter((e) => e.color === color)]);
    } else {
      setDataList(orchids);
    }
    setcolor(color);
  };

  const listTab = [
    {
      color: "All",
    },
    {
      color: "Blue",
    },
    {
      color: "White",
    },
    {
      color: "Yellow",
    },
  ];

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
        console.log("Orchid with duplicate ID already exists.");
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
              title="Like"
              onPress={() => addFavoriteOrchid(item)}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 30 }}>
      <Header />
      {/* <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Home Screen
      </Text> */}
      <View style={style.listTab}>
        {listTab.map((e, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={[style.btnTab, color === e.color && style.btnTabActive]}
            onPress={() => setcolorFilter(e.color)}
          >
            <Text
              style={[style.textTab, color === e.color && style.textTabActive]}
            >
              {e.color}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={dataList}
        keyExtractor={(item) => item.id}
        renderItem={renderOrchidItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
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
  // listTab: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   padding: 50,
  //   flexDirection: "row",
  // },
  listTab: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  btnTab: {
    width: Dimensions.get("window").width / 5,
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 10,
    justifyContent: "center",
    borderRadius: 10,
  },
  textTab: {
    fontSize: 16,
  },
  btnTabActive: {
    backgroundColor: COLORS.primary,
  },
  textTabActive: {
    color: "#fff",
  },
});

export default HomeScreen;
