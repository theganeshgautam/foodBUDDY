require('dotenv').config();
const mongoose = require('mongoose');


const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully!');

    console.log("Now fetching data...");
    const fetched_data = await mongoose.connection.db.collection("food_items");
    global.food_items = await fetched_data.find({}).toArray(); // Use `await` for consistency
    console.log(global.food_items);
    const fetched_data2 = await mongoose.connection.db.collection("food_category");
    global.food_category = await fetched_data2.find({}).toArray();
    console.log(global.food_category);
    

    // const fetched_data = await mongoose.connection.db.collection("food_items");
    // fetched_data.find({}).toArray(async function(err, data){
    //   const food_category= await mongoose.connection.db.collection("food_category");
    //   food_category.find({}).toArray(function(err, catData){
    //     if(err) console.log(err)
    //     else{
    //       global.food_items = data;
    //       console.log(global.food_items);
    //       global.food_category = catData;
          
    //     }
    //   });
    // })



    // VIDEO KO JASTO:::::::::::::::::::::::::::::::::::::::::::::::::::::

//     console.log("Now fetching data...");

//     const fetched_data = await mongoose.connection.db.collection("food_items");
//     fetched_data.find({}).toArray(function(err, data) {
//       if (err) {
//         console.log("Error fetching food_items:", err);
//         return;
//       }


//   const food_category = mongoose.connection.db.collection("food_category");
//   console.log("food_category fetched!")
//   food_category.find({}).toArray(function(err, catData) {
//     if (err) {
//       console.log("Error fetching food_category:", err);
//     } else {
//       global.food_items = data;
//       global.food_category = catData;
//       console.log("Global food_items:", global.food_items);
//       console.log("Global food_category:", global.food_category);
//     }
//   });
// });






    //console.log("Fetched data:", food_items); //no data logged for now
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = mongoDB;











// const fetched_data = await mongoose.connection.db.collection("food_items");
    // fetched_data.find({}).toArray(async function(err, data){
    //   const food_category= await mongoose.connection.db.collection("food_category");
    //   food_category.find({}).toArray(function(err, catData){
    //     if(err) console.log(err)
    //     else{
          
    //     }
    //   });

    // })
    
    // const fetched_data = await mongoose.connection.db.collection("food_items");
    // fetched_data.find({}).toArray( function(err, data){
    //   if(err) console.log(err)
    //     else{
    //       global.food_items= data;
    //       console.log(global.food_items)
    //     }
    //   });