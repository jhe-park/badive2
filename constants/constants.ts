export const AWS_LAMBDA_URL = 'https://g2skecpigqunnzvt3l24k2h4640srabj.lambda-url.ap-southeast-2.on.aws';
export const ALIGO_TPL_CODE = 'TY_9910';
export const ALIGO_SENDER_PHONE_NUMBER = '01086448733';

export const LECTURE_CATEGORY = ['스쿠버다이빙', '프리다이빙', '머메이드', '언더워터 댄스'] as const;
export type LECTURE_CATEGORY_TYPE = (typeof LECTURE_CATEGORY)[number];

export const IMG_DOMAIN = {
  legacy: 'efehwvtyjlpxkpgswrfw.supabase.co',
  current: 'api.badive.co.kr',
};

export const LECTURE_CATEGORY_TO_DB_CATRGORY = {
  스쿠버다이빙: ['스쿠버다이빙', '체험다이빙'],
  프리다이빙: ['프리다이빙'],
  머메이드: ['머메이드'],
  '언더워터 댄스': ['언더워터'],
};

export const BANK_LIST = [
  { bankName: '신한은행', bankCode: '88' },
  { bankName: '우리은행', bankCode: '20' },
  { bankName: '하나은행', bankCode: '81' },
  { bankName: 'KB국민은행', bankCode: '06' },
  { bankName: 'SC제일은행', bankCode: '23' },
  { bankName: 'IBK기업은행', bankCode: '03' },
  { bankName: 'NH농협은행', bankCode: '11' },
  { bankName: '신협', bankCode: '48' },
  { bankName: 'Sh수협은행', bankCode: '07' },
  { bankName: '카카오뱅크', bankCode: '90' },
  { bankName: '토스뱅크', bankCode: '92' },
  { bankName: '새마을금고', bankCode: '45' },
  { bankName: '경남은행', bankCode: '39' },
  { bankName: '광주은행', bankCode: '34' },
  { bankName: '부산은행', bankCode: '32' },
  { bankName: '단위농협(지역농축협)', bankCode: '12' },
  { bankName: '산림조합', bankCode: '64' },
  { bankName: '씨티은행', bankCode: '27' },
  { bankName: '우체국예금보험', bankCode: '71' },
  { bankName: '저축은행중앙회', bankCode: '50' },
  { bankName: '전북은행', bankCode: '37' },
  { bankName: '제주은행', bankCode: '35' },
  { bankName: '케이뱅크', bankCode: '89' },
  { bankName: '홍콩상하이은행', bankCode: '54' },
  { bankName: 'iM뱅크(대구)', bankCode: '31' },
  { bankName: '한국산업은행', bankCode: '02' },
];
