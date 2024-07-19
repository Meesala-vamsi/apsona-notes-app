const Archive = require("../Models/archieveShema");
const Notes = require("../Models/notesSchema");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");


exports.createNote = asyncErrorHandler(async(req,res,next)=>{
  const note = await Notes.create(req.body)
  res.status(201).json({
    status:"Success",
    message:"Created Successfully...",
    data:{
      note
    }
  })
})

exports.getNotes = asyncErrorHandler(async(req,res)=>{
  const notes = await Notes.find({})
  res.status(200).json({
    status:"Success",
    data:{
      notes
    }
  })
})

exports.deleteNotes = asyncErrorHandler(async(req,res)=>{
  await Notes.findByIdAndDelete(req.params.id,{new:true,runValidators:true})
  res.status(200).json({
    message:"Deleted Successfully..."
  })
})

exports.updateNotes=asyncErrorHandler(async(req,res)=>{
  await Notes.findByIdAndUpdate(req.params.id,req.body)

  res.status(200).json({
    status:"Success",
    message:"Updated Successfully..."
  })
})

exports.archiveNote = asyncErrorHandler(async (req, res) => {
  const note = await Notes.findByIdAndDelete(req.params.id);
  const archivedNote = await Archive.create(note.toObject());
  res.status(200).json({
    status: "Success",
    message: "Archived Successfully...",
    data: {
      note: archivedNote
    }
  });
});


exports.unarchiveNote = asyncErrorHandler(async (req, res) => {
  const archivedNote = await Archive.findByIdAndDelete(req.params.id);
  const note = await Notes.create(archivedNote.toObject());
  res.status(200).json({
    status: "Success",
    message: "Unarchived Successfully...",
    data: {
      note
    }
  });
});

exports.getArchivedData=asyncErrorHandler(async(req,res,next)=>{
  const archives = await Archive.find({})
  res.status(200).json({
    status:"Success",
    data:{
      archives
    }
  })
})