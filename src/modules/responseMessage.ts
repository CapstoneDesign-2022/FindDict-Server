const message = {
  NULL_VALUE: "필요한 값이 없습니다.",
  NOT_FOUND: "존재하지 않는 자원",
  BAD_REQUEST: "잘못된 요청",
  INTERNAL_SERVER_ERROR: "서버 내부 오류",

  // 유저 관련
  CREATE_USER_SUCCESS: "유저 생성 성공",
  UPDATE_USER_SUCCESS: "유저 업데이트 성공",
  AVAILABLE_USER_ID: "아이디 사용 가능",
  ID_ALREADY_EXISTS: "아이디 중복",

  // 토큰 관련
  NULL_VALUE_TOKEN: "토큰이 없습니다",
  EXPIRED_TOKEN: "만료된 토큰입니다",
  ALL_EXPIRED_TOKEN: "모두 만료된 토큰입니다",
  VALID_TOKEN: "유효한 토큰입니다",
  INVALID_TOKEN: "유효하지 않은 토큰입니다",
  NO_USER_RF_TOKEN: "유저의 리프레쉬 토큰이 아닙니다",
  SUCCESS_REISSUE_TOKEN: "토큰 재발급 성공",

  // 로그인 관련
  SIGNIN_SUCCESS: "유저 로그인 성공",
  SIGNIN_FAIL: "유저 로그인 실패",

  // 단어 관련
  CREATE_WORD_SUCCESS: "단어 추가 성공",
  CREATE_WORD_FAIL: "단어 추가 실패",
  GET_WORD_SUCCESS: "단어 리스트 가져오기 성공",
};

export default message;
