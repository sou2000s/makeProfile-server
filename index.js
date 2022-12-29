const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000 ;

app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://user50:i6e0hGmMgvA7Q3QI@cluster0.x7kxg5y.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const usersCollection = client.db('MakeProfile').collection('users')

app.get('/' , (req , res)=>{
    res.send('server running')
})



 const dbConnect = async ()=>{
    try {
         await client.connect()
         console.log('db-connect');
    } catch (error) {
        console.log(error.message);
    }
}

app.post('/users' , async(req , res)=>{
     try {
        const user = req.body
       const result = await usersCollection.insertOne(user)
       res.send(result)
   
     } catch (error) {
        console.log(error.message);
     }
})


app.get('/searchedUsers' , async(req , res)=>{
    try {
        const name = (req.query.search);
       
        const query = {name: name}
        const result = await usersCollection.find(query).toArray()
        res.send(result)
        console.log(result);
        
    } catch (error) {
        console.log(error.message);
    }
})



app.get('/users/:id' , async(req , res)=>{
    try {
        const id = req.params.id;
        const query  = {_id: ObjectId(id)}
        const result = await usersCollection.findOne(query)
        res.send(result)
    } catch (error) {
        console.log(error.message);
    }
})

dbConnect()

app.listen(port , ()=>{
    console.log(`server running on port ${port}`);
})