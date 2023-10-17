import {View, Text} from "react-native"
import Constants from "expo-constants"
import RepositoriesList from "./RepositoriesList.jsx"
import { Route, Routes} from "react-router-native"
import StyleText from "./StyleText.jsx"
import AppBar from "./AppBar";
import Login from "../pages/Login";

const Main = () => {
    return (
        <View style={{flex: 1}}>
            <AppBar/>
            <Routes>
                <Route path={"/"} element={<RepositoriesList />} exact>
                </Route>
                <Route path={"/login"} element={<Login/>}>

                </Route>
            </Routes>
        </View>
    )
}

export default Main