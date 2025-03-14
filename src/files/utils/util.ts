// file.util.ts

import { MultipartFile } from '@fastify/multipart';

export const getFileFromPart = async (
  part: MultipartFile,
): Promise<Storage.MultipartFile> => {
  const buffer = await part.toBuffer(); // <-- $1;
  return {
    buffer,
    size: buffer.byteLength,
    filename: part.filename,
    mimetype: part.mimetype,
    fieldname: part.fieldname,
    // ponele
    type: 'file',
    toBuffer: () => Promise.resolve(buffer),
    file: part.file,
    encoding: part.encoding,
    fields: part.fields,
  };
};
