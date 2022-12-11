import React, { useState } from "react";
import {
  Text,
  View,
  Switch,
  Pressable,
  ScrollView,
  TextInput,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import styles from "../styles/settings-styles";
import { useStoreState, useStoreActions } from "easy-peasy";
import { LinearGradient } from "expo-linear-gradient";
import SelectDropdown from "react-native-select-dropdown";
import matchFunction from "../components/matchFunction";
import { SearchBar } from "react-native-screens";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
const { height, width } = Dimensions.get("window");

export default function Settings({ navigation }) {
  /* -------------------- Local State Variables -------------------- */
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const [filteredArray, setFilteredArray] = useState([]);
  const match = matchFunction;

  let addIngredient = { name: "", key: "" };
  let addDate = null;

  /* -------------------- Redux State Variables -------------------- */
  const refresh = useStoreState((state) => state.refresh);
  const setRefresh = useStoreActions((actions) => actions.setRefresh);

  const lightEnabled = useStoreState((state) => state.lightEnabled);
  const darkEnabled = useStoreState((state) => state.darkEnabled);
  const halloweenEnabled = useStoreState((state) => state.halloweenEnabled);

  const setLightEnabled = useStoreActions((actions) => actions.setLightEnabled);
  const setDarkEnabled = useStoreActions((actions) => actions.setDarkEnabled);
  const setHalloweenEnabled = useStoreActions(
    (actions) => actions.setHalloweenEnabled
  );

  const dietOption = useStoreState((state) => state.dietOption);
  const setDietOption = useStoreActions((actions) => actions.setDietOption);

  const ingredients = useStoreState((state) => state.ingredients);
  const removedIngredients = useStoreState((state) => state.removedIngredients);
  const setRemovedIngredients = useStoreActions(
    (actions) => actions.setRemovedIngredients
  );

  /* -------------------- Redux State Colors -------------------- */
  const headerColor = useStoreState((state) => state.headerColor);
  const pageColor = useStoreState((state) => state.pageColor);
  const bannerColor = useStoreState((state) => state.bannerColor);

  /* -------------------- Handler Functions -------------------- */
  const lightSwitch = () => {
    setLightEnabled((lightEnabled) => !lightEnabled);
  };
  const darkSwitch = () => {
    setDarkEnabled((darkEnabled) => !darkEnabled);
  };
  const halloweenSwitch = () => {
    setHalloweenEnabled((halloweenEnabled) => !halloweenEnabled);
  };

  const dietaryOptions = [
    "default",
    "vegan",
    "vegetarian",
    "keto",
    "diabetic",
    "pescatarian",
  ];

  const removePressHandler = (ingredientObj) => {
    if (
      removedIngredients.find(
        (ingredient) => ingredient.name === ingredientObj.name
      )
    ) {
      return;
    }
    let newList = removedIngredients;
    newList.push({ ...ingredientObj });
    setRemovedIngredients(newList);
    setSearchText("");
    setSearching(false);
    setRefresh(!refresh);
    console.log(`added: ${ingredientObj.name} to removedIngredients`);
  };

  const selectedListPress = (ingredientObj) => {
    let newList = removedIngredients.filter(
      (item) => item.name != ingredientObj.name
    );
    setRemovedIngredients(newList);
    setRefresh(!refresh);
  };

  /* -------------------- Render Method -------------------- */
  return (
    <Animatable.View
      style={[styles.wholeScreen, { backgroundColor: pageColor }]}
      animation="fadeInRightBig"
    >
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"always"}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={height / 1.4}
      >
        <Pressable
          keyboardShouldPersistTaps={"always"}
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View
            style={[styles.pushDown, { backgroundColor: headerColor }]}
          ></View>

          <View style={[styles.header, { backgroundColor: headerColor }]}>
            <Text style={[styles.headerText]}>Settings</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={[styles.backIconTouch]}
            >
              <Image
                source={require("../assets/icons/go-back.png")}
                style={[styles.backIcon, { tintColor: bannerColor }]}
              />
              {/* <Ionicons
              name="ios-home"
              color={"white"}
              size={35}
              style={styles.backIcon}
            /> */}
            </TouchableOpacity>
          </View>

          {/* -------------------------------- Display Settings -------------------------------- */}

          <View
            style={[
              styles.outline,
              styles.smallMargins,
              styles.settingOption,
              styles.centerItems,
            ]}
          >
            <Text style={[styles.AmaticSCRegular, styles.fontLarge]}>
              Display Settings
            </Text>
          </View>

          <View style={[styles.settingOption, styles.width70, styles.inline]}>
            <View style={[styles.width70, styles.textCenter]}>
              <Text style={[styles.AmaticSCRegular, styles.fontLarge]}>
                Light Mode
              </Text>
            </View>
            <View style={[styles.width30, styles.centerItems]}>
              <Switch
                trackColor={{ false: "#CCCCCC", true: "#CCCCCC" }}
                thumbColor={lightEnabled ? "#2196F3" : "gray"}
                onValueChange={lightSwitch}
                value={lightEnabled}
                style={[styles.switch]}
              />
            </View>
          </View>

          <View style={[styles.settingOption, styles.width70, styles.inline]}>
            <View style={[styles.width70, styles.textCenter]}>
              <Text style={[styles.AmaticSCRegular, styles.fontLarge]}>
                Dark Mode
              </Text>
            </View>
            <View style={[styles.width30, styles.centerItems]}>
              <Switch
                trackColor={{ false: "#CCCCCC", true: "#CCCCCC" }}
                thumbColor={darkEnabled ? "#2196F3" : "gray"}
                onValueChange={darkSwitch}
                value={darkEnabled}
                style={[styles.switch]}
              />
            </View>
          </View>

          <View style={[styles.settingOption, styles.width70, styles.inline]}>
            <View style={[styles.width70, styles.textCenter]}>
              <Text style={[styles.AmaticSCRegular, styles.fontLarge]}>
                Halloween Mode
              </Text>
            </View>
            <View style={[styles.width30, styles.centerItems]}>
              <Switch
                trackColor={{ false: "#CCCCCC", true: "#CCCCCC" }}
                thumbColor={halloweenEnabled ? "#09FF00" : "gray"}
                onValueChange={halloweenSwitch}
                value={halloweenEnabled}
                style={[styles.switch]}
              />
            </View>
          </View>

          {/* -------------------------------- Dietary Preferences -------------------------------- */}

          <View
            style={[
              styles.outline,
              styles.smallMargins,
              styles.settingOption,
              styles.centerItems,
            ]}
          >
            <Text style={[styles.AmaticSCRegular, styles.fontLarge]}>
              Dietary Preference
            </Text>
          </View>

          <View style={[styles.dietOptions, styles.smallMargins]}>
            <SelectDropdown
              buttonStyle={{
                width: 250,
                borderWidth: 1,
                borderRadius: 5,
              }}
              defaultValue={"Default"}
              data={dietaryOptions}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                setDietOption(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>

          {/* -------------------------------- Remove Ingrededients -------------------------------- */}

          <View
            style={[
              styles.outline,
              styles.smallMargins,
              styles.settingOption,
              styles.centerItems,
            ]}
          >
            <Text style={[styles.AmaticSCRegular, styles.fontLarge]}>
              Remove Ingredients
            </Text>
          </View>
          <Text
            style={[styles.smallMargins, styles.fontSmall, styles.AmaticSCBold]}
          >
            Search for ingredients you'd like to remove:
          </Text>

          <View>
            <View style={[styles.horizontalMargins]}>
              <View style={[styles.flex]}>
                <TextInput
                  placeholder=" Ingredient to be removed..."
                  style={[styles.input, styles.outline]}
                  value={searchText}
                  onChangeText={(text) => {
                    setSearchText(text);
                    text === "" ? setSearching(false) : setSearching(true);
                    text != ""
                      ? setFilteredArray(match(text.toLowerCase(), ingredients))
                      : setFilteredArray([]);
                  }}
                  searchText={searchText}
                  setSearchText={setSearchText}
                />

                <Pressable
                  style={[styles.clearButton]}
                  onPress={() => {
                    setSearchText("");
                    setSearching(false);
                    Keyboard.dismiss();
                  }}
                >
                  <Text style={[styles.AmaticSCBold, styles.fontMedium]}>
                    Clear
                  </Text>
                </Pressable>
              </View>
              <View style={[{ alignItems: "center", zIndex: 2 }]}>
                {searching ? (
                  <View>
                    <ScrollView
                      style={[styles.searchBar]}
                      keyboardShouldPersistTaps={"always"}
                    >
                      {filteredArray.map((ingredient) => {
                        return (
                          <View key={ingredient.id}>
                            <TouchableOpacity
                              onPress={() => {
                                removePressHandler({ ...ingredient });
                              }}
                              style={[styles.outline, styles.searchResult]}
                            >
                              <Text
                                style={[
                                  styles.AmaticSCRegular,
                                  styles.fontMedium,
                                  styles.searchElement,
                                ]}
                              >
                                {ingredient.name.replace("_", " ")}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </ScrollView>
                    <View style={[styles.searchPushUp]}></View>
                  </View>
                ) : (
                  <Text></Text>
                )}
              </View>
            </View>
          </View>

          {/* -------------------------------- Horizontal ScrollView for Removed Ingredients-------------------------------- */}

          <Text
            style={[
              styles.AmaticSCRegular,
              styles.fontLarge,
              styles.horizontalMargins,
            ]}
          >
            Removed:
          </Text>

          <View
            style={[
              styles.outline,
              styles.smallMargins,
              styles.selectedIngredients,
            ]}
          >
            <ScrollView horizontal={true}>
              {removedIngredients.map((ingredient) => {
                return (
                  <Pressable
                    key={ingredient.id}
                    style={[styles.removedElement]}
                    onPress={() => selectedListPress({ ...ingredient })}
                  >
                    <Text style={[styles.fontSmall, styles.AmaticSCBold]}>
                      {ingredient.name.replace("_", " ")}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          <View style={[styles.navView]}></View>
        </Pressable>
      </KeyboardAwareScrollView>
    </Animatable.View>
  );
}
