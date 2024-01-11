const express = require("express");
const router = new express.Router();
const Student = require("../models/students");


// async/await
router.post("/students", async(req,res) => {
    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }
    catch(e){
        res.status(400).send(e);
    }
})

// read the data of registered students with pagination
// router.get("/students", async (req, res) => {
//     try {
//       const page = parseInt(req.query.page) || 1;
//       const limit = parseInt(req.query.limit) || 3;
  
//       const startIndex = (page - 1) * limit;
  
//       const studentsData = await Student.find().skip(startIndex).limit(limit);
//       const totalDocuments = await Student.countDocuments();
  
//       const endIndex = Math.min(startIndex + limit, totalDocuments);
  
//       const results = {
//         totalDocuments: totalDocuments,
//         currentPage: page,
//         totalPages: Math.ceil(totalDocuments / limit),
//         pageSize: limit,
//         data: studentsData,
//       };
  
//       if (endIndex < totalDocuments) {
//         results.next = {
//           page: page + 1,
//         };
//       }
  
//       if (startIndex > 0) {
//         results.previous = {
//           page: page - 1,
//         };
//       }
  
//       res.send(results);
//     } catch (e) {
//       res.status(500).send(e);
//     }
//   });
// read the data of registered students with pagination
router.get("/students", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 5;
  
      const startIndex = page * limit;
  
      const studentsData = await Student.find().skip(startIndex).limit(limit);
      const totalDocuments = await Student.countDocuments();
      const pageLength = studentsData.length;

      res.send({
        totalDocuments:totalDocuments,
        pageLength: pageLength,
        data: studentsData,
      });
    } 
    catch (e) {
      res.status(500).send(e);
    }
  });
  
  

// get the individual student using id
router.get("/students/:id", async (req, res)=>{
    try{
        const _id = req.params.id;
        const studentData = await Student.findById(_id);

        if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData);
        }
        
    }catch(e){
            res.status(500).send(e);
    }
})

// update the students by its id
router.patch("/students/:id", async(req,res)=>{
    try{
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
            new : true
        });
        res.send(updateStudents);
    }catch(e){
        res.status(400).send(e);
    }
})

// delete the students by its id
router.delete("/students/:id", async(req,res)=>{
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);

        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteStudent);
    }catch(e){
        res.status(500).send(e);
    }
})


module.exports = router;
