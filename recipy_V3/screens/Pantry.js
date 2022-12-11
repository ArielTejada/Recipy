import React, { useState } from "react";
import {
  Button,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  ScrollView,
  Pressable,
  Keyboard,
} from "react-native";
import styles from "../styles/pantry-styles";
import matchFunction from "../components/matchFunction";
import { useStoreState, useStoreActions } from "easy-peasy";
import uuid from "react-native-uuid";
import * as Animatable from "react-native-animatable";

/* -------------------- Components -------------------- */
import { SearchBar } from "react-native-screens";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import * as Notifications from "expo-notifications";

export default function Pantry() {
  /* -------------------- Local State Variables -------------------- */
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const [filteredArray, setFilteredArray] = useState([]);
  const match = matchFunction;
  const [filler, setFiller] = useState("");
  const [text, setText] = useState("change me");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [date,setDate] = useState(new Date(1666870995000));
  const [date, setDate] = useState(new Date());
  const [output, setOutput] = useState("");
  const [time, setTime] = useState("");

  const [addIngredient, setAddIngredient] = useState("");
  const [addDate, setAddDate] = useState("");

  /* -------------------- Redux State Variables -------------------- */
  const refresh = useStoreState((state) => state.refresh);
  const setRefresh = useStoreActions((actions) => actions.setRefresh);

  const ingredients = useStoreState((state) => state.ingredients);
  const pantryItems = useStoreState((state) => state.pantryItems);
  const setPantryItems = useStoreActions((actions) => actions.setPantryItems);

  /* -------------------- Redux State Colors -------------------- */
  const headerColor = useStoreState((state) => state.headerColor);
  const pageColor = useStoreState((state) => state.pageColor);
  const bannerColor = useStoreState((state) => state.bannerColor);

  /* -------------------- Handler Functions -------------------- */
  const ingredientPressHandler = (name) => {
    Keyboard.dismiss();
    setAddIngredient(name);
    setSearchText(name);
    setSearching(false);
    setRefresh(!refresh);
  };

  const enterPressHandler = () => {
    if (addIngredient != "" && addDate != "") {
      if (pantryItems.find((ingredient) => ingredient.name === addIngredient)) {
        setAddIngredient("");
        setAddDate("");
        setSearchText("");
        setSearching(false);
        return;
      }
      let newPantryItems = pantryItems;
      console.log("adding: ", addIngredient, " ", addDate.toLocaleDateString());
      newPantryItems.push({
        name: addIngredient,
        date: addDate,
        key: uuid.v4(),
      });
      setPantryItems(newPantryItems);
      schedulePushNotification(addIngredient, time);
      setAddIngredient("");
      setAddDate("");
      setSearchText("");
      setSearching(false);
    }
    return;
  };

  const pantryPressHandler = (key) => {
    let newPantryList = pantryItems.filter(
      (ingredient) => ingredient.key != key
    );
    setPantryItems(newPantryList);
  };

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setDate(date);
    setAddDate(date);
    // setOutput(date.getTime());
    // setTime(date.getTime()-Date.now()-(48*60*60*1000))
    setTime(date.toLocaleDateString());
    hideDatePicker();
  };

  const updateText = () => {
    setText(filler);
  };

  async function schedulePushNotification(filler, time) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Recipy notification! 📬",
        body: `Your ${filler} is expiring in two days! Expiring on: ${date.toLocaleDateString()}`,
        data: { data: "goes here" },
        vibrate: true,
      },
      trigger: {
        // repeats: false,
        // weekday: 2,
        // hour: 4,
        // minute: 2,  //Date - Date.now()
        seconds: 2,
      },
    });
  }

  /* -------------------- Render Method -------------------- */

  return (
    <Animatable.View
      style={[styles.wholeScreen, { backgroundColor: "#ff5349" }]}
      animation="fadeInRightBig"
    >
      <ScrollView showsVerticalScrollIndicator={false} style={[]}>
        <Pressable
          keyboardShouldPersistTaps="always"
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          {/* <View
            style={[styles.pushDown, { backgroundColor: headerColor }]}
          ></View>

          <View style={[styles.header, { backgroundColor: headerColor }]}>
            <Image
              source={require("../assets/img/bakeryV2.png")}
              style={[styles.banner, { tintColor: bannerColor }]}
            />
            <Text style={[styles.headerText]}>Pantry</Text>
          </View> */}

          {/* ------------------------------------ Input Fields ------------------------------------ */}
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              style={[
                styles.fontLarge,
                styles.margins,
                styles.AmaticSCBold,
                { color: "white" },
              ]}
            >
              Add to your virtual pantry!
            </Text>
          </View>

          <View>
            <View style={styles.container}>
              <TextInput
                placeholder=" add ingredient"
                style={[styles.input, styles.outline]}
                value={searchText}
                onChangeText={(text) => {
                  setSearchText(text);
                  text === ""
                    ? (setSearching(false), setAddIngredient(""))
                    : setSearching(true);
                  text != ""
                    ? setFilteredArray(match(text.toLowerCase(), ingredients))
                    : setFilteredArray([]);
                }}
                searchText={searchText}
                setSearchText={setSearchText}
              />

              <Pressable
                style={[styles.input, styles.outline]}
                onPress={showDatePicker}
              >
                <Text
                  style={[
                    styles.fontSmall,
                    { color: addDate === "" ? "#9E9E9E" : "black" },
                  ]}
                >
                  {" "}
                  {addDate === ""
                    ? "add expiration"
                    : addDate.toLocaleDateString()}
                </Text>
              </Pressable>

              <Pressable
                style={styles.button}
                onPress={() => {
                  enterPressHandler();
                }}
              >
                <Text
                  style={[styles.clear, styles.AmaticSCBold, styles.fontMedium]}
                >
                  Enter
                </Text>
              </Pressable>
            </View>
          </View>

          {/* ------------------------------------ Search Bar ------------------------------------ */}

          <View style={[{ alignItems: "center", zIndex: 2 }]}>
            {searching ? (
              <Text>Searching : True</Text>
            ) : (
              <Text>Searching : False</Text>
            )}
            {searching ? (
              <ScrollView style={[]} keyboardShouldPersistTaps={"always"}>
                {filteredArray.map((ingredient) => {
                  return (
                    <View key={ingredient.id}>
                      <TouchableOpacity
                        onPress={() => {
                          ingredientPressHandler(ingredient.name);
                        }}
                        style={[styles.outline, styles.searchResult]}
                      >
                        <Text
                          style={[
                            styles.AmaticSCBold,
                            styles.textCenter,
                            styles.fontMedium,
                          ]}
                        >
                          {ingredient.name.replace("_", " ")}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            ) : (
              <Text></Text>
            )}
          </View>

          {/* ------------------------------------ Date Picker ------------------------------------ */}

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={new Date()}
            modalStyleIOS={[styles.datePicker]}
            display="default"
          />

          {/* ------------------------------------ Visual Pantry ------------------------------------ */}

          <View>
            <View style={[]}></View>
            <ImageBackground
              source={require("../assets/img/pantry2.png")}
              style={[styles.pantryImage]}
            >
              <ScrollView style={[]}>
                <View
                  style={[
                    { display: "flex", flexDirection: "row", flexWrap: "wrap" },
                  ]}
                >
                  {pantryItems.map((ingredient) => {
                    return (
                      <Animatable.View animation="fadeInUpBig">
                        <TouchableOpacity
                          style={[]}
                          key={ingredient.key}
                          onPress={() => {
                            pantryPressHandler(ingredient.key);
                          }}
                        >
                          <ImageBackground
                            source={require("../assets/img/glassjar.png")}
                            style={[styles.jar]}
                          >
                            <Text
                              style={[
                                styles.fontSmall,
                                styles.jarLabel,
                                {
                                  backgroundColor:
                                    ingredient.date < Date.now()
                                      ? "red"
                                      : "#25AEF3",
                                },
                              ]}
                            >
                              {ingredient.name.length > 8
                                ? ingredient.name
                                    .slice(0, 8)
                                    .replace("_", " ") + ".."
                                : ingredient.name.replace("_", " ")}
                            </Text>
                            <Text
                              style={[
                                styles.fontSmall,
                                styles.jarLabel,
                                {
                                  backgroundColor:
                                    ingredient.date < Date.now()
                                      ? "red"
                                      : "#25AEF3",
                                },
                              ]}
                            >
                              {ingredient.date.toLocaleDateString()}
                            </Text>
                          </ImageBackground>
                        </TouchableOpacity>
                      </Animatable.View>
                    );
                  })}
                </View>
              </ScrollView>
            </ImageBackground>
          </View>

          <View style={[styles.navView]}></View>
        </Pressable>
      </ScrollView>
    </Animatable.View>
  );
}
