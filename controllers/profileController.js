import { generateReadom, imageValidator } from "../utils/helper.js";

class ProfileController {
  static async index(req, res) {
    try {
      const user = req.user;
      res.json({
        status: 200,
        data: user,
        message: "Profile fetched successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error !Please try again later",
      });
    }
  }

  static async store() {}

  static async show() {}

  static async update(req, res) {
    try {
      const { id } = req.params;
// console.log(req.files) //undefined due to paid vesrsion
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
          status: 400,
          message: "No file uploaded ! File should be uploaded",
        });
      }

      const profile = req.files.profile;
      const message = imageValidator(profile?.size, profile.mimetype);
      if (message !== null) {
        return res.status(400).json({
          status: 401,
          profile: message,
        });
      }

      // instead of vikas.png replace vikas with uuid
      const imgExt = profile?.name.split(".");
      const imageName = generateReadom() + "." + imgExt[1];
      const uploadPath = process.cmd + "public/images/" + imageName;

      profile.mv(uploadPath, (err) => {
        if (err) throw err;
      });

      await prisma.users.update({
        data: {
          profile: imageName,
        },
        where: {
          id: Number(id),
        },
      });

      return res.json({
        status: 200,
        message: "Profile updated successfully",
      });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          status: 500,
          message: "Internal Server Error !Please try again later",
        });
    }
  }

  static async destroy() {}
}

export default ProfileController;
