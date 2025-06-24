import vine,{errors} from "@vinejs/vine";
import { newsSchemaValidator } from "../validations/newsValidation.js";
import { imageValidator, generateReadom } from "../utils/helper.js";
import NewsApiTranform from "../tranform/newsApiTranform";


class NewsController {
  static async index(req, res) {
    try {

        const page = Number(req.query.page) || 1 //?page=3
        const limit =Number(req.query.limit) ||10 // ?limit=1

        if(page <1){
            page =1
        }
        if(limit <1 || limit >100){
            limit=10;
        }
// offest :how much take from start and how much skip from end
        const skip =(page-1)*limit ;


        const news =await prisma.news.findMany({
            take :limit ,
            skip :skip,
            include:{
                user :{
                    select:{
                        id:true,
                        name:true,
                        profile:true
                    }
                }
            }
        });

        const newsTransform =news?.map((item)=>NewsApiTranform.transform(item));

        const totalNews =await prisma.news.count();
        const totalPages =Math.ceil(totalNews/limit);

        return res.json({status :200, data:news,news:newsTransform,
            metadata:{
                totalPages,
                currentPage:page,
                currentLimit: limit
            }
        })
    } catch (error) {
        
    }
  }

  static async store(req, res) {
    try {
      const user = req.user;
      const body = req.body;

      const validator = vine.compile(newsSchemaValidator);
      const payload = await validator.validate(body);

      if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
          status: 400,
          errors:{
image: "No image uploaded ! Image should be uploaded",
          }
        });
      }

      const image = req.files.image;
      const message = imageValidator(image?.size, image.mimetype);
      if (message !== null) {
        return res.status(400).json({
          status: 401,
          errors:{
            image: message,
          }
        });
      }

      const imgExt = image?.name.split(".");
      const imageName = generateReadom() + "." + imgExt[1];
      const uploadPath = process.cmd + "public/images/" + imageName;

      image.mv(uploadPath, (err) => {
        if (err) throw err;
      });

      payload.image = imageName;
      payload.user_id = user.id;

      const news = await prisma.news.create({
      data :payload,
      });

      return res.json({
       status :201,
       data :news,
       message :"News created successfully",
      });
    } catch (error) {
      console.log(error);
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

  static async show(req, res) {}
  static async update(req, res) {}

  static async distory(req, res) {}
}

export default NewsController;
