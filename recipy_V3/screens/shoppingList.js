import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  TextInput,
  Keyboard,
} from "react-native";
import PieChart from "react-native-expo-pie-chart";
import { useStoreState, useStoreActions } from "easy-peasy";
import styles from "../styles/shoppingListStyles";
import uuid from "react-native-uuid";
import * as Animatable from "react-native-animatable";

export default function ShoppingList({ navigation }) {
  /* -------------------- Local State Variables -------------------- */
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const [itemString, setItemString] = useState("");
  const [deleteItems, setDeleteItems] = useState(false);

  /* -------------------- Redux State Variables -------------------- */
  const shoppingList = useStoreState((state) => state.shoppingList);
  const setShoppingList = useStoreActions((actions) => actions.setShoppingList);
  const purchasedList = useStoreState((state) => state.purchasedList);
  const setPurchasedList = useStoreActions(
    (actions) => actions.setPurchasedList
  );

  /* -------------------- Redux State Colors -------------------- */
  const headerColor = useStoreState((state) => state.headerColor);
  const pageColor = useStoreState((state) => state.pageColor);
  const bannerColor = useStoreState((state) => state.bannerColor);

  /* -------------------- Handler Functions -------------------- */

  const enterPressHandler = () => {
    let newShoppingList = shoppingList;
    newShoppingList.push({ name: itemString, id: uuid.v4() });
    setShoppingList(newShoppingList);
    setItemString("");
  };

  const uncheckPressHandler = (item) => {
    let newPurchasedList = purchasedList;
    newPurchasedList.push({ ...item });
    setPurchasedList(newPurchasedList);
    let newShoppingList = shoppingList.filter(
      (grocery) => grocery.name != item.name
    );
    setShoppingList(newShoppingList);
  };

  const checkPressHandler = (item) => {
    let newPurchasedList = purchasedList.filter(
      (grocery) => grocery.name != item.name
    );
    setPurchasedList(newPurchasedList);
    let newShoppingList = shoppingList;
    newShoppingList.push({ ...item });
    setShoppingList(newShoppingList);
  };

  const deleteUncheckPressHandler = (item) => {
    let newShoppingList = shoppingList.filter(
      (grocery) => grocery.name != item.name
    );
    setShoppingList(newShoppingList);
  };

  const deleteCheckPressHandler = (item) => {
    let newPurchasedList = purchasedList.filter(
      (grocery) => grocery.name != item.name
    );
    setPurchasedList(newPurchasedList);
  };

  const deleteItemsPressHandler = () => {
    setDeleteItems(!deleteItems);
  };

  /* -------------------- Render Method -------------------- */
  return (
    <Animatable.View style={[styles.wholeScreen]} animation="fadeInRightBig">
      <ScrollView
        style={[styles.smallMargins]}
        keyboardShouldPersistTaps={"always"}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          keyboardShouldPersistTaps="always"
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View
            style={[styles.outline, styles.settingOption, styles.centerItems]}
          >
            <Text style={[styles.AmaticSCRegular, styles.fontLarge]}>
              Shopping List
            </Text>
          </View>

          <View style={[styles.flex, styles.verticalMargins]}>
            <TextInput
              placeholder=" add grocery items..."
              style={[styles.input, styles.outline]}
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                text === "" ? setSearching(false) : setSearching(true);
                text != "" ? setItemString(text) : setItemString("");
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

            <Pressable
              style={[styles.clearButton]}
              onPress={() => {
                setSearchText("");
                setSearching(false);
                enterPressHandler();
                Keyboard.dismiss();
              }}
            >
              <Text style={[styles.AmaticSCBold, styles.fontMedium]}>
                Enter
              </Text>
            </Pressable>
          </View>

          <View>
            <Text style={[styles.AmaticSCBold, styles.fontMedium]}>
              Not Purchased:
            </Text>
          </View>

          <View style={[styles.outline, styles.shoppingList]}>
            <ScrollView>
              {shoppingList.map((item) => {
                return (
                  <View key={uuid.v4()}>
                    <View style={[styles.flex]}>
                      <Pressable
                        style={[]}
                        key={uuid.v4()}
                        onPress={() => {
                          uncheckPressHandler({ ...item });
                        }}
                      >
                        <Image
                          source={require("../assets/icons/uncheck.png")}
                          style={[styles.uncheckIcon]}
                        />
                      </Pressable>

                      <Text style={[styles.AmaticSCBold, styles.fontMedium]}>
                        {item.name}
                      </Text>

                      {deleteItems ? (
                        <View style={[styles.deleteItem]}>
                          <Pressable
                            style={[]}
                            key={uuid.v4()}
                            onPress={() => {
                              deleteUncheckPressHandler({ ...item });
                            }}
                          >
                            <Image
                              source={require("../assets/icons/delete.png")}
                              style={[styles.deleteIcon]}
                            />
                          </Pressable>
                        </View>
                      ) : null}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <View>
            <Text style={[styles.AmaticSCBold, styles.fontMedium]}>
              Purchased:
            </Text>
          </View>

          <View style={[styles.outline, styles.shoppingList]}>
            <ScrollView>
              {purchasedList.map((item) => {
                return (
                  <View key={uuid.v4()}>
                    <View style={[styles.flex]}>
                      <Pressable
                        key={uuid.v4()}
                        onPress={() => {
                          checkPressHandler({ ...item });
                        }}
                      >
                        <Image
                          source={require("../assets/icons/check.png")}
                          style={[styles.uncheckIcon]}
                          tintColor="#40AAF2"
                        />
                      </Pressable>

                      <Text style={[styles.AmaticSCBold, styles.fontMedium]}>
                        {item.name}
                      </Text>
                    </View>

                    {deleteItems ? (
                      <View style={[styles.deleteItem]}>
                        <Pressable
                          style={[]}
                          key={uuid.v4()}
                          onPress={() => {
                            deleteCheckPressHandler({ ...item });
                          }}
                        >
                          <Image
                            source={require("../assets/icons/delete.png")}
                            style={[styles.deleteIcon]}
                          />
                        </Pressable>
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <Pressable
            style={[
              styles.deleteButton,
              { backgroundColor: deleteItems ? "#40AAF2" : "#E42323" },
            ]}
            onPress={() => {
              deleteItemsPressHandler();
            }}
          >
            <Text
              style={[
                styles.fontMedium,
                styles.AmaticSCBold,
                styles.smallMargins,
                styles.deleteButtonText,
              ]}
            >
              {deleteItems ? "Done!" : "Delete Items"}
            </Text>
          </Pressable>

          <View style={[styles.navView]}></View>
        </Pressable>
      </ScrollView>
    </Animatable.View>
  );
}
