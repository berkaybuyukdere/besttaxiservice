import pg from 'pg';

const PW = 'Berkay122300.';
const REF = 'whzxyjzyxttffafqkmzv';

const regions = [
  'eu-central-1',
  'eu-central-2',
  'eu-west-1',
  'eu-west-2',
  'eu-west-3',
  'eu-north-1',
  'us-east-1',
  'us-west-1',
  'us-west-2',
  'ap-southeast-1',
  'ap-northeast-1',
  'sa-east-1',
];

const urls = [
  (r) =>
    `postgresql://postgres.${REF}:${encodeURIComponent(PW)}@aws-0-${r}.pooler.supabase.com:5432/postgres`,
  (r) =>
    `postgresql://postgres.${REF}:${encodeURIComponent(PW)}@aws-0-${r}.pooler.supabase.com:6543/postgres`,
  (r) =>
    `postgresql://postgres:${encodeURIComponent(PW)}@aws-0-${r}.pooler.supabase.com:5432/postgres`,
  (r) =>
    `postgresql://postgres:${encodeURIComponent(PW)}@aws-1-${r}.pooler.supabase.com:5432/postgres`,
];

async function tryUrl(url) {
  const client = new pg.Client({
    connectionString: url,
    connectionTimeoutMillis: 8000,
    ssl: { rejectUnauthorized: false },
  });
  try {
    await client.connect();
    await client.query('SELECT 1');
    await client.end();
    return 'ok';
  } catch (e) {
    try {
      await client.end();
    } catch {
      /* ignore */
    }
    return e.message?.slice(0, 80) ?? String(e);
  }
}

async function main() {
  for (const region of regions) {
    for (const build of urls) {
      const url = build(region);
      const label = url.includes('6543') ? '6543' : '5432';
      const user = url.includes(`postgres.${REF}`) ? 'pooler-user' : 'postgres';
      const aws = url.includes('aws-1-') ? 'aws-1' : 'aws-0';
      const result = await tryUrl(url);
      if (result === 'ok') {
        console.log('SUCCESS', aws, region, label, user);
        console.log(url);
        process.exit(0);
      }
      if (!result.includes('ENOTFOUND') && !result.includes("Can't reach")) {
        console.log('NEAR', aws, region, label, user, '->', result);
      }
    }
  }
  console.log('No working pooler found');
  process.exit(1);
}

main();
