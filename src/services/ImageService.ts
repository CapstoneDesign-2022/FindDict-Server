const request = require('request');
import config from '../config';

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
    request.get(options, (error: any, response: Response, body: any) => {
      const images = JSON.parse(body);
      if (!images.items) {
        return 'no_images';
      }

      if (images.items.length > 3) {
        const data = images.items.map((image: any) => {
          return image.link;
        });
        return data;
      }
    });

    return 'no_images';
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  getImage,
};
