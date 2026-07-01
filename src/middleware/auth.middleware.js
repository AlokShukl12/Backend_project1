const jwt = require("jsonwebtoken");

async function authArtist(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
         const decoded = jwt.verify(token,process.env.JWT_SECRET);
         if(decoded.role !== "artist"){
            return res.status(401).json({message:"You can't able to create music."})
         }

        
         req.user = decoded;
          next()
    }
    catch(e){
        console.log(e)
        return res.status(401).json({message:"Unauthorized"})
    }
   

};

async function authUser(req,res,next) {
     const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
         const decoded = jwt.verify(token,process.env.JWT_SECRET);

          if( decoded.role !== "user"){
            return res.status(401).json({message:"You can't able to create music."})
         }
         req.user = decoded;
          next()
    }
//     MONGO_URL=mongodb+srv://yt-bak:mCs57QXCHINPoV3e@cluster0.c8cdwdp.mongodb.net/?appName=Cluster0
// JWT_SECRET=WAEROFHEFTRQAFOHAFERAQE4RFOFHAEWPRFOEWARFOP
// PRIVATE_IMAGEKIT=private_+VRWYfveDES6Ub2FbubUzL4ti/A=
    catch(e){
        console.log(e)
        return res.status(401).json({message:"Unauthorized"})
    }
}

module.exports = {authArtist, authUser}