import React, {useContext, useEffect} from 'react'
import styled from 'styled-components'
import Text from '../components/Text'
import LottieView from 'lottie-react-native'
import {UserContext} from "../context/UserContext";
import {FirebaseContext} from "../context/FirebaseContext";

export default LoadingScreen = () => {
    const [_, setUser ] = useContext(UserContext)
    const firebase = useContext(FirebaseContext)
    useEffect(() => {
        setTimeout(async () => {
            const user = firebase.getCurrentUser()
            if(user){
                const userInfo = await firebase.getUserInfo(user.uid)

                setUser({
                    isLoggedIn: true,
                    email: userInfo.email,
                    uid: user.uid,
                    firstname: userInfo.firstname,
                    lastname: userInfo.lastname,
                    profilePhoto: userInfo.profilePhotoUrl
                })
            } else {
                setUser(state => ({...state, isLoggedIn: false}))
            }
        }, 500)
    }, [])
    return (
        <Container>
            <Text title color="#ffffff">MvhApp</Text>
            <LottieView source={require("../../assets/loading.json")} autoPlay loop style={{width: "50%"}} />
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #061333;
`;