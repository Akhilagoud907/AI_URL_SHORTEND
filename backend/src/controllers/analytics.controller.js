const prisma = require("../config/prisma");

exports.getAnalytics = async (req, res) => {
  try {
    const { id } = req.params;

    const link = await prisma.link.findUnique({
      where: { id },
      include: {
        clicks: true,
      },
    });

console.log("=================================");
console.log("Link:");
console.log(link);

console.log("=================================");
console.log("Clicks:");
console.log(link?.clicks);
console.log("=================================");

    if (!link) {
      return res.status(404).json({
        success: false,
        message: "Link not found",
      });
    }

    const clicks = link.clicks;

    const totalClicks = clicks.length;

    const dailyClicks = {};
    const browserDistribution = {};
    const deviceDistribution = {};
    const countryDistribution = {};
    const topReferrers = {};

    clicks.forEach((click) => {

      // Daily Clicks
      const date = click.createdAt
  .toISOString()
  .split("T")[0];

      dailyClicks[date] = (dailyClicks[date] || 0) + 1;

      // Browser
      browserDistribution[click.browser] =
        (browserDistribution[click.browser] || 0) + 1;

      // Device(OS)
      deviceDistribution[click.os] =
        (deviceDistribution[click.os] || 0) + 1;

      // Country
      countryDistribution[click.country] =
        (countryDistribution[click.country] || 0) + 1;

      // Referrer
      const ref = click.referrer || "Direct";

      topReferrers[ref] =
        (topReferrers[ref] || 0) + 1;

    });

    res.json({
  success: true,

  link: {
    id: link.id,
    title: link.title,
    originalUrl: link.originalUrl,
    shortCode: link.shortCode,
    clickCount: link.clickCount,
  },

  analytics: {
    totalClicks,
    dailyClicks,
    browserDistribution,
    deviceDistribution,
    countryDistribution,
    topReferrers,
  },
});

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};