/*
  # Create users table for authentication
  
  ## Overview
  This migration creates a users table that will store user profile information
  alongside Supabase's built-in auth.users table.
  
  ## New Tables
  1. `users`
    - `id` (uuid, primary key) - References auth.users(id)
    - `email` (text, unique, not null) - User's email address
    - `full_name` (text, not null) - User's full name
    - `created_at` (timestamptz) - Account creation timestamp
    - `updated_at` (timestamptz) - Last update timestamp
  
  ## Security
  1. Enable Row Level Security (RLS) on users table
  2. Add policy for authenticated users to read their own profile
  3. Add policy for authenticated users to update their own profile
  4. Add policy for users to insert their own profile during registration
  
  ## Important Notes
  - This table extends Supabase's auth.users with additional profile data
  - Users can only access and modify their own profile data
  - The id column references auth.users(id) with CASCADE delete
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);