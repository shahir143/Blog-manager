const blogs=require('../model/blog');
const cnt=require('../model/comments');

exports.saveData=async(req,res,next)=>{
    try{
        const blogData=await blogs.create({
            title:req.body.title,
            author:req.body.author,
            content:req.body.content,
        })
        res.status(200).json(blogData);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}
exports.getData= async(req,res,next)=>{
    try{
        const dbData = await blogs.findAll()
        const data = dbData.map(data => data.dataValues);
        res.status(201).json(data);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}


exports.saveComments=async(req,res,next)=>{
    try{
        const blogcnt=await cnt.create({
            blogId:req.body.blogId,
            comment:req.body.comment
        })
        console.log(blogcnt)
        res.status(200).json(blogcnt);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}
exports.getComments= async(req,res,next)=>{
    const blogId=req.params.id;
    try{
        const dbData=await cnt.findAll({where :{blogId:blogId}});
        const data = dbData.map(data => data.dataValues);
        res.status(201).json(data);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}
exports.deleteComments= async(req,res,next)=>{
    const id=req.params.id;
    console.log(id);
    try{
        
        const data=await cnt.destroy({where:{id:id}});
        res.status(200).json({message:"deleted successfully"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}