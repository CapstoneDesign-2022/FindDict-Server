import { WordCreateDto, WordResponseDto } from '../interfaces/IWord';

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
    // console.log("getWords")
    const { rows: words } = await client.query(
      `
        SELECT w.korean, w.english
        FROM "word" as w
        WHERE w.user_id = $1 and w.is_trap = $2
        ORDER BY w.created_at DESC
          `,
      [userId, false],
    );
// console.log(words)
    const data: WordResponseDto = {
      words: words,
    };
    console.log(words)
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createWords,
  getWords
};
