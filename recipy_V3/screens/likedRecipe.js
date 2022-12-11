import React from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Share,
  Linking,
} from "react-native";
import PieChart from "react-native-expo-pie-chart";
import { useStoreState, useStoreActions } from "easy-peasy";
import styles from "../styles/recipe-styles";
import * as Animatable from "react-native-animatable";

export default function LikedRecipe({ navigation }) {
  /* -------------------- Redux State Variables -------------------- */
  const refresh = useStoreState((state) => state.refresh);
  const setRefresh = useStoreActions((actions) => actions.setRefresh);

  const currentRecipeMacros = useStoreState(
    (state) => state.currentRecipeMacros
  );
  const currentRecipeTitle = useStoreState((state) => state.currentRecipeTitle);
  const ingredientsRequired = useStoreState(
    (state) => state.ingredientsRequired
  );
  const currentRecipe = useStoreState((state) => state.currentRecipe);
  const steps = useStoreState((state) => state.steps);
  const recipeDescription = useStoreState((state) => state.recipeDescription);
  const recipeLink = useStoreState((state) => state.recipeLink);
  const recipeID = useStoreState((state) => state.recipeID);

  const likedRecipes = useStoreState((state) => state.likedRecipes);
  const setLikedRecipes = useStoreActions((actions) => actions.setLikedRecipes);

  /* -------------------- Redux State Colors -------------------- */
  const headerColor = useStoreState((state) => state.headerColor);
  const pageColor = useStoreState((state) => state.pageColor);
  const bannerColor = useStoreState((state) => state.bannerColor);

  let macroNumbers = [];

  const findMacros = () => {
    let num = "";

    for (let i = 0; i < currentRecipeMacros.length; i++) {
      if (!isNaN(currentRecipeMacros[i])) {
        num += currentRecipeMacros[i];
      }
      if (isNaN(currentRecipeMacros[i])) {
        if (num === "") {
          continue;
        }
        macroNumbers.push(num.trim());
        num = "";
      }
    }
  };

  findMacros();

  const calories = Number(macroNumbers[0]);
  const fat = Number(macroNumbers[1]);
  const carbs = Number(macroNumbers[3]);
  const protein = Number(macroNumbers[5]);
  const totalMacros = fat + carbs + protein;
  const percentages = [
    [(fat / totalMacros).toFixed(2)],
    [(carbs / totalMacros).toFixed(2)],
    [(protein / totalMacros).toFixed(2)],
  ];

  /* -------------------- Handler Functions -------------------- */

  const sendLink = () => {
    Share.share({
      message: recipeLink,
    })
      .then((result) => console.log(result))
      .catch((errorMsg) => console.log(errorMsg));
  };

  const likeRecipePress = () => {
    if (likedRecipes.find((recipe) => recipe.id === recipeID)) {
      let newLikedRecipes = likedRecipes.filter(
        (recipe) => recipe.id != recipeID
      );
      setLikedRecipes(newLikedRecipes);
      console.log("Liked Recipe IDs", newLikedRecipes);
      return;
    }
    let newLikedRecipes = likedRecipes;
    newLikedRecipes.push({
      title: currentRecipeTitle,
      macros: currentRecipeMacros,
      reqs: ingredientsRequired,
      desc: recipeDescription,
      steps: steps,
      recipe: currentRecipe,
      id: recipeID,
      link: recipeLink,
    });
    setLikedRecipes(newLikedRecipes);
    console.log("Liked Recipe IDs", newLikedRecipes);
    setRefresh(!refresh);
  };

  /* -------------------- Render Method -------------------- */
  return (
    <Animatable.View animation="fadeInRight">
      <View style={[styles.pushDown, { backgroundColor: "#b71282" }]}></View>

      <View style={[styles.backButtonSection, { backgroundColor: "#b71282" }]}>
        <ImageBackground
          source={require("../assets/img/banner1.png")}
          style={[styles.banner, { overflow: "hidden" }]}
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
                { tintColor: bannerColor, marginLeft: 0, marginLeft: 5 },
              ]}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[{ backgroundColor: pageColor }]}
      >
        <View style={[styles.pageMargins]}>
          <Text style={styles.recipeTitle}>{currentRecipeTitle}</Text>

          <Text style={[styles.recipeHeaderText]}>Description:</Text>
          <Text style={[styles.recipeDataText]}>{recipeDescription}</Text>

          <Text style={[styles.recipeHeaderText]}>Recipe Macros:</Text>
          <Text style={[styles.recipeDataText]}>
            {currentRecipeMacros
              .replace(/[\r\n]/gm, " ")
              .replace(/[,]/gm, ", ")}
          </Text>

          <View style={[styles.macrosView, styles.outline]}>
            <View style={[styles.macroBoxArea]}>
              <View style={[styles.macroVisual]}>
                <Text style={[styles.macroVisualText]}>
                  Fat {(percentages[0] * 100).toFixed(0)}%{" "}
                </Text>
                <View style={[styles.box1]}></View>
              </View>
              <View style={[styles.macroVisual]}>
                <Text style={[styles.macroVisualText]}>
                  Carbs {(percentages[1] * 100).toFixed(0)}%{" "}
                </Text>
                <View style={[styles.box2]}></View>
              </View>
              <View style={[styles.macroVisual]}>
                <Text style={[styles.macroVisualText]}>
                  Protein {(percentages[2] * 100).toFixed(0)}%{" "}
                </Text>
                <View style={[styles.box3]}></View>
              </View>
            </View>
            <View style={[styles.pieChart]}>
              <PieChart
                data={[
                  { key: "Fat", count: percentages[0] * 100, color: "#1ED760" },
                  {
                    key: "Carbs",
                    count: percentages[1] * 100,
                    color: "#007ACC",
                  },
                  {
                    key: "Protein",
                    count: percentages[2] * 100,
                    color: "#F52727",
                  },
                ]}
                length={100}
              />
            </View>
          </View>

          <Text style={[styles.recipeHeaderText]}>Ingredients Required:</Text>
          <Text style={[styles.recipeDataText]}>{ingredientsRequired}</Text>

          <Text style={[styles.recipeHeaderText]}>Directions:</Text>
          <Text style={[styles.recipeDataText]}>
            {steps.map((line) => {
              return line + "\n";
            })}
          </Text>
          <Text style={[styles.recipeDataText]}>{currentRecipe}</Text>

          <Text style={[styles.recipeHeaderText]}>Link:</Text>
          <Text
            style={[styles.link, { color: headerColor }]}
            onPress={() => Linking.openURL(recipeLink)}
          >
            {recipeLink}
          </Text>

          <View style={[styles.buttonsSection]}>
            <Pressable
              style={[styles.linkButton, styles.outline]}
              onPress={() => sendLink()}
            >
              <Text style={[styles.sendText]}>Send To A Friend!</Text>
            </Pressable>

            <Pressable
              style={[
                styles.likeButton,
                styles.outline,
                {
                  backgroundColor: likedRecipes.some(
                    (recipe) => recipe.id === recipeID
                  )
                    ? "#2196F3"
                    : "#39CD7B",
                },
              ]}
              onPress={() => {
                likeRecipePress();
              }}
            >
              <Text
                style={[
                  styles.sendText,
                  {
                    color: likedRecipes.some((recipe) => recipe.id === recipeID)
                      ? "white"
                      : "black",
                  },
                ]}
              >
                {likedRecipes.some((recipe) => recipe.id === recipeID)
                  ? "Liked!"
                  : "Like This Recipe"}
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={[styles.navView]}></View>
      </ScrollView>
    </Animatable.View>
  );
}
