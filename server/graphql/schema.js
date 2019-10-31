import {buildSchema} from 'graphql'

// GraphQl Schema
const schema = buildSchema(`
    input ProductInput{
        name:String!
        type:String!
        price:Int!
        detail:String!
        description:String!
        banner:String!
        attachment:String!
    }

    type Product{
        id:ID
        name:String!
        type:String!
        price:Int!
        detail:String!
        description:String!
        banner:String!
        attachment:String!
        upload_date:String!
    }

    type Query{
        getProduct(id:ID):Product!
        getProducts:[Product!]!
    }

    type Mutation{
        createProduct(product: ProductInput!) : Product!
        updateProduct(id:ID!, product: ProductInput!) : Product!
    }

`)

export default schema