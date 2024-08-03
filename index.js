const express=require('express')
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 

const app=express()
app.use(express.json())
const mongoUrl= "mongodb://localhost:27017/ecommerce"

mongoose.connect(mongoUrl).then(() =>{
    console.log('Connected DB')  
    app.listen(5000,()=>{
        console.log('Server Running at http://localhost:5000')  
      })
})
.catch((error) =>{
    console.log("ERROR", error);
})

// const productSchema = new mongoose.Schema({
//     name: String,
//     cost: Number
// })

// const produtModel = mongoose.model("products", productSchema)


// app.get('/getproduct', async (req,res) => {
//     const productData = await produtModel.find()
//     // const productData = await produtModel.findOne({ name: 'Anand' })
//     // const productData = await produtModel.create({ name: 'showmi',cost:100 })
//     // produtModel.findOne({ name: 'Anand' }, (err, doc) => {
//     //     if (err) return console.error(err);
//     //     console.log(doc);
//     //     productData = doc;
//     //   });

//     res.json(productData)
// })
// const ordersSchema = new mongoose.Schema({
//     productName: String,
//     price: String
// })

// const ordersModel = mongoose.model("orders", ordersSchema)
// app.get('/', async (req,res) => {
//     const ordersData = await ordersModel.create({ productName: 'tharun',price:"100 "})
//      const findordersData = await ordersModel.find()
//      const productData = await produtModel.find()
//     res.json(productData)
// })

// const authentication = (request, response, next) => {
//     let jwtToken
//     console.log("AUTH", request.headers['authorization'])
//     const authHeader = request.headers['authorization']
//     if (authHeader) {
//       jwtToken = authHeader.split(' ')[1]
//     }
//     console.log("JWT", jwtToken)

//     if (jwtToken) {
//       jwt.verify(jwtToken, 'SECRET_KEY', (error, payload) => {
//         if (error) {
//           response.status(401)
//           response.send('Invalid JWT Token')
//         } else {
//           request.email = payload.email
//           request.userId = payload.userId
//           next()
//         }
//       })
//     } else {
//       response.status(401)
//       response.send('Invalid JWT Token')
//     }
//   }
// const insertquery=`INSERT INTO registration(CustomerId, EmailId, Password)
// VALUES ('${id}', '${email}','${password}')`;
// const insertData=await db.run(insertquery)

app.post("/signUp",async(req,res)=>{
    const {email, password} = req.body
    console.log('DB value',email,password)
    const id = uuidv4();
    const user = new signUpModel({
        "CustomerId": id,
        "EmailId": email,
        "Password": password
  });

 const insertData= await user.save();
 console.log("INSET", insertData);
if(insertData._id) {
    res.send({data:"successfully inserted"})
}
else{
    res.status(400)
    res.send({data:"Failed to inserted"})
}
})

app.post("/loginIn",async(req,res)=>{
    const {email, password} = req.body
    console.log('DB value',email,password)
    const userDbDetails = await signUpModel.findOne({ "EmailId": email});
    console.log(userDbDetails)
    if (userDbDetails) {
        const payload = {email:email,userId:userDbDetails.CustomerId}
        const jwtToken = jwt.sign(payload, 'SECRET_KEY')
        res.send({jwtToken})
      } else {
        res.status(400)
        res.send('Invalid password')
      }
})
const signUpSchema = new mongoose.Schema({
    email: String,
    password: String,
    

})

const signUpModel = mongoose.model("signUp", signUpSchema)

const LoginInSchema = new mongoose.Schema({
    email: String,
    password: String,

})

const LoginInModel = mongoose.model("LoginIn", LoginInSchema)

const discountsSchema = new mongoose.Schema({
    cover: String,
    name: String,
    price: String

})

const discountsModel = mongoose.model("discounts", discountsSchema)


const newArrivalsSchema = new mongoose.Schema({
    cover: String,
    name: String,
    price: String

})

const newArrivalsModel = mongoose.model("newArrivals", newArrivalsSchema)


const productsSchema = new mongoose.Schema({
    id:Number,
    discount: Number,
    cover: String,
    name: String,
    price: Number

})

const productsModel = mongoose.model("products", productsSchema)


const shopsSchema = new mongoose.Schema({
    id : Number,
    cover: String,
    name: String,
    price: String,
    discount: String

})

const shopsModel = mongoose.model("shops", shopsSchema)

const slideCardSchema = new mongoose.Schema({
    id: Number,
    title: String,
    desc: String,
    cover: String

})

const slideCardModel = mongoose.model("slideCard", slideCardSchema)


const topSchema = new mongoose.Schema({
    cover: String,
    para: String,
    desc: String

})

const topModel = mongoose.model("top", topSchema)

app.get('/discount', async (req,res) => {
   
     const discountsData = await discountsModel.find()
  
    res.json(discountsData)
})

app.get('/newarrival', async (req,res) => {
    const user = new newArrivalsModel({
        
    
            "cover": "./images/arrivals/arrivals6.png",
            "name": "Bonsai tree",
            "price": "400"
          
          
      
  });

  await user.save();
    const newarrivalData = await newArrivalsModel.find()
       
 
   res.json(newarrivalData)
})

app.get('/products', async (req,res) => {
   
    const productsData = await productsModel.find()
 
   res.json(productsData)
})

app.get('/shops', async (req,res) => {
   
    const shopsData = await shopsModel.find()
 
   res.json(shopsData)
})
app.get('/slideCard', async (req,res) => {
    const user = new slideCardModel({
        
    
            "id": 4,
            "title": "50% Off For Your First Shopping",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
            "cover": "./images/SlideCard/slide-4.png"
          
          
      });
    
      await user.save();
    const slideCardData = await slideCardModel.find()
 
   res.json(slideCardData)
})

app.get('/top', async (req,res) => {
   
    // const topData = await topModel.find()
    // const topData = await topModel.deleteOne({ para: "watch" });
  

    
 
const topData = await topModel.find()
   res.json(topData)
})
