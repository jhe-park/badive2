import axios from 'axios';

const ALIGO_API_KEY = process.env.ALIGO_API_KEY;
const ALIGO_SENDER_KEY = process.env.ALIGO_SENDER_KEY;
const ALIGO_USER_ID = process.env.ALIGO_USER_ID;

/**
 * 알리고 토큰 생성 함수
 * @returns {Promise<string>} 알리고 API 토큰
 */
export async function getAligoToken(): Promise<string> {
  try {
    const tokenUrl = 'https://kakaoapi.aligo.in/akv10/token/create/30/s/';
    const smsData = new URLSearchParams({
      apikey: ALIGO_API_KEY,
      userid: ALIGO_USER_ID,
    });

    const response = await axios.post(tokenUrl, smsData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return response.data.token;
  } catch (error) {
    console.error('토큰 생성 오류:', error);
    throw new Error('알리고 토큰을 생성하는데 실패했습니다.');
  }
}
