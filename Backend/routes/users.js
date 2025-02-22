import express from 'express';
import bcrypt from 'bcryptjs';

const createUserRouter = (usersCollection) => {
  const router = express.Router();

  // 🔹 User Signup
  router.post('/signup', async (req, res) => {
    try {
      const { 
        username, 
        password, 
        role, 
        collegeName, 
        gender, 
        fullName, 
        profession, 
        degree, 
        year, 
        course ,
        collegeid
      } = req.body;

      // 🔹 Ensure role is valid
      if (!['teacher', 'student'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role specified' });
      }

      // 🔹 Check if the user already exists
      const existingUser = await usersCollection.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
      }

      // 🔹 Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // 🔹 Create user object based on role
      const newUser = {
        username,
        password: hashedPassword,
        role,
        fullName,
        gender,
        collegeName,
        collegeid:collegeid,
        ...(role === 'teacher' ? { profession } : { degree, year, course }) // Add relevant fields
      };

      await usersCollection.insertOne(newUser);
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Error registering user' });
    }
  });

  // 🔹 User Login
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await usersCollection.findOne({ username });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      res.status(200).json({ message: 'Login successful!', user });
    } catch (error) {
      res.status(500).json({ error: 'Error logging in' });
    }
  });

  return router;
};

export default createUserRouter;
