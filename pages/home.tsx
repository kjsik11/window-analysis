import { useCallback, useState } from 'react';

import { useUI } from '@components/context';
import { UserLayout } from '@components/layout';
import { Button } from '@components/ui';
import DragDrop from '@components/ui/DragDrop';

import uploadFileAWS from '@lib/uploadFileAWS';


export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const {showNoti} = useUI()

  const uploadFile = useCallback(async(file:File)=>{
    try {
      setLoading(true)
      
      await uploadFileAWS(file)
    } catch(err) {
      showNoti({title:'uploadFile Error',content:err.message,variant:'alert'})
    } finally {
      setLoading(false)
    }
  },[showNoti])

  return (
    <div className="mx-auto mt-4 max-w-4xl">
      <DragDrop
        onDropFile={(file) => {
          setFile(file);
        }}
      />
      <div className='flex justify-between mt-4'>
        <p>File: {file?.name}</p>
        <Button onClick={()=>{ if(file) uploadFile(file) }} disabled={file===null||loading}>Submit</Button>
      </div>
    </div>
  );
}

HomePage.Layout = UserLayout;