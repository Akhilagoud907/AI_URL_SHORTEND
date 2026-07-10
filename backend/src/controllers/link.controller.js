const prisma = require("../config/prisma");
const generateCode = require("../utils/generateCode");
const analyticsService = require("../services/analytics.service");

exports.createLink = async (req, res) => {
  try {
    const {
      title,
      originalUrl,
      customAlias,
      expiresAt,
    } = req.body;

    if (customAlias) {
      const exists = await prisma.link.findFirst({
        where: {
          customAlias,
        },
      });

      if (exists) {
        return res.status(409).json({
          success: false,
          message: "Custom alias already exists",
        });
      }
    }

    const shortCode = customAlias || generateCode();

    // const link = await prisma.link.create({
    //   data: {
    //     title,

    //     originalUrl,

    //     customAlias,

    //     shortCode,

    //     expiresAt: expiresAt
    //       ? new Date(expiresAt)
    //       : null,
    //   },
    // });

    let expiry = null;

if (expiresAt) {
  expiry = new Date(expiresAt);

  // Expire at the end of the selected day
  expiry.setHours(23, 59, 59, 999);
}

const link = await prisma.link.create({
  data: {
    title,
    originalUrl,
    customAlias,
    shortCode,
    expiresAt: expiry,
  },
});

    res.status(201).json({
      success: true,
      data: link,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// exports.getAllLinks = async (req, res) => {
//   try {
//     const page = Number(req.query.page) || 1;

//     const limit = Number(req.query.limit) || 10;

//     const search = req.query.search || "";

//     const skip = (page - 1) * limit;

//     const links = await prisma.link.findMany({
//       where: {
//         deletedAt: null,

//         OR: [
//           {
//             title: {
//               contains: search,
//               mode: "insensitive",
//             },
//           },
//           {
//             originalUrl: {
//               contains: search,
//               mode: "insensitive",
//             },
//           },
//         ],
//       },

//       skip,

//       take: limit,

//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     const total = await prisma.link.count({
//       where: {
//         deletedAt: null,
//       },
//     });

//     res.json({
//       success: true,

//       total,

//       page,

//       totalPages: Math.ceil(total / limit),

//       data: links,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//     });
//   }
// };

exports.getAllLinks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const links = await prisma.link.findMany({
      where: {
        deletedAt: null,
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            originalUrl: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.link.count({
      where: {
        deletedAt: null,
      },
    });

    res.json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: links,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
   

exports.getLinkById = async (req, res) => {
  try {
    const { id } = req.params;

    const link = await prisma.link.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!link) {
      return res.status(404).json({
        success: false,
        message: "Link not found",
      });
    }

    res.json({
      success: true,
      data: link,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.updateLink = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      originalUrl,
      customAlias,
      expiresAt,
    } = req.body;

    const existing = await prisma.link.findUnique({
      where: { id },
    });

    if (!existing || existing.deletedAt) {
      return res.status(404).json({
        success: false,
        message: "Link not found",
      });
    }

    if (
      customAlias &&
      customAlias !== existing.customAlias
    ) {
      const aliasExists = await prisma.link.findFirst({
        where: {
          customAlias,
          NOT: {
            id,
          },
        },
      });

      if (aliasExists) {
        return res.status(409).json({
          success: false,
          message: "Custom alias already exists",
        });
      }
    }

    // const updated = await prisma.link.update({
    //   where: { id },

    //   data: {
    //     title,
    //     originalUrl,
    //     customAlias,
    //     shortCode: customAlias || existing.shortCode,
    //     expiresAt: expiresAt
    //       ? new Date(expiresAt)
    //       : null,
    //   },
    // });

    let expiry = null;

if (expiresAt) {
  expiry = new Date(expiresAt);
  expiry.setHours(23, 59, 59, 999);
}

const updated = await prisma.link.update({
  where: { id },
  data: {
    title,
    originalUrl,
    customAlias,
    shortCode: customAlias || existing.shortCode,
    expiresAt: expiry,
  },
});

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const link = await prisma.link.findUnique({
      where: { id },
    });

    if (!link || link.deletedAt) {
      return res.status(404).json({
        success: false,
        message: "Link not found",
      });
    }

    const updated = await prisma.link.update({
      where: {
        id,
      },

      data: {
        isActive: !link.isActive,
      },
    });

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
    });
  }
};

exports.deleteLink = async (req, res) => {
  try {
    const { id } = req.params;

    const link = await prisma.link.findUnique({
      where: { id },
    });

    if (!link || link.deletedAt) {
      return res.status(404).json({
        success: false,
        message: "Link not found",
      });
    }

    await prisma.link.update({
      where: { id },

      data: {
        deletedAt: new Date(),
      },
    });

    res.json({
      success: true,
      message: "Link deleted successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
    });
  }
};

exports.redirectLink = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const link = await prisma.link.findFirst({
      where: {
        shortCode,
        deletedAt: null,
      },
    });

    if (!link) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
      });
    }

    if (!link.isActive) {
      return res.status(403).json({
        success: false,
        message: "This link has been disabled",
      });
    }

    if (
      link.expiresAt &&
      new Date() > link.expiresAt
    ) {
      return res.status(410).json({
        success: false,
        message: "This link has expired",
      });
    }

    const analytics =
      await analyticsService.collectAnalytics(req);

    await prisma.click.create({
      data: {
        linkId: link.id,
        browser: analytics.browser,
        os: analytics.os,
        device: analytics.device,
        country: analytics.country,
        referrer: analytics.referrer,
      },
    });

    await prisma.link.update({
      where: {
        id: link.id,
      },
      data: {
        clickCount: {
          increment: 1,
        },
      },
    });

    return res.redirect(link.originalUrl);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

