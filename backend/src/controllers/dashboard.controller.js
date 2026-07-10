const prisma = require("../config/prisma");

exports.getDashboardStats = async (req, res) => {
  try {
    // ===========================
    // Dashboard Counts
    // ===========================

    const totalLinks = await prisma.link.count({
      where: {
        deletedAt: null,
      },
    });

    const activeLinks = await prisma.link.count({
      where: {
        isActive: true,
        deletedAt: null,
      },
    });

    const expiredLinks = await prisma.link.count({
  where: {
    deletedAt: null,
    expiresAt: {
      lt: new Date(),
    },
  },
});

    const totalClicks = await prisma.click.count();

    // ===========================
    // Get All Clicks
    // ===========================

    const clicks = await prisma.click.findMany();

    // ===========================
    // Daily Clicks
    // ===========================

    const dailyClicks = {};

    clicks.forEach((click) => {
      const date = click.createdAt.toISOString().split("T")[0];

      dailyClicks[date] = (dailyClicks[date] || 0) + 1;
    });

    // ===========================
    // Browser Distribution
    // ===========================

    const browserDistribution = {};

    clicks.forEach((click) => {
      const browser = click.browser || "Unknown";

      browserDistribution[browser] =
        (browserDistribution[browser] || 0) + 1;
    });

    // ===========================
    // Device Distribution
    // ===========================

    const deviceDistribution = {};

    clicks.forEach((click) => {
      const device = click.device || "Unknown";

      deviceDistribution[device] =
        (deviceDistribution[device] || 0) + 1;
    });

    // ===========================
    // Country Distribution
    // ===========================

    const countryDistribution = {};

    clicks.forEach((click) => {
      const country = click.country || "Unknown";

      countryDistribution[country] =
        (countryDistribution[country] || 0) + 1;
    });

    // ===========================
    // Top 5 Links
    // ===========================

    const topLinks = await prisma.link.findMany({
      where: {
        deletedAt: null,
      },

      orderBy: {
        clickCount: "desc",
      },

      take: 5,

      select: {
        id: true,
        title: true,
        shortCode: true,
        clickCount: true,
      },
    });

    // ===========================
    // Response
    // ===========================

    res.json({
      success: true,

      stats: {
        totalLinks,
        activeLinks,
        expiredLinks,
        totalClicks,
      },

      dailyClicks,

      browserDistribution,

      deviceDistribution,

      countryDistribution,

      topLinks,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};