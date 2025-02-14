const NEXT_PUBLIC_KAKAO_REST_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_KEY;

export const getKakaoKeyword = async (query: string) => {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&size=1`,
      {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${NEXT_PUBLIC_KAKAO_REST_KEY}`,
        },
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('카카오 키워드 검색 API 호출 오류:', error);
    return null;
  }
};

export const getKakaoCoordinate = async (x?: number, y?: number) => {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=음식점&x=${x}&y=${y}&size=1&sort=distance`,
      {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${NEXT_PUBLIC_KAKAO_REST_KEY}`,
        },
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('카카오 키워드 검색 API 호출 오류:', error);
    return null;
  }
};
