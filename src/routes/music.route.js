const express = require('express');
const musicController = require("../controllers/music.controller")
const authMiddleware= require("../middleware/auth.middleware")
const multer = require('multer')
const upload = multer({
    storage: multer.memoryStorage()
})
const router = express.Router();

router.post("/musicPost",authMiddleware.authArtist,upload.single("music"),musicController.createMusic)
router.post("/createAlbum",authMiddleware.authArtist, musicController.createAlbum)
router.get("/getMusic",authMiddleware.authUser, musicController.getAllMusic)
router.get("/getAlbums",authMiddleware.authUser, musicController.getAllAlbums)

module.exports = router;