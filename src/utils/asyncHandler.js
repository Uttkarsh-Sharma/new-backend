
/* alternate way with  the help of Promise 
const asyncHandler = (requestHandler) =>{
  return  (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err)=> next(err))
    }
}
*/

//TODO: Wrapper Function that will be used again in our logic (try-catch)
/*
const asyncHandler = () =>{}
const asyncHandler = (func) => () => {}
const asyncHandler = (func) => async () => {}
*/
const asyncHandler = (fn) => async (req,res,next) => {
        try
        {
                await fn(req,res,next)
            }
            catch(err)
            {
                    res.status(err.code || 500).json({
                            success: false,
                            message: err.message
                        })
                    }
                }
export default asyncHandler