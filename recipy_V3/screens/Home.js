import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Dimensions
} from "react-native";

import uuid from "react-native-uuid";

import { useStoreState, useStoreActions } from "easy-peasy";
import axios from "axios";
import * as Animatable from "react-native-animatable";
const { height, width } = Dimensions.get("window");
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import styles from "../styles/home-styles";

export default function Home({ navigation }) {
  /* -------------------- Local State Variables -------------------- */
  const [recievedData, setRecievedData] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showRecipeSearch, setShowRecipeSearch] = useState(false);
  const [recievedRecipeSearchData, setRecievedRecipeSearchData] = useState(false);
  const [recipeSearchData, setRecipeSearchData] = useState([]);
  const [recipeSearchFailed, setRecipeSearchFailed] = useState(false);
  const [generatingRecipes, setGeneratingRecipes] = useState(false);
  const [generatingSearch, setGeneratingSearch] = useState(false);

  /* -------------------- Redux State Variables -------------------- */
  const refresh = useStoreState((state) => state.refresh);
  const setRefresh = useStoreActions((actions) => actions.setRefresh);
  const ingredients = useStoreState((state) => state.ingredients);
  const setCategory = useStoreActions((actions) => actions.setCategory);
  const setCategoryList = useStoreActions((actions) => actions.setCategoryList);
  const selectedIngredients = useStoreState((state) => state.selectedIngredients);
  const setSelectedIngredients = useStoreActions((actions) => actions.setSelectedIngredients);
  const haveIngredints = useStoreState((state) => state.haveIngredients);
  const setHaveIngredients = useStoreActions((actions) => actions.setHaveIngredients);

  const Recipes = useStoreState((state) => state.Recipes);
  const setRecipes = useStoreActions((actions) => actions.setRecipes);
  const setCurrentRecipeMacros = useStoreActions((actions) => actions.setCurrentRecipeMacros);
  const setCurrentRecipeTitle = useStoreActions((actions) => actions.setCurrentRecipeTitle);
  const setCurrentRecipe = useStoreActions((actions) => actions.setCurrentRecipe);
  const setIngredientsRequired = useStoreActions((actions) => actions.setIngredientsRequired);
  const setRecipeDescription = useStoreActions((actions) => actions.setRecipeDescription);
  const setSteps = useStoreActions((actions) => actions.setSteps);
  const setRecipeLink = useStoreActions((actions) => actions.setRecipeLink);
  const setRecipeID = useStoreActions((actions) => actions.setRecipeID);

  const generateColor = useStoreState((state) => state.generateColor);
  const haveIngredients = useStoreState((state) => state.haveIngredients);
  const generateRecipes = useStoreState((state) => state.generateRecipes);
  const setGenerateRecipes = useStoreActions((actions) => actions.setGenerateRecipes);

  const dietOption = useStoreState((state) => state.dietOption);
  const removedIngredients = useStoreState((state) => state.removedIngredients);

  const pantryItems = useStoreState((state) => state.pantryItems);
  const likedRecipes = useStoreState((state) => state.likedRecipes);
  const recommendedRecipes = useStoreState((state) => state.recommendedRecipes);
  const setRecommendedRecipes = useStoreActions((actions) => actions.setRecommendedRecipes);
  const setRenderedRecommended = useStoreActions((actions) => actions.setRenderedRecommended);

  /* -------------------- Redux State Colors -------------------- */
  const headerColor = useStoreState((state) => state.headerColor);
  const pageColor = useStoreState((state) => state.pageColor);
  const bannerColor = useStoreState((state) => state.bannerColor);

  /* -------------------- Handler Functions -------------------- */
  const addIngredientHandler = () => {
    navigation.navigate("AddIngredient");
  };
  const profilePressHandler = () => {
    navigation.navigate("Account");
  };
  const categoryPressHandler = () => {
    navigation.navigate("Category");
  };
  const navToRecipe = () => {
    navigation.navigate("Recipe");
  };

  const getRecipes = async (ingredients) => {
    await axios({
      method: "get",
      url: `https://recipy-ingredients-backend.herokuapp.com/search/${ingredients}/${
        dietOption === "vegan"
          ? "isVegan"
          : dietOption === "vegetarian"
          ? "isVegetarian"
          : dietOption === "keto"
          ? "isKeto"
          : "x"
      }
      /${
        removedIngredients.length === 0
          ? "x"
          : returnIngredientString(removedIngredients, "name")
      }`,
    })
      .then((response) => {
        setRecipes(response.data);
      })
      .then(() => {
        console.log(Recipes);
        setGeneratingRecipes(false);
        setRefresh(!refresh);
      });
    setRefresh(!refresh);
  };

  const pressGenerate = async () => {
    if (haveIngredients && generateRecipes) {
      setGenerateRecipes();
    }
    if (haveIngredients && !generateRecipes) {
      setGeneratingRecipes(true);
      let ingredientString = returnIngredientString(selectedIngredients,"name");
      await getRecipes(ingredientString);
      setGenerateRecipes();
      setRecievedData(true);
    }
    return;
  };

  const returnIngredientString = (ingredients, attr) => {
    let output = [];
    for (let i = 0; i < ingredients.length; i++) {
      output.push(ingredients[i][attr]);
    }
    return output.join(",");
  };

  const recipePressHandler = (
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

  const pressFruit = () => {
    setCategory("Fruits");
    setCategoryList(
      ingredients.filter((ingredient) => ingredient["type"] == "fruit")
    );
    categoryPressHandler();
  };

  const pressProtein = () => {
    setCategory("Protein");
    setCategoryList(
      ingredients.filter(
        (ingredient) =>
          ingredient["type"] == "meat" || ingredient["type"] == "fish"
      )
    );
    categoryPressHandler();
  };

  const pressDairy = () => {
    setCategory("Dairy");
    setCategoryList(
      ingredients.filter((ingredient) => ingredient["type"] == "dairy")
    );
    categoryPressHandler();
  };

  const pressVeggies = () => {
    setCategory("Veggies");
    setCategoryList(
      ingredients.filter((ingredient) => ingredient["type"] == "vegetable")
    );
    categoryPressHandler();
  };

  const pressGrain = () => {
    setCategory("Grain");
    setCategoryList(
      ingredients.filter((ingredient) => ingredient["type"] == "grains")
    );
    categoryPressHandler();
  };

  const pressHerbs = () => {
    setCategory("Herbs");
    setCategoryList(
      ingredients.filter(
        (ingredient) =>
          ingredient["type"] == "herbs" || ingredient["type"] == "nuts"
      )
    );
    categoryPressHandler();
  };

  const selectedListPress = (ingredientObj) => {
    let newList = selectedIngredients.filter(
      (ingredient) => ingredient.id != ingredientObj.id
    );
    setSelectedIngredients(newList);
    setRefresh(!refresh);
    if (newList.length == 0) {
      setGenerateRecipes();
      setRecievedData(false);
    }
    setHaveIngredients();
    setRefresh(!refresh);
    console.log(
      `removed ${ingredientObj.name} num ingredients: ${newList.length}`
    );
    if(newList.length === 0) {
      setRecievedData(false);
      setRecipes([]);
    }
  };

  const getSearchRecipes = async (text) => {
    await axios({
      method: "get",
      url: `https://recipy-ingredients-backend.herokuapp.com/key_word_search/${text}`,
    })
      .then((response) => {
        setRecipeSearchData(response.data);
      })
      .then(() => {
        console.log(recipeSearchData);
        setGeneratingSearch(false);
        setRefresh(!refresh);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          setRecipeSearchFailed(true);
        }
      });
    setRefresh(!refresh);
  };

  const recipeSearchEnterPress = async (text) => {
    setGeneratingSearch(true);
    await getSearchRecipes(text);
    setRecievedRecipeSearchData(true);
    setShowRecipeSearch(true);
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
        extraScrollHeight={height/5}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View>
            <ImageBackground
              source={require("../assets/img/banner3.png")}
              style={[styles.banner]}
              imageStyle={[{ tintColor: "#2196F3" }]}
            >
              <Image
                source={require("../assets/img/recipylogo.png")}
                style={[styles.logo]}
              />
            </ImageBackground>

            <View style={[styles.container]}>
              <Pressable
                onPress={addIngredientHandler}
                style={[styles.addButton, { backgroundColor: headerColor }]}
              >
                <Text style={[styles.fontMedium, { fontFamily: "AmaticSC-Bold" }]}>Add Ingredient</Text>
              </Pressable>

              <Pressable
                onPress={pressGenerate}
                style={[styles.addButton, { backgroundColor: generateColor }]}
              >
                <Text style={[styles.fontMedium, { fontFamily: "AmaticSC-Bold" }]}>Generate Recipes</Text>
              </Pressable>
            </View>

            <View>
              <ImageBackground
                source={require("../assets/img/categories.png")}
                resizeMode="contain"
                style={[styles.caterories]}
              >
                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    styles.category1,
                    { backgroundColor: headerColor },
                  ]}
                  onPress={pressFruit}
                >
                  <Text style={[styles.categoryText]}>Fruits</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    styles.category2,
                    { backgroundColor: headerColor },
                  ]}
                  onPress={pressProtein}
                >
                  <Text style={[styles.categoryText]}>Protein</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    styles.category3,
                    { backgroundColor: headerColor },
                  ]}
                  onPress={pressDairy}
                >
                  <Text style={[styles.categoryText]}>Dairy</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    styles.category4,
                    { backgroundColor: headerColor },
                  ]}
                  onPress={pressVeggies}
                >
                  <Text style={[styles.categoryText]}>Veggies</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    styles.category5,
                    { backgroundColor: headerColor },
                  ]}
                  onPress={pressGrain}
                >
                  <Text style={[styles.categoryText]}>Grain</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    styles.category6,
                    { backgroundColor: headerColor },
                  ]}
                  onPress={pressHerbs}
                >
                  <Text style={[styles.categoryText]}>Herbs</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>

            <View>
              <Text style={[styles.fontLarge, styles.recipeText]}>
                Selected Ingredients:{" "}
              </Text>
            </View>

            <View style={[styles.selectedIngredients, styles.outline, styles.margins]}>
              <ScrollView horizontal={true}>
                {selectedIngredients.map((ingredient) => {
                  return (
                    <Pressable
                      key={ingredient.id}
                      style={[styles.roundBTN]}
                      onPress={() => selectedListPress({ ...ingredient })}
                    >
                      <Text style={[styles.fontMedium, styles.AmaticSCBold, styles.textCenter]}>{ingredient.name.replace(/[\r_]/gm, ' ')}</Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            {generatingRecipes ? (
              <View>
                <Text style={[styles.AmaticSCBold, styles.fontMedium]}>Generating...</Text>
              </View>
            ) : null}

            {recievedData && generateRecipes && Recipes["TITLE"] != undefined ? (
              <View>
                <View>
                  <Text style={[styles.fontLarge, styles.recipeText]}>
                    You have {Object.values(Recipes["TITLE"]).length} Recipe(s):{" "}
                  </Text>
                </View>

                <View style={[styles.recipeView]}>
                  <ScrollView horizontal={true}>
                    {Object.values(Recipes["TITLE"]).map((recipe, index) => {
                      return (
                        <Pressable
                          key={index}
                          style={[styles.outline, styles.card]}
                          onPress={() =>
                            recipePressHandler(
                              Object.values(Recipes["TITLE"])[index],
                              Object.values(Recipes["DESCRIPTION"])[index],
                              Object.values(Recipes["MACROS"])[index],
                              Object.values(Recipes["has_ingredients"])[index],
                              Object.values(Recipes["INGREDIENTS"])[index],
                              Object.values(Recipes["DIRECTIONS"])[index],
                              Object.values(Recipes["LINK"])[index],
                              Object.keys(Recipes["LINK"])[index]
                            )
                          }
                        >
                          <ImageBackground
                            source={require("../assets/img/recipe2.png")}
                            style={[styles.recipeBack]}
                          >
                            <Text style={[styles.recipePressableText]}>
                              {Object.values(Recipes["TITLE"])[index]}
                            </Text>
                          </ImageBackground>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
            ) : (
              <View style={[styles.outline, styles.selectedIngredients]}>
                <Text style={[styles.fontMedium, styles.AmaticSCBold]}>{Recipes.length == 0 ? " No Search Results..." : " Search Error... Try other combinations!"}</Text>
              </View>
            )}

            <View>
              <View>
                <Text style={[styles.fontLarge, styles.recipeText]}>
                  Search for recipes:
                </Text>
              </View>

              <View style={[styles.recipeSearchInput]}>
                <TextInput
                  placeholder=" Enter Recipe Name..."
                  style={[styles.outline, styles.recipeSearchTextInput]}
                  value={searchText}
                  onChangeText={(text) => {
                    setSearchText(text);
                  }}
                  searchText={searchText}
                  setSearchText={setSearchText}
                />

                <Pressable
                  style={[styles.outline, styles.recipeButton]}
                  onPress={() => {
                    setSearchText("");
                    Keyboard.dismiss();
                  }}
                >
                  <Text style={[ styles.AmaticSCBold, styles.fontLarge, { color: "white" } ]}>Clear</Text>
                </Pressable>

                <Pressable
                  style={[styles.outline, styles.recipeButton]}
                  onPress={() => {
                    recipeSearchEnterPress(searchText);
                    Keyboard.dismiss();
                  }}
                >
                  <Text style={[ styles.AmaticSCBold, styles.fontLarge, { color: "white" }]}>Enter</Text>
                </Pressable>
              </View>

              {generatingSearch ? (
                <View>
                  <Text style={[styles.AmaticSCBold, styles.fontMedium]}>Generating...</Text>
                </View>
              ) : null}

              {showRecipeSearch && recievedRecipeSearchData ? (
                <View>
                  <View>
                    <Text style={[styles.fontLarge, styles.recipeText]}>
                      You have {Object.values(recipeSearchData["TITLE"]).length}{" "}
                      Recipe(s):{" "}
                    </Text>
                  </View>

                  <View style={[styles.recipeView]}>
                    <ScrollView horizontal={true}>
                      {Object.values(recipeSearchData["TITLE"]).map(
                        (searchRecipe, index) => {
                          return (
                            <Pressable
                              key={uuid.v4()}
                              style={[styles.outline, styles.card]}
                              onPress={() =>
                                recipePressHandler(
                                  Object.values(recipeSearchData["TITLE"])[
                                    index
                                  ],
                                  Object.values(
                                    recipeSearchData["DESCRIPTION"]
                                  )[index],
                                  Object.values(recipeSearchData["MACROS"])
                                    [index].split("\n")
                                    .join(" ")
                                    .split(",")
                                    .join(", "),
                                  Object.values(
                                    recipeSearchData["has_ingredients"]
                                  )[index],
                                  Object.values(
                                    recipeSearchData["INGREDIENTS"]
                                  )[index],
                                  Object.values(recipeSearchData["DIRECTIONS"])[
                                    index
                                  ],
                                  Object.values(recipeSearchData["LINK"])[
                                    index
                                  ],
                                  Object.keys(recipeSearchData["LINK"])[index]
                                )
                              }
                            >
                              <ImageBackground
                                source={require("../assets/img/recipe2.png")}
                                style={[styles.recipeBack]}
                              >
                                <Text style={[styles.recipePressableText]}>
                                  {
                                    Object.values(recipeSearchData["TITLE"])[
                                      index
                                    ]
                                  }
                                </Text>
                              </ImageBackground>
                            </Pressable>
                          );
                        }
                      )}
                    </ScrollView>
                  </View>
                </View>
              ) : null}

            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={[styles.navView]}></View>
      </KeyboardAwareScrollView>
    </Animatable.View>
  );
}
