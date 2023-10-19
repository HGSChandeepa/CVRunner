import express from "express";
import { UserModel } from "../models/UserModel.js";

const router = express.Router();

//?routes for :: cvdata/personaldata
router.put("/personaldata", async (req, res) => {
  // Find the user by id and the personal data
  const { userId, personalData } = req.body;
  try {
    // Find the user by id
    const user = await UserModel.findById(userId);
    // If the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // If the user is found
    user.personalData = personalData;
    await user.save();
    return res.json({ message: "Personal data saved successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//?POST route for :: cvdata/educationdata
router.post("/educationdata", async (req, res) => {
  // Find the user by id and the education data
  const { userId, educationData } = req.body;
  try {
    // Find the user by id
    const user = await UserModel.findById(userId);
    // If the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // If the user is found
    educationData.forEach((data) => {
      user.educationData.push(data);
    });
    await user.save();
    return res.json({ message: "Education data saved successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//?GET route for :: cvdata/educationdata
router.get("/educationdata/:userId", async (req, res) => {
  // Find the user by userid in the params
  const userId = req.params.userId;
  try {
    const user = await UserModel.findById(userId);
    const educationData = user?.educationData;
    if (educationData) {
      return res.json(educationData);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//delete education section
router.delete("/educationdata/:userId/:id", async (req, res) => {
  // Find the user by userid in the params
  const userId = req.params.userId;
  const id = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    const educationData = user.educationData;
    const newEducationData = educationData.filter((data) => data.id !== id);
    user.educationData = newEducationData;
    await user.save();
    return res.json({ message: "Education data deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// post method for experience data
//?POST route for :: cvdata/experienceData
router.post("/experiencedata", async (req, res) => {
  // Find the user by id and the education data
  const { userId, experienceData } = req.body;
  console.log(userId);

  try {
    // Find the user by id
    const user = await UserModel.findById(userId);
    // If the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // If the user is found
    experienceData.forEach((data) => {
      user.experienceData.push(data);
    });
    await user.save();
    return res.json({ message: "experienceData data saved successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//?GET route for :: cvdata/experienceData
router.get("/experiencedata/:userId", async (req, res) => {
  // Find the user by userid in the params
  const userId = req.params.userId;
  try {
    const user = await UserModel.findById(userId);
    const experienceData = user.experienceData;
    if (experienceData) {
      return res.json(experienceData);
    }
  } catch (err) {
    console.error(err);
  }
});

//delete experience section
router.delete("/experiencedata/:userId/:id", async (req, res) => {
  // Find the user by userid in the params
  const userId = req.params.userId;
  const id = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    const experienceData = user.experienceData;
    const newExperienceData = experienceData.filter((data) => data.id !== id);
    user.experienceData = newExperienceData;
    await user.save();
    return res.json({ message: "Experience data deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//projects data
//?POST route for :: cvdata/projectsdata
router.post("/projectsdata", async (req, res) => {
  // Find the user by id and the education data
  const { userId, projectsData } = req.body;
  console.log(userId);
  try {
    // Find the user by id
    const user = await UserModel.findById(userId);
    // If the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // If the user is found
    projectsData.forEach((data) => {
      user.projectsData.push(data);
    });
    await user.save();
    return res.json({ message: "projectsData data saved successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//?GET route for :: cvdata/projectsData
router.get("/projectsdata/:userId", async (req, res) => {
  // Find the user by userid in the params
  const userId = req.params.userId;
  try {
    const user = await UserModel.findById(userId);
    const projectData = user.projectsData;
    if (projectData) {
      return res.json(projectData);
    }
  } catch (err) {
    console.error(err);
  }
});

//delete projects section
router.delete("/projectsdata/:userId/:id", async (req, res) => {
  // Find the user by userid in the params
  const userId = req.params.userId;
  const id = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    const projectsData = user.projectsData;
    const newProjectsData = projectsData.filter((data) => data.id !== id);
    user.projectsData = newProjectsData;
    await user.save();
    return res.json({ message: "Projects data deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//languages data
//?POST route for :: cvdata/languagesdata
router.post("/languagesData", async (req, res) => {
  // Find the user by id and the education data
  const { userId, languagesData } = req.body;
  try {
    // Find the user by id
    const user = await UserModel.findById(userId);
    // If the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // If the user is found
    languagesData.forEach((data) => {
      user.languagesData.push(data);
    });
    await user.save();
    return res.json({ message: "languagesData data saved successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//?GET route for :: cvdata/languagesData
router.get("/languagesData/:userId", async (req, res) => {
  // Find the user by userid in the params
  const userId = req.params.userId;
  try {
    const user = await UserModel.findById(userId);
    const lang = user.languagesData;
    if (lang) {
      return res.json(lang);
    }
  } catch (err) {
    console.error(err);
  }
});
// router.get("/languagesData/:userId", async (req, res) => {
//   // Find the user by userid in the params
//   const userId = req.params.userId;
//   try {
//     const user = await UserModel.findById(userId);

//     if (!user) {
//       // If the user is not found, return a response indicating that
//       return res.status(404).json({ message: "User not found" });
//     }

//     const lang = user.languagesData;

//     if (lang) {
//       return res.json(lang);
//     } else {
//       return res.json([]); // If languagesData is not defined, return an empty array or an appropriate response.
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

//delete languages section
router.delete("/lanuagesData/:userId/:id", async (req, res) => {
  // Find the user by userid in the params
  const userId = req.params.userId;
  const id = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    const languagesData = user.languagesData;
    const newLanguagesData = languagesData.filter((data) => data.id !== id);
    user.languagesData = newLanguagesData;
    await user.save();
    return res.json({ message: "Languages data deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//technologies data
//?POST route for :: cvdata/technologiesdata
router.post("/technologiesData", async (req, res) => {
  // Find the user by id and the education data
  const { userId, technologiesData } = req.body;
  try {
    // Find the user by id
    const user = await UserModel.findById(userId);
    // If the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // If the user is found
    technologiesData.forEach((data) => {
      user.technologiesData.push(data);
    });
    await user.save();
    return res.json({ message: "technologiesData data saved successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//?GET route for :: cvdata/technologiesData
router.get("/technologiesData/:userId", async (req, res) => {
  // Find the user by userid in the params
  const userId = req.params.userId;
  try {
    const user = await UserModel.findById(userId);
    const tech = user.technologiesData;
    if (tech) {
      return res.json(tech);
    }
  } catch (err) {
    console.error(err);
  }
});

//delete technologies section
router.delete("/technologiesData/:userId/:id", async (req, res) => {
  // Find the user by userid in the params
  const userId = req.params.userId;
  const id = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    const technologiesData = user.technologiesData;
    const newTechnologiesData = technologiesData.filter(
      (data) => data.id !== id
    );
    user.technologiesData = newTechnologiesData;
    await user.save();
    return res.json({ message: "Technologies data deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//achievements data
//?POST route for :: cvdata/achievementsdata
router.post("/achievementsdata", async (req, res) => {
  // Find the user by id and the education data
  const { userId, achievementsData } = req.body;
  try {
    // Find the user by id
    const user = await UserModel.findById(userId);
    // If the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // If the user is found
    achievementsData.forEach((data) => {
      user.achievementsData.push(data);
    });
    await user.save();
    return res.json({ message: "achievementsData data saved successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//?GET route for :: cvdata/achievementsData
router.get("/achievementsdata/:userId", async (req, res) => {
  // Find the user by userid in the params
  const userId = req.params.userId;
  try {
    const user = await UserModel.findById(userId);
    const achivmentsData = user.achievementsData;
    if (achivmentsData) {
      return res.json(achivmentsData);
    }
  } catch (err) {
    console.error(err);
  }
});

//delete achievements section
router.delete("/achievementsdata/:userId/:id", async (req, res) => {
  // Find the user by userid in the params
  const userId = req.params.userId;
  const id = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    const achievementsData = user.achievementsData;
    const newAchievementsData = achievementsData.filter(
      (data) => data.id !== id
    );
    user.achievementsData = newAchievementsData;
    await user.save();
    return res.json({ message: "Achievements data deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//get all the data from the database
router.get("/personaldata/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await UserModel.findById(userId);
    const personalData = user?.personalData;
    if (personalData) {
      return res.json(personalData);
    }
  } catch (err) {
    console.error(err);
  }
});

// GET route to retrieve all user data
router.get("/userdata/:userId", async (req, res) => {
  // Find the user by userid in the params
  const userId = req.params.userId;
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = {
      personalData: user.personalData,
      educationData: user.educationData,
      experienceData: user.experienceData,
      projectsData: user.projectsData,
      languagesData: user.languagesData,
      technologiesData: user.technologiesData,
      achievementsData: user.achievementsData,
    };

    return res.json(userData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export { router as CvDataRouter };
