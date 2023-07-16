import Subscriber from "../models/subscriber.js";

// @desc    Subscriber user
export async function subscribe(req, res, next) {
    const { email } = req.body;
    try {
      await Subscriber.create({email,});
      res.status(200).json({ success: true, message: "Saved Email" });
    } catch (err) {
      next(err);
    }
  }