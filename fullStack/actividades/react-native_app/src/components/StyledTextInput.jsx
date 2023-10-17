import {TextInput, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    textInput: {
        borderRadius: 5,
        borderBottomWidth: 2,
        borderColor: "#000",
        paddingHorizontal: 20,
        paddingVertical: 4,
        marginBottom: 5
    }
})

const StyledTextInput = ({style = {}, ...props}) => {
    const inputStyle = {
        ...styles.textInput,
        ...style
    }

    return <TextInput style={inputStyle} {...props}/>
}

export default StyledTextInput