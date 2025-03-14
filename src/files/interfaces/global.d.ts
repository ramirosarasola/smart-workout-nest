// globals.d.ts

declare namespace Storage {
  interface MultipartFile {
    buffer: Buffer;
    filename: string;
    size: number;
    mimetype: string;
    fieldname: string;

    type: 'file';
    toBuffer: () => Promise<Buffer>;
    file: BusboyFileStream;
    encoding: string;
    fields: MultipartFields;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    storedFiles: Record<string, Storage.MultipartFile[]>;
    body: unknown;
  }
}
