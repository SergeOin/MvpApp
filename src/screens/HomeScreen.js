import React from 'react'
import styled from 'styled-components'
import {Entypo, Ionicons} from "@expo/vector-icons";
import Text from '../components/Text';
import tempData from '../../tempData'

export default HomeScreen = () => {
    const renderPost = ({ item }) => (
        <PostContainer>
            <PostHeaderContainer>
                <PostProfilePhoto source={{ uri: item.user.profilePhotoUrl}} />
                <PostInfoContainer>
                    <Text medium>{item.user.firstname}{item.user.lastname}</Text>
                    <Text tini color="#000000" margin="4px 0 0 0">{item.postedAt}</Text>
                </PostInfoContainer>
                <Options>
                    <Entypo name="dots-three-horizontal" size={16} color="#061333" />
                </Options>
            </PostHeaderContainer>
            <Post>
                <Text>{item.post}</Text>
                <PostPhoto source={{uri: item.photoURL}} />
                <PostDetails>
                    <PostLikes>
                        <Ionicons name="ios-heart-empty" size={24} color="#FC5B37" />
                        <Text tiny margin="0 0 0 8px">{item.likes}</Text>
                    </PostLikes>
                    <PostComments>
                        <Ionicons name="ios-chatboxes" size={24} color="#FC5B37" />
                        <Text tiny margin="0 0 0 8px">{item.comments}</Text>
                    </PostComments>
                </PostDetails>
            </Post>
        </PostContainer>
    )
    return (
        <Container>
            <FeedContainer>
                <Text large light center>FeedMVH</Text>
                <Feed data={tempData} renderItem={renderPost} keyExtractor={item => item.id.toString()}/>
            </FeedContainer>
            <StatusBar barStyle="dark-content" />
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #061333;
    padding-top: 64px;
    
`;

const FeedContainer = styled.View`

`;

const Feed = styled.FlatList`

`;

const PostContainer = styled.View`
    margin: 16px 16px 0 16px;
    background-color: #ffffff;
    border-radius: 6px;
    padding: 8px;
`;

const PostHeaderContainer = styled.View`
    flex-direction: row;
    margin-bottom: 16px;
    align-items: center;
`;

const PostProfilePhoto = styled.Image`
    width: 48px;
    height: 48px;
    border-radius: 24px;
`;

const PostInfoContainer = styled.View`
    flex: 1;
    margin: 0 16px;
`;

const Options = styled.View`

`;

const Post = styled.View`
    margin-left: 64px;
`;

const PostPhoto = styled.Image`
    width: 100%;
    height: 150px;
    border-radius: 6px,
`;

const PostDetails = styled.View`
    flex-direction: row;
    margin-top: 8px;
`;

const PostLikes = styled.View`
    flex-direction: row;
    align-items: center;
`;

const PostComments = styled.View`
    flex-direction: row;
    align-items: center;
    margin-left: 16px;
`;

const StatusBar = styled.StatusBar`

`;