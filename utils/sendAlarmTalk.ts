import axios from 'axios';
import { TypeDBprofile } from './supabase/dbTableTypes';
import { AWS_LAMBDA_URL } from '@/constants/constants';

export async function sendAlarmTalkByAWSLambda({
  userProfile,
  dateStr,
  instructorName,
  programRegion,
  programTitle,
}: {
  dateStr: string;
  programTitle: string;
  programRegion: string;
  instructorName: string;
  userProfile: TypeDBprofile;
}) {
  try {
    const response = await axios.post(
      `${AWS_LAMBDA_URL}/send-alimtalk`,
      {
        phone: userProfile.phone,
        name: userProfile.name,
        program: programTitle,
        region: programRegion,
        instructor: instructorName,
        date: dateStr,
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
