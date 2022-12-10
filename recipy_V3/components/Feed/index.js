import React, { useEffect, useState } from "react";
import { View, FlatList, Dimensions } from "react-native";
import { API, graphqlOperation } from "aws-amplify";

// import posts from "../../data/posts";
import NewPostButton from "../NewPostButton";
import Post from "../Social-Feed";
import { listPosts } from "../../src/graphql/queries";
import { sortFunction } from "../Social-Feed/MainContainer";

const { height, width } = Dimensions.get("window");

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    // get posts from backend and set state accordingly
    try {
      const postsData = await API.graphql(graphqlOperation(listPosts));
      setPosts(postsData.data.listPosts.items);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={{ width: "100%", marginTop: -5, marginBottom: 82.5 }}>
      <FlatList
        data={posts.sort((a, b) => sortFunction(b, a))}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchPosts}
      />
      <NewPostButton />
    </View>
  );
};
export default Feed;
