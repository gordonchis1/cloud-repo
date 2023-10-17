import { FlatList } from "react-native"
import RepositoreItem from "./RepositoreItem.jsx"
import useRepositories from "../hooks/useRepositories";





const RepositoriesList = () => {
    const {repositories} = useRepositories()

    return (
        <FlatList
            data={repositories}
            renderItem={({ item: repo }) => (
                < RepositoreItem {...repo} />
            )}
        >
        </FlatList>
    )
}

export default RepositoriesList