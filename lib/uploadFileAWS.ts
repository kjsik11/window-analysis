import { fetcher } from "./fetcher";

export default async function uploadFileAWS (file:File) {
    try {
        const { url, fields } = await fetcher
          .get('/api/aws/presigned-post', { searchParams: { key: file.name } })
          .json<{ url: string; fields: { [key: string]: string } }>();
  

        const formData = new FormData();
        Object.entries({ ...fields }).forEach(([key, value]) => {
          formData.append(key, value);
        });
  
  
        formData.append('file', file, file.name);
  
        const response = await fetch(url, { method: 'POST', body: formData });
        if (!response.ok) {
          throw new Error(await response.text());
        }
  
     
  
      } catch (err) {
     console.log('[uploadFileAWS error]',err)
     return err
      }
}