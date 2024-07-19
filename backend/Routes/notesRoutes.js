const express = require("express")
const notesController = require("../Controllers/notesController")
const userController= require("../Controllers/userController")
const binController = require("../Controllers/binController")

const router = express.Router()

router.route("/")
      .post(userController.resourceAccess,notesController.createNote)
      .get(userController.resourceAccess,notesController.getNotes)

router.route('/:id/archive')
      .post(notesController.archiveNote);
    
router.route('/:id/unarchive')
      .post(notesController.unarchiveNote);

router.route("/:id")
      .patch(userController.resourceAccess,notesController.updateNotes)
      .delete(userController.resourceAccess,notesController.deleteNotes)

router.route("/archive")
      .get(userController.resourceAccess,notesController.getArchivedData)

router.route('/:id/bin')
      .post(userController.resourceAccess,binController.moveToBin);
    

router.route("/bin")
      .get(userController.resourceAccess,binController.getBinData)


module.exports=router