import { useCallback, useState } from 'react';

import { UserLayout } from '@components/layout';
import { Button } from '@components/ui';
import DragDrop from '@components/ui/DragDrop';


export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = useCallback(async()=>{},[])

  return (
    <div className="mx-4 mt-4">
      <DragDrop
        onDropFile={(file) => {
          console.log(file)
          setFile(file);
        }}
      />
      <div className='flex justify-end mt-4'>
        <Button onClick={()=>{uploadFile()}} disabled={file===null}>Submit</Button>
      </div>
    </div>
  );
}

HomePage.Layout = UserLayout;