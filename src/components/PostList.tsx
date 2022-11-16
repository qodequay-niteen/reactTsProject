import React, { Component } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 3,
          image: "https://bootdey.com/img/Content/avatar/avatar7.png",
          name: "March SoulLaComa",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          comments_count: "05",
        },
        {
          id: 2,
          image: "https://bootdey.com/img/Content/avatar/avatar6.png",
          name: "John DoeLink",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          comments_count: "05",
        },
        {
          id: 4,
          image: "https://bootdey.com/img/Content/avatar/avatar2.png",
          name: "Finn DoRemiFaso",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          comments_count: "05",
        },
        {
          id: 5,
          image: "https://bootdey.com/img/Content/avatar/avatar3.png",
          name: "Maria More More",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          comments_count: "05",
        },
        {
          id: 1,
          image: "https://bootdey.com/img/Content/avatar/avatar1.png",
          name: "Frank Odalthh",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          comments_count: "05",
        },
        {
          id: 6,
          image: "https://bootdey.com/img/Content/avatar/avatar4.png",
          name: "Clark June Boom!",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          comments_count: "05",
        },
        {
          id: 7,
          image: "https://bootdey.com/img/Content/avatar/avatar5.png",
          name: "The googler",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          comments_count: "05",
        },
      ],
    };
  }

  render() {
    return (
      <FlatList
        style={styles.root}
        data={this.state.data}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={(item) => {
          const Post = item.item;
          let comment_img_view = <View />;
          let comment_count_data = <Text />;

          let mainContentStyle;
          if (Post.comments_count) {
            mainContentStyle = styles.mainContent;
            comment_img_view = (
              <Image
                style={styles.comment_img}
                source={require("../assets/comments.png")}
              />
            );
            comment_count_data = (
              <Text style={styles.comment_count}>{Post.comments_count}</Text>
            );
          }
          return (
            <View style={styles.container}>
              <Image
                source={require("../assets/user.png")}
                style={styles.avatar}
              />
              <View style={styles.content}>
                <View style={mainContentStyle}>
                  <View style={styles.text}>
                    <Text style={styles.name}>{Post.name}</Text>
                    <Text>{Post.text}</Text>
                  </View>
                  {/* <Text style={styles.timeAgo}>2 hours ago</Text> */}
                </View>
                {comment_img_view}
                {comment_count_data}
              </View>
            </View>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF",
    top: getStatusBarHeight() - 45,
  },
  container: {
    padding: 16,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: "flex-start",
  },
  avatar: {
    width: 50,
    height: 50,
  },
  text: {
    marginBottom: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
  },
  img: {
    height: 50,
    width: 50,
    margin: 0,
  },
  comment_img: {
    position: "absolute",
    right: -15,
    height: 75,
    width: 75,
  },
  comment_count: {
    position: "absolute",
    top: 27,
    fontWeight: "bold",
    color: "blue",
    right: -44,
    height: 75,
    width: 75,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  timeAgo: {
    fontSize: 12,
    color: "#696969",
  },
  name: {
    fontSize: 16,
    color: "#1E90FF",
  },
});
