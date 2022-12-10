import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Pressable,
  Animated,
} from "react-native";
import styles from "../styles/category-styles";
import { useStoreState, useStoreActions } from "easy-peasy";
import * as Animatable from "react-native-animatable";

export default function Category({ navigation }) {
  /* -------------------- Redux State Variables -------------------- */
  const category = useStoreState((state) => state.category);
  const categoryList = useStoreState((state) => state.categoryList);
  const selectedIngredients = useStoreState(
    (state) => state.selectedIngredients
  );
  const setSelectedIngredients = useStoreActions(
    (actions) => actions.setSelectedIngredients
  );
  const setHaveIngredients = useStoreActions(
    (actions) => actions.setHaveIngredients
  );

  const refresh = useStoreState((state) => state.refresh);
  const setRefresh = useStoreActions((actions) => actions.setRefresh);

  const dietOption = useStoreState((state) => state.dietOption);
  const removedIngredients = useStoreState((state) => state.removedIngredients);

  const recentlyUsed = useStoreState((state) => state.recentlyUsed);
  const setRecentlyUsed = useStoreActions((actions) => actions.setRecentlyUsed);

  /* -------------------- Redux State Colors -------------------- */
  const headerColor = useStoreState((state) => state.headerColor);
  const pageColor = useStoreState((state) => state.pageColor);
  const bannerColor = useStoreState((state) => state.bannerColor);

  /* -------------------- Handler Functions -------------------- */
  const selectedListPress = (ingredientObj) => {
    let newList = selectedIngredients.filter(
      (ingredient) => ingredient.id != ingredientObj.id
    );
    setSelectedIngredients(newList);
    setHaveIngredients();
    console.log(
      `removed ${ingredientObj.name} num ingredients: ${newList.length}`
    );
  };

  const categoryPressHandler = (ingredientObj) => {
    if (
      selectedIngredients.find(
        (ingredient) => ingredient.name === ingredientObj.name
      )
    ) {
      return;
    }
    let newList = selectedIngredients;
    newList.push({ ...ingredientObj });
    setSelectedIngredients(newList);
    setRecentlyUsed({ ...ingredientObj });
    setHaveIngredients();
    setRefresh(!refresh);
    console.log(
      `added: ${ingredientObj.name} num ingredients: ${newList.length}`
    );
  };

  const refreshPage = () => {
    setRefresh();
  };

  /* -------------------- Pressable Animations -------------------- */

  const animated = new Animated.Value(1);
  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.4,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  /* -------------------- Render Method -------------------- */
  return (
    <Animatable.View
      style={[styles.wholeScreen, { backgroundColor: pageColor }]}
      animation="fadeInRight"
    >
      <View style={[styles.pushDown, { backgroundColor: headerColor }]}></View>

      <View
        style={[styles.backButtonSection, { backgroundColor: headerColor }]}
      >
        <ImageBackground
          source={require("../assets/img/banner1.png")}
          style={[
            styles.banner,
            { overflow: "hidden" },
            styles.outline,
            { borderColor: "white" },
          ]}
          resizeMode="contain"
          imageStyle={[{ tintColor: bannerColor }]}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={[styles.backIconTouch]}
          >
            <Image
              source={require("../assets/icons/go-back.png")}
              style={[
                styles.backIcon,
                { tintColor: bannerColor, marginLeft: 5, marginTop: -8 },
              ]}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <View style={[styles.header, { backgroundColor: headerColor }]}>
        <Text style={[styles.headerText]}>Category: {category}</Text>
      </View>

      <View
        style={[styles.selectedIngredients, styles.outline, styles.margins]}
      >
        <ScrollView horizontal={true}>
          {selectedIngredients.map((ingredient) => {
            return (
              <Pressable
                key={ingredient.id}
                style={[styles.roundBTN, styles.flex]}
                onPress={() => selectedListPress(ingredient)}
              >
                <Text
                  style={[
                    styles.fontMedium,
                    styles.textCenter,
                    styles.AmaticSCBold,
                    { color: "black" },
                  ]}
                >
                  {ingredient.name.replace(/[\r_]/gm, ' ')}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
                    
      <ImageBackground
        source={require('../assets/img/searchItems.png')}
        style={[styles.backImage]}
        resizeMode='contain'
        imageStyle={[{tintColor: headerColor}]}
      >
        <ScrollView style={[styles.ingredientMargins]}  showsVerticalScrollIndicator={false}>
          <View style={[styles.flexRow, styles.centerItems]}>
            {categoryList
              .filter((ingredient) => {
                if (dietOption === "default") {
                  return true;
                }
                return ingredient[dietOption] === "TRUE";
              })
              .filter(
                (ingredient) =>
                  removedIngredients.some(
                    (item) => item.name === ingredient.name
                  ) === false
              )
              .map((ingredient) => {
                return (
                  <TouchableOpacity
                    key={ingredient.id}
                    style={[styles.roundBTN]}
                    onPress={() => {
                      categoryPressHandler({ ...ingredient });
                    }}
                    onPressIn={() => fadeIn}
                    onPressOut={() => fadeOut}
                  >
                    <Text
                      style={[
                        styles.fontMedium,
                        styles.textCenter,
                        styles.AmaticSCBold,
                        { color: "black" },
                      ]}
                    >
                      {ingredient.name.replace(/[\r_]/gm, ' ')}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          <View style={[styles.navView]}></View>
          </View>
        </ScrollView>
      </ImageBackground>
    </Animatable.View>
  );
}
