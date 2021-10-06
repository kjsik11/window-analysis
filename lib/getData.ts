import { fetcher } from './fetcher';

export default async function getData(url: string) {
  try {
    const { data } = await fetcher
      .post('/api/parse', {
        searchParams: { url },
      })
      .json<{
        data: { Artifact_name: string; parseResult_Main: any[]; parseResult_Sub: any[] };
      }>();

    return data;
  } catch (err) {
    console.log('[getData error]', err);
    throw new Error(err);
  }
}
