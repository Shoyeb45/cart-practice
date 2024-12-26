
const asyncHandler = (requestHandler) => {
    // Another function
    return async (req, res, next) => {
        try {
            await requestHandler(req, res, next);
        } catch (error) {
            res.status(error.code || 500);
        }
    }
}

export { asyncHandler };