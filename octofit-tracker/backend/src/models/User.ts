import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
<<<<<<< HEAD
=======
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
>>>>>>> 01087f2e3ede497e48eb96bffb6b8227b983691a
  },
  { timestamps: true }
);

export default model('User', userSchema);
