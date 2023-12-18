const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/students-api", {
//     useCreateIndex:true,
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//     useFindAndModify:false
// }).then(() => {
//     console.log("Connection successful");
// }).catch((e) => {
//     console.log("No Connection");
// });
mongoose.connect("mongodb://localhost:27017/students-api", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

try {
    console.log("Connection successful");
}
catch (error) {
    console.log("No Connection");

}