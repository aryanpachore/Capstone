import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/user.repository.js';

// Register Logic
export const registerUser = async (fullName, email, password) => {
  // 1. Check if user exists
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  // 2. Hash password [cite: 35]
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3. Create user
  const newUser = await userRepository.createUser({
    full_name: fullName,
    email,
    password_hash: hashedPassword,
  });

  return newUser;
};

// Login Logic
export const loginUser = async (email, password) => {
  // 1. Find user
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // 2. Compare passwords 
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // 3. Generate JWT Token [cite: 35]
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' } // Token valid for 1 day
  );

  return { user, token };
};