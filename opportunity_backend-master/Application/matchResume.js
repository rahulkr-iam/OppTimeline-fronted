import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import authMiddleware from "../middleware/authMiddleware.js";
import validityDb from "../DbSchema/validitySchema.js";
import validityMiddleware from "../middleware/validityMiddleware.js";

const router=express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});


router.post("/resumeMatch",authMiddleware,validityMiddleware,async (req, res) => {
  try {
    const { resumeText, opportunities } = req.body;
      const email=req.email;
      if (!resumeText || typeof resumeText !== "string") {
      return res.status(400).json({
        success: false,
        message: "resumeText is required",
      });
    }

    if (!Array.isArray(opportunities) || opportunities.length === 0) {
      return res.status(400).json({
        success: false,
        message: "opportunities array is required",
      });
    }



    const opportunityData = opportunities.map((opp) => ({
      opportunityId: opp.opportunityId,
      skills: opp.skills,
    }));


    const prompt = `
You are a professional resume matching system.

Your task is to compare ONE candidate resume against MULTIPLE job opportunities.

Candidate Resume:
${resumeText}

Opportunities:
${JSON.stringify(opportunityData, null, 2)}

For every opportunity:

1. Compare the candidate's skills with the required skills.
2. Consider closely related skills.
3. Consider relevant experience mentioned in the resume.
4. Do NOT give credit for skills that are not present or reasonably implied.
5. Calculate a realistic match percentage from 0 to 100.
6. Return the opportunityId exactly as provided.

Return ONLY valid JSON.

Required format:

{
  "matches": [
    {
      "opportunityId": "123",
      "matchPercentage": 85
    }
  ]
}

Do not include markdown.
Do not include explanations.
Do not include any other fields.
`;



    const result = await model.generateContent(prompt);
    //const result="jhsghfsdghfds";

    const responseText = result.response.text();




    let cleanedResponse = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();



    const parsedResponse = JSON.parse(cleanedResponse);



    if (!Array.isArray(parsedResponse.matches)) {
      throw new Error("Invalid response from Gemini");
    }


    parsedResponse.matches.sort(
      (a, b) => b.matchPercentage - a.matchPercentage
    );
   console.log(email);
    await validityDb.create({
    email: email,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
});

    return res.status(200).json({
      success: true,
      matches: parsedResponse.matches,
    });

  } catch (error) {

    console.error("Opportunity matching error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to calculate opportunity matches",
      error: error.message,
    });
  }
});

export default router;


