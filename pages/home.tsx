import { useCallback, useState } from 'react';

import { useUI } from '@components/context';
import { UserLayout } from '@components/layout';
import { Button } from '@components/ui';
import DragDrop from '@components/ui/DragDrop';

import getBuffer from '@lib/getBuffer';
import uploadFileAWS from '@lib/uploadFileAWS';


export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [buffer,setBuffer] = useState<number[]|null>(null)

  const {showNoti} = useUI()

  const uploadFile = useCallback(async(file:File)=>{
    try {
      setLoading(true)
      
      const url = await uploadFileAWS(file)

      const buffer = await getBuffer(url)
      
      if(buffer!==null) {
        setBuffer(buffer)
      }
    } catch(err) {
      showNoti({title:'uploadFile Error',content:err.message,variant:'alert'})
    } finally {
      setLoading(false)
    }
  },[showNoti])

  return (
    <div className="mx-auto mt-4 max-w-4xl px-4">
      <DragDrop
        onDropFile={(file) => {
          setFile(file);
        }}
      />
      <div className='flex justify-between mt-4'>
        <p>File Name: {file?.name}</p>
        <Button onClick={()=>{ if(file) uploadFile(file) }} disabled={file===null||loading}>Submit</Button>
      </div>
      {buffer&&<div>
        <p className='text-xl font-bold'>Buffer</p>
          <div className='flex flex-wrap space-x-2'>
            {buffer.map((val,idx)=><p key={`${val}-${idx}`}>{val}</p>)}
          </div>
        </div>}
    </div>
  );
}

HomePage.Layout = UserLayout;