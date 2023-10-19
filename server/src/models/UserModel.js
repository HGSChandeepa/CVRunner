import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
  confirmPassword: { type: String, required: false, unique: false },

  //personal data
  personalData: {
    firstName: { type: String, required: false, unique: false },
    lastName: { type: String, required: false, unique: false },
    email: { type: String, required: false, unique: false },
    profileImage: { type: String, required: false, unique: false },
    address: { type: String, required: false, unique: false },
    gitHub: { type: String, required: false, unique: false },
    linkedIn: { type: String, required: false, unique: false },
    dateOfBirth: { type: Date, required: false, unique: false },
    phoneNumber: { type: Number, required: false, unique: false },
  },

  //education data
  educationData: [
    {
      degree: { type: String, required: true, unique: false },
      startedYear: { type: Number, required: true, unique: false },
      endingYear: { type: Number, required: true, unique: false },
    },
  ],

  //experience data
  experienceData: [
    {
      companyName: { type: String, required: true, unique: false },
      jobTitle: { type: String, required: true, unique: false },
      startedYear: { type: Number, required: true, unique: false },
      endingYear: { type: Number, required: true, unique: false },
      jobDescription: { type: String, required: true, unique: false },
    },
  ],

  //projects data
  projectsData: [
    {
      projectName: { type: String, required: true, unique: false },
      teckstack: { type: String, required: true, unique: false },
      projectLink: { type: String, required: true, unique: false },
      projectDescription: { type: String, required: true, unique: false },
      startedYear: { type: Number, required: true, unique: false },
      endingYear: { type: Number, required: true, unique: false },
    },
  ],

  //languages

  languagesData: [
    {
      languageName: { type: String, required: true, unique: false },
    },
  ],

  //tectonologies
  technologiesData: [
    {
      technologyName: { type: String, required: true, unique: false },
    },
  ],

  //achievements data
  achievementsData: [
    {
      achievementName: { type: String, required: true, unique: false },
      achievementDescription: { type: String, required: true, unique: false },
      achievementYear: { type: Number, required: true, unique: false },
    },
  ],
});

export const UserModel = mongoose.model("users", UserSchema);
