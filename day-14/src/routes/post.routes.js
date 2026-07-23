const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")


postRouter.post("/", postController.createPostController)

module.exports= postRouter