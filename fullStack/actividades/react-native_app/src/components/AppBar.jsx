import {Text, View, StyleSheet, ScrollView} from "react-native";
import constants from "expo-constants"
import StyleText from "./StyleText";
import theme from "../Theme";
import {Link, useLocation} from "react-router-native";


const AppBarTab = ({ children, to}) =>{
    const {pathname} = useLocation()

    const active = pathname === to

    const textStyles = [
        styles.text,
        active && styles.active
    ]


    return(
        <Link to={to}><StyleText style={textStyles} fontWeight="bold">{children}</StyleText></Link>
    )
}

const getRutesProps = ({pathname, to}) => {

}

const AppBar = () => {

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <AppBarTab active to={"/"}>Repositories</AppBarTab>
                <AppBarTab to={"/login"}>Login</AppBarTab>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.navBar.primary,
        paddingTop: constants.statusBarHeight + 10,
        flexDirection: "row",
        paddingBottom: 10,
        paddingLeft: 10
    },
    text:{
        color: theme.navBar.textPrimary,
        paddingHorizontal: 10
    },
    active: {
        color: theme.navBar.textSecondary
    }
})

export default AppBar