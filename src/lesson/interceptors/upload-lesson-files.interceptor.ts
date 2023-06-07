import { FileFieldsInterceptor } from '@nestjs/platform-express';

export class UploadLessonFilesInterceptor extends FileFieldsInterceptor(
  [
    {
      name: 'image',
      maxCount: 1,
    },
    {
      name: 'video',
      maxCount: 1,
    },
  ],
  { limits: { fileSize: 10_000_000 /* 10MB */ } },
) {}
