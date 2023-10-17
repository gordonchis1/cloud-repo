
import {View, Text, StyleSheet, Image, Platform} from "react-native"
import RepositoryStats from "./RepositoryStats.jsx";
import theme from "../Theme";
import RepositoryItemHeader from "./RepositoryItemHeader";




const RepositoryItem = (props) => {

    return (
        <View key={props.id} style={styles.container}>
            <RepositoryItemHeader {...props} style={styles} />
            <RepositoryStats {...props} />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderWidth: 1,
        borderBlockColor: "#252525"
    },
    strong: {
        color: "#000",
        fontWeight: "bold",
        marginBottom: 1
    },
    language: {
        padding: 4,
        color: theme.colors.white,
        backgroundColor: Platform.select({
            ios: "red",
            android: "green",
            default: "yellow"
        }),
        alignSelf: "flex-start",
        borderRadius: 4,
        overflow: "hidden",
        marginVertical: 4,
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: 8
    }
})

export default RepositoryItem