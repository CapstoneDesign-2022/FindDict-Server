import { access } from "fs";
import { WordCreateDto } from "../interfaces/IWord";
import jwtHandler from "../modules/jwtHandler";

const createWords = async (
  client: any,
  user_id:string,
  imageURL: string,
  wordCreateDto: WordCreateDto
): Promise<string> => {
  try {

    // wordCreateDto.words.map(async (word) => {
    //     console.log("word:",word);
    //     await client.query(
    //           `
    //           INSERT INTO "word" (user_id, korean, english, image_url, is_trap)
    //           VALUES ($1, $2, $3, $4, %5)
    //           `,
    //       [wordCreateDto.user_id, word.korean,word.english,imageURL,false]
    //     );
    //   });
    console.log(wordCreateDto.words)
    // const json = JSON.parse(wordCreateDto.words)
for(const word of wordCreateDto.words){
    console.log("word:",word);
    await client.query(
          `
          INSERT INTO "word" (user_id, korean, english, image_url, is_trap)
          VALUES ($1, $2, $3, $4, $5)
          `,
      [user_id, word.korean, word.english, imageURL, false]
    );
}
    // wordCreateDto.words.forEach(async (word) => {
    //     await client.query(
    //         `
    //         INSERT INTO "word" (user_id, korean, english, image_url, is_trap)
    //         VALUES ($1, $2, $3, $4, $5)
    //         `,
    //     [user_id, word.korean, word.english, imageURL, false]
    //   );
    //   });

    // const data: WordResponseDto = {
    // };


    return "successfully_stored";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createWords
};
