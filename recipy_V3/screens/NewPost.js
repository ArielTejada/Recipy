import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";

import ProfilePic from "../components/ProfilePic";
import styles from "../styles/new-post-styles";
import * as Animatable from "react-native-animatable";
import { createPost } from "../src/graphql/mutations";

const NewPost = (props) => {
  const [post, setPost] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUrl(result.uri);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  const uploadImage = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const urlParts = imageUrl.split(".");
      const extension = urlParts[urlParts.length - 1];
      const key = `${uuid.v4()}.${extension}`;

      await Storage.put(key, blob);

      return key;
    } catch (e) {
      console.log(e);
    }
    return "";
  };

  const onPostContent = async () => {
    let image;
    if (!!imageUrl) {
      image = await uploadImage();
    }
    try {
      const currentUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      const newPost = {
        content: post,
        image,
        userID: currentUser.attributes.sub,
      };
      await API.graphql(graphqlOperation(createPost, { input: newPost }));
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Posted Successfully!",
      });
      setTimeout(() => {
        props.navigation.goBack();
      }, 300);
    } catch (e) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong",
        text2: "Please try again",
      });
      console.log(e);
    }
  };

  {
    /*--------------------------------------- ^making api callˇ --------------------------------------------- */
  }

  const onBack = () => {
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <Animatable.View animation="fadeInRight">
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity activeOpacity={0.4} onPress={onBack}>
              <Ionicons name="close" size={32} color="#3E92CC" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.4}
              onPress={() => [
                onPostContent(),
                console.log(`Posting the post: ${post} Image: ${imageUrl}`),
              ]}
            >
              <Text style={styles.buttonText}> POST! </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.entirePostContainer}>
            <View>
              <View style={styles.profilePic}>
                <ProfilePic
                  source={require("../assets/img/chef-profile.png")}
                />
              </View>
            </View>

            <View style={styles.inputsContainer}>
              <TextInput
                value={post}
                onChangeText={(value) => setPost(value)}
                multiline={true}
                style={[styles.PostContentInput, styles.action]}
                placeholder={"Create a new post!"}
              />

              <TouchableOpacity onPress={pickImage}>
                <Text style={styles.imageSelectInput}>Select an image!</Text>
                <Image
                  source={require("../assets/img/image-vec.png")}
                  style={styles.imageSelectPic}
                  activeOpacity={0.4}
                />
              </TouchableOpacity>

              <Image source={{ uri: imageUrl }} style={styles.imagePreview} />
            </View>
          </View>
        </SafeAreaView>
      </Animatable.View>
    </ScrollView>
  );
};

export default NewPost;
