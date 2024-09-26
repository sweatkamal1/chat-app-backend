import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        // Check if the token exists in the request cookies
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Attach the userId from the decoded token to the request object
        req.userId = decoded.userId;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Authentication Error:", error.message);

        // Token verification errors
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token." });
        }

        // Token expired error
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired." });
        }

        // General server error
        res.status(500).json({ message: "Internal server error." });
    }
};

export default isAuthenticated;
