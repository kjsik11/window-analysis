import NextLink from 'next/link';

// components
import { Button } from '@components/ui';
import { UserLayout } from '@components/layout';
import DragDrop from '@components/ui/DragDrop';
import { useState } from 'react';

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="ml-4 mt-4">
    <DragDrop
       onDropFile={(file) => {
        setFile(file);
      }}
    />
    {console.log('text',file)}
    </div>
  );
}

HomePage.Layout = UserLayout;