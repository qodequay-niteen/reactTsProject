import React, { memo, useState, useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import Background from "../components/Background";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import { Navigation } from "../types";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { scale } from "../theme/Scalling";
import Button from "../components/Button";

type props = {
  navigation: Navigation;
};

const DashboardScreen: React.FC<props> = (props) => {
  var loadMoreVisible = true;
  let userData;
  userData = useSelector((state) => state.counter.userProfileDetails);
  useEffect(() => {
    console.log("Stored redux data:", userData);
  });

  const [loading, setLoading] = useState(false);
  const [postdata, setPostdata] = useState();
  const [commentdata, setCommentdata] = useState();

  const [offset, setOffset] = useState(1);
  const [postcommentsdata, setPostcommentsdata] = useState<[]>([]);
  const [dataSource, setDataSource] = useState<[]>([]);

  let num = 50;
  let initialLoadNumber = 20;

  useEffect(() => {
    var config = {
      method: "get",
      url: `https://jsonplaceholder.typicode.com/posts`,
    };
    setLoading(true);
    axios(config)
      .then(function (response) {
        setPostdata(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    var config = {
      method: "get",
      url: `https://jsonplaceholder.typicode.com/comments`,
    };

    setLoading(true);
    axios(config)
      .then(function (response) {
        setCommentdata(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    postdata?.map((element) => {
      let temp = commentdata?.filter((cmt) => cmt.postId == element.id);
      if (temp) {
        let len = temp.length;
        if (len <= 9) {
          let countData = "0" + temp.length;
          element.comments_count = countData;
        } else {
          element.comments_count = len;
        }
      }
    });
  }, [postdata, commentdata]);

  useEffect(() => {
    setPostcommentsdata(postdata);
  });

  useEffect(() => {
    if (dataSource.length < postcommentsdata?.length) {
      if (offset == 1) {
        setDataSource(postcommentsdata.slice(0, offset * initialLoadNumber));
      }
    }
  }, [postcommentsdata]);

  const getData = () => {
    if (
      dataSource.length < postcommentsdata?.length &&
      postcommentsdata?.length != 0
    ) {
      setOffset(offset + 1);
      setDataSource(postcommentsdata.slice(0, offset * num));
    }
  };

  return (
    <>
      <Loader visible={loading} />
      <Background>
        <BackButton goBack={() => props.navigation.navigate("HomeScreen")} />
        <Header>Dashboard</Header>

        {postcommentsdata?.length != 0 && (
          <FlatList
            style={styles.root}
            data={dataSource}
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
                  <Text style={styles.comment_count}>
                    {Post.comments_count}
                  </Text>
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
                        <Text style={styles.name}>{Post.title}</Text>
                        <Text>{Post.body}</Text>
                      </View>
                    </View>
                    {comment_img_view}
                    {comment_count_data}
                  </View>
                </View>
              );
            }}
            initialNumToRender={initialLoadNumber}
            maxToRenderPerBatch={num}
            updateCellsBatchingPeriod={num / 2}
            keyExtractor={(item) => {
              return item.id;
            }}
            onEndReachedThreshold={
              offset < 10 ? offset * (offset == 1 ? 2 : 2) : 20
            }
            onEndReached={getData}
            removeClippedSubviews={true}
          />
        )}

        {loadMoreVisible == true ? (
          <View
            style={{
              width: "100%",
              height: 40,
              backgroundColor: "green",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              this.loadMore();
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Load more</Text>
          </View>
        ) : null}
      </Background>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    marginBottom: scale(-15),
    backgroundColor: "#FFFFFF",
    top: getStatusBarHeight() - 45,
  },
  container: {
    padding: 16,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#000000",
    alignItems: "flex-start",
    margin: 0,
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
  name: {
    fontSize: 16,
    color: "#1E90FF",
  },
});

export default DashboardScreen;
