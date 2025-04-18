'use client';

import { Avatar, cn } from '@heroui/react';
import React from 'react';

// @ts-ignore
const TeamAvatar = React.forwardRef(({ name, className, classNames = {}, ...props }, ref) => (
  <Avatar
    {...props}
    ref={ref as any}
    classNames={{
      ...classNames,
      base: cn('bg-transparent border border-divider', classNames?.base, className),
      name: cn('text-default-500 text-[0.6rem] font-semibold', classNames?.name),
    }}
    getInitials={name => (name[0] || '') + (name[name.lastIndexOf(' ') + 1] || '').toUpperCase()}
    name={name}
    radius="md"
    size="sm"
  />
));

TeamAvatar.displayName = 'TeamAvatar';

export default TeamAvatar;
