import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    // Clear existing data so the script is safely re-runnable
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const marvel = await Team.create({ name: 'Team Marvel', members: [] });
    const dc = await Team.create({ name: 'Team DC', members: [] });

    const users = await User.insertMany([
      { name: 'Tony Stark', email: 'tony@marvel.com', age: 45, team: marvel._id },
      { name: 'Steve Rogers', email: 'steve@marvel.com', age: 105, team: marvel._id },
      { name: 'Natasha Romanoff', email: 'natasha@marvel.com', age: 38, team: marvel._id },
      { name: 'Bruce Wayne', email: 'bruce@dc.com', age: 42, team: dc._id },
      { name: 'Diana Prince', email: 'diana@dc.com', age: 5000, team: dc._id },
      { name: 'Clark Kent', email: 'clark@dc.com', age: 40, team: dc._id },
    ]);

    marvel.members = users.filter((u) => u.team?.equals(marvel._id)).map((u) => u._id);
    dc.members = users.filter((u) => u.team?.equals(dc._id)).map((u) => u._id);
    await marvel.save();
    await dc.save();

    await Activity.insertMany([
      { user: users[0]._id, type: 'Running', durationMinutes: 30, caloriesBurned: 320 },
      { user: users[1]._id, type: 'Cycling', durationMinutes: 45, caloriesBurned: 400 },
      { user: users[2]._id, type: 'Swimming', durationMinutes: 60, caloriesBurned: 500 },
      { user: users[3]._id, type: 'Weightlifting', durationMinutes: 40, caloriesBurned: 280 },
      { user: users[4]._id, type: 'Yoga', durationMinutes: 50, caloriesBurned: 180 },
      { user: users[5]._id, type: 'Running', durationMinutes: 25, caloriesBurned: 260 },
    ]);

    await Leaderboard.insertMany([
      { team: marvel._id, points: 1250, rank: 1 },
      { team: dc._id, points: 1100, rank: 2 },
    ]);

    await Workout.insertMany([
      { name: 'Full Body HIIT', description: '20-minute high-intensity interval training', difficulty: 'intermediate', durationMinutes: 20 },
      { name: 'Beginner Stretch', description: 'Gentle full-body stretching routine', difficulty: 'beginner', durationMinutes: 15 },
      { name: 'Advanced Strength Circuit', description: 'Heavy compound lifts with short rest', difficulty: 'advanced', durationMinutes: 60 },
      { name: '5K Run Trainer', description: 'Interval running program for a 5K', difficulty: 'intermediate', durationMinutes: 35 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
