import 'server-only';
import { headers } from 'next/headers';

export async function getDomain() {
  const headersList = await headers();
  const domain = headersList.get('host') || '';

  const domainWithProtocol = domain.startsWith('localhost') ? `http://${domain}` : `https://${domain}`;

  //   const fullUrl = headersList.get('referer') || '';

  //   console.log('domain');
  //   console.log(domain);

  //   console.log('fullUrl');
  //   console.log(fullUrl);

  return { domain, domainWithProtocol };
}
