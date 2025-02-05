import mongoose from "mongoose";

const relicSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  head: { type: Boolean, default: false },
  hands: { type: Boolean, default: false },
  body: { type: Boolean, default: false },
  feet: { type: Boolean, default: false },
});

const lightConeSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  obtained: { type: Boolean, default: false },
  level80: { type: Boolean, default: false },
});

const characterProgressSchema = new mongoose.Schema({
  characterId: { type: Number, required: true },
  obtained: { type: Boolean, default: false },
  level80: { type: Boolean, default: false },
  tracesCompleted: { type: Boolean, default: false },
});

const characterLightConeSchema = new mongoose.Schema({
  characterId: { type: Number, required: true },
  lightCones: [lightConeSchema],
  relics: [relicSchema],
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  characters: [
    {
      name: { type: String, required: true },
      icon: { type: String, required: true },
      role: { type: String, required: true },
      level80: { type: Boolean, default: false },
    },
  ],
});

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  nickname: { type: String, required: true },
  characters: { type: Array, default: [] },
  characterLightCones: [characterLightConeSchema],
  characterProgress: [characterProgressSchema],
  teams: [teamSchema],
});

const User = mongoose.model("User", userSchema);

export default User;
