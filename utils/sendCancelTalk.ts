import axios from 'axios';
import { TypeDBprofile } from './supabase/dbTableTypes';
import { AWS_LAMBDA_URL } from '@/constants/constants';

export async function sendCancelTalkByAWSLambda({
  date,
  instructor,
  name,
  phone,
  program,
  region,
  // userProfile,
  // dateStr,
  // instructorName,
  // programRegion,
  // programTitle,
}: {
  phone: string;
  name: string;
  program: string;
  region: string;
  instructor: string;
  date: string;
  // dateStr: string;
  // programTitle: string;
  // programRegion: string;
  // instructorName: string;
  // userProfile: TypeDBprofile;
}) {
  //   const lambdaURL = process.env.AWS_LAMBDA_URL;

  //   console.log('lambdaURL');
  //   console.log(lambdaURL);

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

    console.log('response.statusText');
    console.log(response.statusText);

    console.log('response.data');
    console.log(response.data);

    console.log('✅ 알림톡 전송 성공:', response.data);
    return response;
  } catch (error) {
    console.error('🚫 알림톡 전송 실패:');
    console.error(error);
  }
}
