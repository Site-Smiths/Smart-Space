async function isMentor(req, res, next) {
    try {
        const user = await userModel.findById(req.params.userId);
        if (!user || user.role !== "mentor") {
            return res.status(403).json({ message: "Access forbidden: You must be a mentor" });
        }
        req.user = user; 
        next();
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = { isMentor };
