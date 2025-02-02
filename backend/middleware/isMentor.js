async function isMentor(req, res, next) {
    const user = await userModel.findById(req.params.userId);
    if (!user || user.role !== "mentor") {
        return res.redirect("/register");
    }
    req.user = user; 
    next();
}
module.exports =  { isMentor };