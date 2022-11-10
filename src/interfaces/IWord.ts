export interface WordCreateDto {
  words: [
    {
      korean: string;
      english: string;
    },
  ];
}

export interface WordResponseDto {
  words: [
    {
      korean: string;
      english: string;
    },
  ];
}

export interface WordDetailResponseDto {
  urls: [
    {
      url: string;
    },
  ];
}

export interface HintResponseDto {
  images: [string]
}