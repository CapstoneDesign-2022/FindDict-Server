import { WordCreateDto, WordResponseDto } from '../interfaces/IWord';
const request = require('request');
import config from '../config';

const createWords = async (
  client: any,
  userId: string,
  imageURL: string,
  wordCreateDto: WordCreateDto,
): Promise<string> => {
  try {
    for (const word of wordCreateDto.words) {
      if (!word.korean || !word.english) return 'word_missing';
      await client.query(
        `
          INSERT INTO "word" (user_id, korean, english, image_url, is_trap)
          VALUES ($1, $2, $3, $4, $5)
          `,
        [userId, word.korean, word.english, imageURL, false],
      );
    }
    return 'successfully_stored';
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getWords = async (client: any, userId: string): Promise<WordResponseDto> => {
  try {
    const { rows: words } = await client.query(
      `
        SELECT w.korean, w.english
        FROM "word" as w
        WHERE w.user_id = $1 and w.is_trap = $2
        ORDER BY w.created_at DESC
          `,
      [userId, false],
    );

    const data: WordResponseDto = {
      words: words,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getImage = async (word: string): Promise<string | string[]> => {
  try {
    const client_id = config.naverClientId;
    const client_secret = config.naverClientSecret;
    const option = {
      query: word,
      start: 1,
      display: 4,
      sort: 'sim',
      filter: 'small',
    };

    const options = {
      uri: 'https://openapi.naver.com/v1/search/image',
      qs: option,
      headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret,
      },
    };
    return new Promise((resolve, reject) => {
      request.get(options, (error: any, response: Response, body: any) => {
        if (error) reject(error);
        const images = JSON.parse(body);
        if (!images.items || images.items.length < 4) {
          resolve('no_images');
        } else {
          const data = images.items.map((image: any) => {
            return image.link;
          });
          resolve(data);
        }
      });
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createWords,
  getWords,
  getImage,
};
