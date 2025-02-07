import { Visitor } from "../models/models.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import streamifier from "streamifier";

dotenv.config();

cloudinary.config({
    cloud_name: 'dl0rvdj1h',
    api_key:'248562927672267',
    api_secret:'Ul3tjLhqk-1MRb7AdK8KVSh_xeg',
    secure: true,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single("signature");

async function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export const getVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.findAll();
        res.status(200).json(visitors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getVisitorById = async (req, res) => {
    try {
        const visitor = await Visitor.findByPk(req.params.id);
                res.status(200).json(visitor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const createVisitor = async (req, res) => {
    try {
      await runMiddleware(req, res, uploadMiddleware)
  
      if (req.body.checkOut === "") {
        req.body.checkOut = null
      }
  
      let signatureUrl = null
      if (req.file) {
        try {
          const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder: "signatures" }, (error, result) => {
              if (error) reject(error)
              else resolve(result)
            })
            streamifier.createReadStream(req.file.buffer).pipe(stream)
          })
          signatureUrl = result.secure_url
        } catch (uploadError) {
          console.error("Error uploading to Cloudinary:", uploadError)
          return res.status(500).json({ error: "Error uploading signature" })
        }
      }
  
      const visitor = await Visitor.create({ ...req.body, signature: signatureUrl })
      res.status(201).json(visitor)
    } catch (error) {
      console.error("Error creating visitor:", error)
      res.status(500).json({ error: error.message })
    }
  }

export const updateVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByPk(req.params.id);
        if (!visitor) {
            return res.status(404).json({ error: "Visitor not found" });
        }
        
        await runMiddleware(req, res, uploadMiddleware);
        let signatureUrl = visitor.signature;

        if (req.file) {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "signatures" },
                async (error, result) => {
                    if (error) {
                        return res.status(500).json({ error: error.message });
                    }
                    signatureUrl = result.secure_url;
                    await visitor.update({ ...req.body, signature: signatureUrl });
                    res.status(200).json(visitor);
                }
            );
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        } else {
            await visitor.update(req.body);
            res.status(200).json(visitor);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByPk(req.params.id);
        if (!visitor) {
            return res.status(404).json({ error: "Visitor not found" });
        }
        await visitor.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
