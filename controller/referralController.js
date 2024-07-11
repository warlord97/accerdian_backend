const { PrismaClient } = require("@prisma/client");
const { sendmail } = require("../util/mail");

const prisma = new PrismaClient();

const handleGetReferrals = async (req, res) => {
  try {
    const referrals = await prisma.referral.findMany();

    res.json(referrals);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Helper function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleCreateReferrals = async (req, res) => {
  const { referrer_name, referrer_email, referee_name, referee_email, course } =
    req.body;

  //* Manual validation
  if (!referrer_name) {
    return res.status(400).json({ error: "Referrer name is required" });
  }
  if (!course) {
    return res.status(400).json({ error: "course name is required" });
  }
  if (!referrer_email || !isValidEmail(referrer_email)) {
    return res.status(400).json({ error: "Valid referrer email is required" });
  }
  if (!referee_name) {
    return res.status(400).json({ error: "Referee name is required" });
  }
  if (!referee_email || !isValidEmail(referee_email)) {
    return res.status(400).json({ error: "Valid referee email is required" });
  }

  try {
    const referral = await prisma.referral.create({
      data: {
        referrer_name,
        referrer_email,
        referee_name,
        referee_email,
        course,
      },
    });

    sendmail(
      referrer_name,
      referee_name,
      referee_email,
      referral.referrer_code,
      course
    );
    res.json({ message: "success" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { handleGetReferrals, handleCreateReferrals };
