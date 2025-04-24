import { AWS_LAMBDA_URL } from '@/constants/constants';
import axios from 'axios';

export async function sendCancelTalkByAWSLambda({
  date,
  instructor,
  name,
  phone,
  program,
  region,
}: {
  phone: string;
  name: string;
  program: string;
  region: string;
  instructor: string;
  date: string;
}) {
  try {
    const response = await axios.post(
      `${AWS_LAMBDA_URL}/cancel-alimtalk`,
      {
        phone: phone,
        name: name,
        program: program,
        region: region,
        instructor: instructor,
        date: date,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      },
    );

    console.log('✅ 알림톡 전송 성공:', response.data);
    return response;
  } catch (error) {
    console.error('🚫 알림톡 전송 실패:');
    console.error(error);
  }
}
