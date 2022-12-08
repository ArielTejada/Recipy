import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  ImageBackground,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";

import styles from "../styles/favorite-styles";
import { useStoreState, useStoreActions } from "easy-peasy";
const { height, width } = Dimensions.get("window");
import axios from "axios";

export default function Favorite({ navigation }) {
  /* -------------------- Local State Variables -------------------- */
  const [showRecommended, setShowRecommended] = useState(false);

  /* -------------------- Redux State Variables -------------------- */
  const refresh = useStoreState((state) => state.refresh);
  const setRefresh = useStoreActions((actions) => actions.setRefresh);

  const likedRecipes = useStoreState((state) => state.likedRecipes);
  const pantryItems = useStoreState((state) => state.pantryItems);
  const recommendedRecipes = useStoreState((state) => state.recommendedRecipes);
  const renderedRecommended = useStoreState(
    (state) => state.renderedRecommended
  );
  const setRecommendedRecipes = useStoreActions(
    (actions) => actions.setRecommendedRecipes
  );
  const setRenderedRecommended = useStoreActions(
    (actions) => actions.setRenderedRecommended
  );

  const setCurrentRecipeMacros = useStoreActions(
    (actions) => actions.setCurrentRecipeMacros
  );
  const setCurrentRecipeTitle = useStoreActions(
    (actions) => actions.setCurrentRecipeTitle
  );
  const setCurrentRecipe = useStoreActions(
    (actions) => actions.setCurrentRecipe
  );
  const setIngredientsRequired = useStoreActions(
    (actions) => actions.setIngredientsRequired
  );
  const setRecipeDescription = useStoreActions(
    (actions) => actions.setRecipeDescription
  );
  const setSteps = useStoreActions((actions) => actions.setSteps);
  const setRecipeLink = useStoreActions((actions) => actions.setRecipeLink);
  const setRecipeID = useStoreActions((actions) => actions.setRecipeID);

  /* -------------------- Redux State Colors -------------------- */
  const headerColor = useStoreState((state) => state.headerColor);
  const pageColor = useStoreState((state) => state.pageColor);
  const bannerColor = useStoreState((state) => state.bannerColor);

  /* -------------------- Handler Functions -------------------- */
  const returnIngredientString = (ingredients, attr) => {
    let output = [];
    for (let i = 0; i < ingredients.length; i++) {
      output.push(ingredients[i][attr]);
    }
    return output.join(",");
  };

  const likedRecipePress = (
    title = "Loading...",
    desc = "Loading...",
    macros = "Loading...",
    reqs = "Loading...",
    steps = "Loading...",
    recipe = "Loading...",
    link = "Loading...",
    id = "Loading..."
  ) => {
    setCurrentRecipeTitle(title);
    setRecipeDescription(desc);
    setCurrentRecipeMacros(macros);
    setIngredientsRequired(reqs);
    setSteps(steps);
    setCurrentRecipe(recipe);
    setRecipeLink(link);
    setRecipeID(id);
    navToRecipe();
  };

  const navToRecipe = () => {
    navigation.navigate("LikedRecipe");
  };

const generateRecommended = async () => {
    if (
      likedRecipes.length > 0 &&
      pantryItems.length > 0 &&
      showRecommended === false
    ) {
      await axios({
        method: "get",
        url: `http://recipy-ingredients-backend.herokuapp.com/recommend/${
          likedRecipes.length === 0
            ? "1538,6,43"
            : returnIngredientString(likedRecipes, "id")
        }/${
          pantryItems.length === 0
            ? "rice,lemon"
            : returnIngredientString(pantryItems, "name")
        }`,
      })
        .then((response) => {
          setRecommendedRecipes(response.data);
        })
        .then(() => {
          console.log("Response: ", recommendedRecipes);
          setRefresh(!refresh);
        });
      setRefresh(!refresh);
      setRenderedRecommended(true);
    }
    setShowRecommended(!showRecommended);
  };

  /* -------------------- Render Method -------------------- */
  return (
    <Animatable.View
      animation="fadeInRightBig"
      style={[styles.wholeScreen, { backgroundColor: pageColor }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.pageMargins]}>
          <View>
            <Text style={[styles.AmaticSCBold, styles.fontLarge]}>
              Liked Recipes:
            </Text>
          </View>

          <View style={[styles.likedRecipeScrollView]}>
            <ScrollView style={[]}>
              {likedRecipes.map((recipe) => {
                return (
                  <Pressable
                    style={[styles.outline]}
                    key={recipe.id}
                    onPress={() =>
                      likedRecipePress(
                        recipe.title,
                        recipe.desc,
                        recipe.macros
                          .split("\n")
                          .join(" ")
                          .split(",")
                          .join(", "),
                        recipe.reqs,
                        recipe.steps,
                        recipe.recipe,
                        recipe.link,
                        recipe.id
                      )
                    }
                  >
                    <ImageBackground
                      source={require("../assets/img/banner71.png")}
                      style={[styles.recipeBack2]}
                    >
                      <Text
                        style={[
                          styles.AmaticSCBold,
                          styles.fontLarge,
                          styles.textCenter,
                        ]}
                      >
                        {recipe.title}
                      </Text>
                    </ImageBackground>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          <Pressable
            onPress={generateRecommended}
            style={[
              styles.generateButton,
              styles.outline,
              { backgroundColor: showRecommended ? "#4FC1FF" : "#2196F3" },
            ]}
          >
            <Text style={[styles.generateButtonText]}>
              Generate Recommended Recipes
            </Text>
          </Pressable>

          <View>
            <Text style={[styles.AmaticSCBold, styles.fontLarge]}>
              Recommended Recipes:{" "}
            </Text>
          </View>

          <View style={[styles.outline, styles.recommededScrollView]}>
            {renderedRecommended && showRecommended ? (
              <View>
                <Animatable.View animation="zoomInRight">
                  <ScrollView horizontal={true}>
                    {Object.keys(
                      Object.values(Object.values(recommendedRecipes))[0][
                        "CARBS"
                      ]
                    ).map((key, index) => {
                      return (
                        <Pressable
                          style={[styles.outline]}
                          key={key}
                          onPress={() =>
                            likedRecipePress(
                              Object.values(
                                Object.values(
                                  Object.values(recommendedRecipes)
                                )[0]["TITLE"]
                              )[index],
                              Object.values(
                                Object.values(
                                  Object.values(recommendedRecipes)
                                )[0]["DESCRIPTION"]
                              )[index],
                              Object.values(
                                Object.values(
                                  Object.values(recommendedRecipes)
                                )[0]["MACROS"]
                              )
                                [index].split("\n")
                                .join(" ")
                                .split(",")
                                .join(", "),
                              Object.values(
                                Object.values(
                                  Object.values(recommendedRecipes)
                                )[0]["has_ingredients"]
                              )[index],
                              Object.values(
                                Object.values(
                                  Object.values(recommendedRecipes)
                                )[0]["INGREDIENTS_LIST"]
                              )[index],
                              Object.values(
                                Object.values(
                                  Object.values(recommendedRecipes)
                                )[0]["DIRECTIONS"]
                              )[index],
                              Object.values(
                                Object.values(
                                  Object.values(recommendedRecipes)
                                )[0]["LINK"]
                              )[index],
                              Object.keys(
                                Object.values(
                                  Object.values(recommendedRecipes)
                                )[0]["TITLE"]
                              )[index]
                            )
                          }
                        >
                          <ImageBackground
                            source={require("../assets/img/recipe2.png")}
                            style={[styles.recipeBack]}
                          >
                            <Text style={[styles.recipePressableText]}>
                              {
                                Object.values(
                                  Object.values(
                                    Object.values(recommendedRecipes)
                                  )[0]["TITLE"]
                                )[index]
                              }
                            </Text>
                          </ImageBackground>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                </Animatable.View>
              </View>
            ) : (
              <Animatable.View animation="zoomInLeft">
                <ImageBackground
                  source={require("../assets/img/recipylogo.png")}
                  style={[styles.tempLogo]}
                ></ImageBackground>
              </Animatable.View>
            )}
          </View>
        </View>
        <View style={[styles.navView]}></View>
      </ScrollView>
    </Animatable.View>
  );
}
