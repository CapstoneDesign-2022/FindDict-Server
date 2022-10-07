import { integer } from 'aws-sdk/clients/cloudfront';
import { IntegerList } from 'aws-sdk/clients/dms';

export interface WordCreateDto {
  words: [
    {
      korean: string;
      english: string;
    },
  ];
}
