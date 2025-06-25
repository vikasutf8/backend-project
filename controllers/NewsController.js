import vine, { errors } from "@vinejs/vine";
import { newsSchemaValidator } from "../validations/newsValidation.js";
import {
  imageValidator,
  generateReadom,
  uploadImage,
  removeImage,
} from "../utils/helper.js";
import NewsApiTranform from "../tranform/newsApiTranform.js";
import redisCache from "../DB/redis.config.js";
import logger from "../config/logger.js";



class NewsController {

  static async index(req, res) {
    try {
      const page = Number(req.query.page) || 1; //?page=3
      const limit = Number(req.query.limit) || 10; // ?limit=1

      if (page < 1) {
        page = 1;
      }
      if (limit < 1 || limit > 100) {
        limit = 10;
      }
      // offest :how much take from start and how much skip from end
      const skip = (page - 1) * limit;

      const news = await prisma.news.findMany({
        take: limit,
        skip: skip,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profile: true,
            },
          },
        },
      });

      const newsTransform = news?.map((item) =>
        NewsApiTranform.transform(item)
      );

      const totalNews = await prisma.news.count();
      const totalPages = Math.ceil(totalNews / limit);

      return res.json({
        status: 200,
        data: news,
        news: newsTransform,
        metadata: {
          totalPages,
          currentPage: page,
          currentLimit: limit,
        },
      });
    } catch (error) {
      logger.error(error?.message);
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error !Please try again later",
      });
    }
  }

  static async store(req, res) {
    try {
      const user = req.user;
      const body = req.body;

      const validator = vine.compile(newsSchemaValidator);
      const payload = await validator.validate(body);

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
          status: 400,
          errors: {
            image: "No image uploaded ! Image should be uploaded",
          },
        });
      }

      const image = req.files.image;
      const message = imageValidator(image?.size, image.mimetype);
      if (message !== null) {
        return res.status(400).json({
          status: 401,
          errors: {
            image: message,
          },
        });
      }
      // image uplaod
      const imageName = await uploadImage(image);

      payload.image = imageName;
      payload.user_id = user.id;

      const news = await prisma.news.create({
        data: payload,
      });

      // remove cache
      redisCache.del("/api/v1/news",(err)=>{
        if(err) throw err ;
      });

      return res.json({
        status: 201,
        data: news,
        message: "News created successfully",
      });
    } catch (error) {
      logger.error(error?.message);
      if (error instanceof errors.E_VALIDATION_ERROR) {
        // console.log(error.messages)
        return res.status(400).json({
          message: error.messages,
        });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Internal Server Error !Please try again later",
        });
      }
    }
  }

  static async show(req, res) {
    try {
      const { id } = req.params;
    const news = await prisma.news.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profile: true,
          },
        },
      },
    });

    const newsTransform = news ? NewsApiTranform.transform(news) : null;

    return res.json({
      status: 201,
      news: newsTransform,
    });
    } catch (error) {
      logger.error(error?.message);
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error !Please try again later",
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = req.user;

      const news = await prisma.news.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (user.id !== news.user_id) {
        return res.status(401).json({
          status: 401,
          message: "You are not authorized to update this news",
        });
      }
      const validator = vine.compile(newsSchemaValidator);
      const payload = await validator.validate(body);
      const image = req?.files?.image;
      let imageName;
      if (image) {
        //before updating check validation of upcoming image
        const message = imageValidator(image?.size, image.mimetype);
        if (message !== null) {
          return res.status(400).json({
            status: 401,
            errors: {
              image: message,
            },
          });
        }
        // upload new image
        imageName = await uploadImage(image);
        payload.image = imageName;
        // to delete this old image
        await removeImage(news.image);
      }

      await prisma.news.update({
        data: payload,
        where: {
          id: Number(id),
        },
      });

      return res.json({
        status: 200,
        message: "News updated successfully",
        data: payload,
      });
    } catch (error) {
      logger.error(error?.message);
      if (error instanceof errors.E_VALIDATION_ERROR) {
        // console.log(error.messages)
        return res.status(400).json({
          message: error.messages,
        });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Internal Server Error !Please try again later",
        });
      }
    }
  }

  static async distory(req, res) {
    try {
      const { id } = req.params;
      const user = req.user;
      const news = await prisma.news.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (req.user.id !== news.user_id) {
        return res.status(401).json({
          status: 401,
          message: "You are not authorized to delete this news",
        });
      }

      // delete image form system
      await removeImage(news.image);

      await prisma.news.delete({
        where: {
          id: Number(id),
        },
      });

      return res.json({
        status: 200,
        message: "News deleted successfully",
      });
    } catch (error) {
      logger.error(error?.message);
      if (error instanceof errors.E_VALIDATION_ERROR) {
        // console.log(error.messages)
        return res.status(400).json({
          message: error.messages,
        });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Internal Server Error !Please try again later",
        });
      }
    }
  }
}

export default NewsController;
