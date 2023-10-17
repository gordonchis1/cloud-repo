import {View} from "react-native";
import StyleText from "./StyleText";

const RepositoryStats = (props) => {
    return <View style={{flexDirection: "row", justifyContent: "space-around"}}>
        <View >
            <StyleText fontWeight={"bold"}>Stars</StyleText>
            <StyleText align={"center"}> {props.stargazersCount}</StyleText>
        </View>
        <View >
            <StyleText fontWeight={"bold"}>Forks</StyleText>
            <StyleText align={"center"}>{props.forksCount}</StyleText>
        </View>
        <View >
            <StyleText fontWeight={"bold"}>Review</StyleText>
            <StyleText align={"center"}>{props.reviewCount}</StyleText>
        </View>
        <View>
            <StyleText fontWeight={"bold"}>Rating</StyleText>
            <StyleText align={"center"}>{props.reatingAverage}</StyleText>
        </View>
    </View>
}
export default RepositoryStats