import { ApolloServer, gql, UserInputError } from "apollo-server"
import axios from 'axios'

const persons = [
    {
        name:"Leanne",
        username: "Bret",
        email: "Sincere@april.biz",
        phone: "1-770-736-8031 x56442",
    },
    {
        name: "Ervin",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        phone: "010-692-6593 x09125",
    },
    {
        name: "Pedro",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        phone: "010-692-5555 x09125",
   }
]

const typeDefs = gql`
    enum YesNo{
        YES
        NO
    }

    type Person{
        name: String!
        username: String!
        phone: String
        email: String!
        personAdres: String!
    }

    type Query{
        personsCount: Int!
        allPersons(phone: YesNo): [Person]!
        findPerson(name: String!): Person
    }

    type Mutation {
        addPerson(
            name: String!
            phone: String
            email: String!
            username: String!
        ): Person
        editNumber(
            phone: String!
            name: String!
        ): Person
    }
`

const resolvers = {
    Query: {
        personsCount: () => persons.length,
        allPersons: async (root, args)  => {
            const {data: personsFromApi} = await axios.get("http://localhost:3000/persons")
            if(!args.phone) return personsFromApi
            else{
            const byPhone = person => args.phone === 'YES' ? person.phone : !person.phone
            
            return personsFromApi.filter(byPhone)}
        },
        findPerson: (root, args) => persons.find(item => item.name === args.name)
    },
    Person:{
        personAdres: (prev, args) => `${prev.email}-${prev.phone}`
    },
    Mutation:{
        addPerson: (prev, args) => {
        if(persons.find(item => item.name === args.name)){
            throw new UserInputError('name must be unique', {invalidArgs: args.name})
        }
            const person = {
                ...args
            }

            persons.push(person)
            return person
        },
        editNumber: (root, args) =>  {
            const personIndex = persons.findIndex(p => args.name === p.name)
            if(personIndex === -1) return null

            const person = persons[personIndex]

            const updatePerson = {...person, phone: args.phone}

            persons[personIndex] = updatePerson
            return updatePerson
        } 
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
    }
)

server.listen().then(({url}) => console.log(`server redy at ${url}`))