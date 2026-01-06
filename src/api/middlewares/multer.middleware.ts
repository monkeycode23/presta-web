import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

// Configurar multer para almacenamiento en memoria
const storage = multer.memoryStorage();

// src/constants/fileTypes.ts

export const IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

export const VIDEO_MIME_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime", // mov
  "video/x-msvideo", // avi
];

export const DOCUMENT_MIME_TYPES = [
  "application/pdf",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.ms-excel", // .xls
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "application/vnd.ms-powerpoint", // .ppt
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
  "text/plain", // .txt
];


const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
    
   if (

    IMAGE_MIME_TYPES.includes(file.mimetype) || 
    VIDEO_MIME_TYPES.includes(file.mimetype) || 
    DOCUMENT_MIME_TYPES.includes(file.mimetype) 
   ) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido. Solo se aceptan tipos imágenes videos y documentos."));
  } 
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 200, 
  },
});

export default upload;
