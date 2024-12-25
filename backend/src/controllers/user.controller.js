import { asyncHandler } from "../utils/asyncHandler"
import { User } from "../models/user.model";

const registerUser = asyncHandler( async (req, res) => {
    // console.log(req);

    // 1. Getting user detail
    const {username, email, password, fullname} = req.body;

    
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
        throw new ApiError(409, "User with email or username already exist");
    }
    
    // Upload data in schema
    const user = await User.create({
        fullname,
        email,
        password,
        username: username.toLowerCase()
    });

    // Check if the user is really selected
    const isUserCreated = await User.findById(user._id).select(
        "-password" // give the column name which we need to exclude by -Column1 -column2 ....
    );

    // If something went wrong, it's our mistake so, error code should be from server side 
    if (!isUserCreated) {
        throw new ApiError("500", "Something went wrong from our side while registering, please try once more.");
    }

    // Send response using our ApiResponse class
    return res.status(201).json(new ApiResponse(200, isUserCreated, "User registered succefully"));  
}); 


export {
    registerUser
};