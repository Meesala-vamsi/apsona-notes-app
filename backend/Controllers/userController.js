const User = require("../Models/userSchema")
const asyncErrorHandler = require("../Utils/asyncErrorHandler")
const jwt = require('jsonwebtoken')
const CustomError = require("../Utils/CustomError")


exports.resourceAccess = asyncErrorHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        const error = new CustomError("Invalid JWT Token", 401)
        next(error)
    }
    let authToken = null
    authToken = authHeader.split(' ')[1]

    if (!authToken) {
        const error = new CustomError("Invalid JWT Token", 401)
        next(error)
    }

    jwt.verify(authToken, "vamsi", async (error, data) => {
        const user = await User.findById(data.id)
        if (!(await user.changedPassword(data.iat))) {
            const error = new CustomError("Password Changed.Login Again..", 401)
            next(error)
        }
        req.user = user
        next()
    })
})


const generateToken = (id) => {
    const token = jwt.sign({ id }, "vamsi")
    return token
}

exports.signUp = asyncErrorHandler(async (req, res, next) => {
    const user = await User.create(req.body)
    const token = generateToken(user._id)
    res.status(201).json({
        "status": "success",
        jwtToken: token,
        message:"Account Created Successfully",
        data: {
            user
        }
    })
})


exports.login = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        const error = new CustomError('User Not Found with provided email', 404)
        next(error)
    }

    if (!(await user.comparePasswords(password, user.password))) {
        const error = new CustomError("Invalid Password", 401)
        next(error)
    }

    const token = generateToken(user._id)

    res.status(200).json({
        "status": "success",
        jwtToken: token,
        message:"User Logged In Successfully",
        data: {
            user
        }
    })
})

exports.getUser = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)
  
    if (!user) {
      const error = new ErrorFeature("User Not Found", 404)
      next(error)
    }
  
    res.status(200).json({
      status: "Success",
      data: {
        user
      },
      message: "Something Went Wrong...."
    })
  })
