import { WordCreateDto } from '../interfaces/IWord';

const createWords = async (
  client: any,
  userId: string,
  imageURL: string,
  wordCreateDto: WordCreateDto,
): Promise<string> => {
  try {
    for (const word of wordCreateDto.words) {
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

export default {
  createWords,
};
