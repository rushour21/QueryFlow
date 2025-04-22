import express from 'express';
import Users from '../modals/users.js';
import bcrypt from "bcrypt";
import { errorLogger } from "../middleware/log.js";
import { authMiddleware } from "../middleware/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

router.post("/register", errorLogger, async (req, res) => {
    try {
        console.log(req.body);
        const { firstname, lastname, email, password } = req.body;
        // search for existing user via email or username
        console.log(firstname)
        const existingUser = await Users.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email is already taken" });
        }
        else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = new Users({
                firstName: firstname,
                userName: email,
                lastName: lastname,
                email: email,
                password: hashedPassword,
                designation: "admin",
            });
            console.log("Saving new user:", newUser);
            await newUser.save();
            console.log("User saved successfully");

            const token = jwt.sign(
                { id: newUser._id, username: newUser.userName },
                process.env.JWT_SECRET,
                { expiresIn: "3h" }
            );
            res.status(200).json({ message: "User created successfully", token });
        }
    }
    catch (err) {
        errorLogger(err, req, res);
    }
});

router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
        console.log(req.body);
      const user = await Users.findOne({ userName: req.body.username });
      console.log(user);
      if (!user) return res.status(400).json({ message: "Invalid username" });
    
      let passwordToCompare = user.password;
  
      // If member → get password from admin
      if (user.createdBy) {
        const admin = await Users.findById(user.createdBy);
        if (!admin) return res.status(400).json({ message: "Admin not found" }); 
  
        passwordToCompare = admin.password;
      }
  
      const isMatch = bcrypt.compareSync(password, passwordToCompare);
      if (!isMatch) return res.status(400).json({ message: "Invalid password" });
  
      const token = jwt.sign(
        { id: user._id, username: user.userName },
        process.env.JWT_SECRET,
        { expiresIn: "3h" }
      );
  
      res.status(200).json({ message: "Logged in", token });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });
  

  router.put("/profile", authMiddleware, errorLogger, async (req, res) => {
    try {
      const { firstname, lastname, email, password } = req.body;
      const userId = req.user.id; // Fetched from authMiddleware
  
      const existingUser = await Users.findById(userId);
      if (!existingUser) {
        return res.status(404).json({
          error: {
            message: "User not found",
            status: 404
          }
        });
      }
      if(existingUser.designation === "member"){
        return res.status(403).json({ message: "Members cannot update profile." });
      }
  
      // Construct fields to update
      const updateFields = {
        firstName: firstname || existingUser.firstName,
        lastName: lastname || existingUser.lastName,
        email: email || existingUser.email,
        userName: email || existingUser.email,
        updatedAt: Date.now()
      };
  
      if (password) {
        updateFields.password = await bcrypt.hash(password, 10); // Await is cleaner than sync
      }
  
      const updatedUser = await Users.findByIdAndUpdate(userId, updateFields, {
        new: true
      });
  
      res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser
      });
    } catch (err) {
      errorLogger(err, req, res); // You can also just `next(err)` if using centralized error handler
    }
  });

router.get("/getusername", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const existingUser = await Users.findById(userId);

        if (!existingUser) {
            return res.status(404).json({
                error: {
                    message: "User not found",
                    status: 404
                }
            });
        }

        // Use firstName and lastName if available, otherwise fallback to username
        const firstName = existingUser.firstName || existingUser.username;
        const lastName = existingUser.lastName || "";

        res.status(200).json({ firstName, lastName });
    } catch (err) {
        errorLogger(err, req, res);
    }
});

router.get("/getuser", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const existingUser = await Users.findById(userId);
        console.log(existingUser);
        if (!existingUser) {
            return res.status(404).json({
                error: {
                    message: "User not found",
                    status: 404
                }
            });
        }

        res.status(200).json({ user: existingUser });
        co
    } catch (err) {
        errorLogger(err, req, res);
    }
});



export default router;