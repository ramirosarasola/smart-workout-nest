// file.util.ts
import { FileValidator } from '@nestjs/common/pipes/file/file-validator.interface';
import { FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';
import { MultipartOptions } from '../models/options.model';
// ... other imports

export const validateFile = (
  file: Storage.MultipartFile,
  options: MultipartOptions,
): string | void => {
  const validators: FileValidator[] = [];

  if (options.maxFileSize)
    validators.push(new MaxFileSizeValidator({ maxSize: options.maxFileSize }));
  if (options.fileType)
    validators.push(new FileTypeValidator({ fileType: options.fileType }));

  for (const validator of validators) {
    if (validator.isValid(file)) continue;

    return validator.buildErrorMessage(file);
  }
};
