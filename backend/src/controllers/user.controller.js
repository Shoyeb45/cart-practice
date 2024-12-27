import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    console.log(req.body); 
    // 1. Getting user detail
    let {username, email, password, fullname} = req.body;
    
    username = username.toLowerCase();
    
    // 2. Data validation
    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }
    
    // 3. check if user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    
    
    if (existedUser) {
        throw new ApiError(409 ,"Username already exist");
    }
    
    // Upload data in schema
    const user = await User.create({
        fullname,
        email,
        password,
        username
        // cart: {}
    });
        console.log('Register endpoint hit');
    
    // Check if the user is really selected
    const isUserCreated = await User.findById(user._id).select(
        "-password" // give the column name which we need to exclude by -Column1 -column2 ....
    );
    
    // If something went wrong, it's our mistake so, error code should be from server side 
    if (!isUserCreated) {
        throw new ApiError("500", "Something went wrong from our side while registering, please try once more.");
    }

    // Send response using our ApiResponse class
    // res.redirect("/");
    return res.status(201).json(new ApiResponse(200, isUserCreated, "User registered succefully"));
}); 

const loginUser = asyncHandler ( async (req, res) => {
    // 1. get the data
    // console.log(req.query);
    
    const { username, password } = req.body;
    console.log(username);
    
    if (!username) {
        throw new ApiError(400, "Username is required.");
    }
    // 2. check the user
    const user = await User.findOne({username});

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Password is incorrect");
    }

    // Update tokens
    const loggedInUser = await User.findById(user._id).select("-password");
    
    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser
            },
            "User logged In Successfully"
        )
    )
});


export {
    registerUser,
    loginUser
};