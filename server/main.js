import express from 'express'
import graphqlHTTP from 'express-graphql'
import cors from 'cors'
import multer from 'multer'

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    }
})
const upload = multer({storage})

// resolver, schema import
import schema from './graphql/schema'
import rootValue from './graphql/resolver'

const app = express()
let port = 3001

app.use(cors()) // CORS 제한 해제

// GraphQl 서버 API endpoint를  '/graphql'로 설정
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql:true
}))

app.post('/upload', upload.single('file'),(req,res)=>{
    // console.log(req.file)
    res.setHeader('Content-Type','application/json')
    res.send(JSON.stringify({file:req.file.filename,fileName:req.file.originalname}))
})

app.use('/uploads',express.static('uploads'))

const server = app.listen(port,()=>{
    console.log("Express is running on port: ",port)
})