import {Button, Text, TextInput, View} from "react-native";
import {Formik, useField} from "formik"
import StyledTextInput from "../components/StyledTextInput";
import StyleText from "../components/StyleText";
import theme from "../Theme";
import {loginValdationSchema} from "../validationsSchemas/login";

const initialValues = {
    email: "",
    password: ""
}

const FormikInputValue = ({name, ...props}) => {
    const [field, meta, helpers ] = useField(name)

    return(
        <>
            <StyledTextInput  value={field.value} onChangeText={value => helpers.setValue(value)} {...props}/>
            {meta.error && <StyleText style={{color: theme.colors.error}}>{meta.error}</StyleText>}
        </>
        )
}


const Login = () => {
    return (
        <Formik initialValues={initialValues} validationSchema={loginValdationSchema} onSubmit={values => console.log(values)}>
            {({handleSubmit}) => {
                return (<View style={{padding: 20}}>
                    <FormikInputValue name={"email"} placeholder={"e-mail"} />
                    <FormikInputValue placeholder={"Password"} name={"password"} secureTextEntry/>
                    <Button title={"login"} onPress={handleSubmit}/>
                </View>)
            }}
        </Formik>
    )
}

export default Login