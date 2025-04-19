'use client';

import React, { useState } from 'react';
import { Input, Button } from '@heroui/react';
import { createClient } from '@/utils/supabase/client';

export default function EmailCheck() {
  const [email, setEmail] = useState('');
  const supabase = createClient();

  const handleDuplicateCheck = async () => {
    const { data, error } = await supabase.from('profiles').select('email').eq('email', email);
    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  };

  return (
    <div className="flex w-full flex-row items-start justify-start gap-x-4">
      <Input
        isRequired
        name="email"
        variant="bordered"
        className="w-full"
        placeholder="아이디를 입력해 주세요."
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Button className="w-[10%]" onPress={handleDuplicateCheck}>
        중복확인
      </Button>
    </div>
  );
}
