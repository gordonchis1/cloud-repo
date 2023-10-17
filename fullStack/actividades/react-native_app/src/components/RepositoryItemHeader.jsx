import {Image, View} from "react-native";
import StyleText from "./StyleText";
import RepositoryStats from "./RepositoryStats";

const RepositoryItemHeader = (props) => {
    return(
        <View style={{padding: 4, flexDirection: "row"}}>
            <View>
                <Image style={props.style.image} source={{uri: props.ownerAvatarUrl}}/>
            </View>
            <View style={{flex: 1, paddingLeft: 9, justifyContent: "center"}}>
                <StyleText fontWeight={"bold"}>{props.fullName}</StyleText>
                <StyleText small color={"secondary"}> {props.description}</StyleText>
                <StyleText small style={props.style.language}> {props.language}</StyleText>
            </View>
        </View>
    )
}


export default RepositoryItemHeader
