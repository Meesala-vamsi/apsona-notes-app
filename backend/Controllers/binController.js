
const Notes = require("../Models/notesSchema");
const Bin = require("../Models/binSchema");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");

exports.moveToBin = asyncErrorHandler(async (req, res) => {
  const note = await Notes.findByIdAndDelete(req.params.id);
  const binNote = await Bin.create({ ...note.toObject(), deletedAt: Date.now() });
  res.status(200).json({
    status: 'Success',
    message: 'Moved to Bin Successfully...',
    data: {
      note: binNote
    }
  });
});

exports.getBinData=asyncErrorHandler(async(req,res,next)=>{
  const binData=await Bin.find({})
  res.status(200).json({
    status:"Success",
    data:{
      binData
    }
  })
})
