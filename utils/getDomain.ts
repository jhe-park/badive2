import 'server-only';
import { headers } from 'next/headers';

export async function getDomain() {
  const headersList = await headers();
  const domain = headersList.get('host') || '';

  const domainWithProtocol = domain.startsWith('localhost') ? `http://${domain}` : `https://${domain}`;

  return { domain, domainWithProtocol };
}
