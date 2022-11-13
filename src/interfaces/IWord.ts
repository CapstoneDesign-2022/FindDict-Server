export interface WordCreateDto {
  english: string;
}

export interface WordResponseDto {
  english: [string];
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