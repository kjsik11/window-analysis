import { fetcher } from "./fetcher";

export default async function getBuffer (url:string) {
    try {
      
        const {rawBody:bufferData} = await fetcher.post('/api/parse',{
          searchParams:{url}
        }).json<{rawBody:{type:'Buffer',data:number[]}}>()

        if (!bufferData) 
          throw new Error('failed fetch');
        
        return bufferData.data
      } catch (err) {
     console.log('[getBuffer error]',err)
     throw new Error(err)
     }
}