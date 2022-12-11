import React, { useContext } from "react";
import { View, Text, Image } from "react-native";
import { S3Image } from "aws-amplify-react-native";
import { PostType } from "../../../types";
import moment from "moment";
import { AuthContext } from "../../../Context/AuthContext";

import styles from "./styles";

export type MainContainerProps = {
  post: PostType;
};

export const sortFunction = (a: PostType, b: PostType) => {
  var dateA = new Date(a.createdAt).getTime();
  var dateB = new Date(b.createdAt).getTime();
  return dateA > dateB ? 1 : -1;
};

const MainContainer = ({ post }: MainContainerProps) => (
  <View style={styles.container}>
    <View style={styles.postHeaderContainer}>
      <Text style={styles.name}>{post.user.name}</Text>
      <Text style={styles.username}>@{post.user.username}</Text>

      <Text style={styles.smallDot}>•</Text>
      <Text style={styles.createdAt}> {moment(post.createdAt).fromNow()} </Text>
    </View>
    <View>
      <Text style={styles.content}>{post.content}</Text>
      {!!post.image && <S3Image style={styles.image} imgKey={post.image} />}
    </View>
  </View>
);

export default MainContainer;
