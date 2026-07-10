const { z } = require("zod");

const schema = z.object({
  title: z.string().min(3),

  originalUrl: z.string().url(),

  customAlias: z.string().optional(),

  expiresAt: z.string().optional(),
});

module.exports = (req, res, next) => {
  try {
    schema.parse(req.body);

    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      errors: err.errors,
    });
  }
};