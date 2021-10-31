import { useCallback, useState } from 'react';
import { CSVLink } from 'react-csv';

import { useUI } from '@components/context';
import { Loading } from '@components/core';
import { UserLayout } from '@components/layout';
import { Button } from '@components/ui';
import DragDrop from '@components/ui/DragDrop';

import getData from '@lib/getData';
import uploadFileAWS from '@lib/uploadFileAWS';

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [parseData,setParseData] = useState<any|null>(null)
  const { showNoti } = useUI();

  const uploadFile = useCallback(
    async (file: File) => {
      try {
        setLoading(true);
        setParseData(null)

         await uploadFileAWS(file);

        const parseData = await getData(file.name);

        console.log(parseData)

        if (parseData) {
        setParseData(parseData)
        }
      } catch (err) {
        showNoti({ title: 'uploadFile Error', content: err.message, variant: 'alert' });
      } finally {
        setLoading(false);
      }
    },
    [showNoti],
  );

  return (
    <div className="mx-auto mt-4  max-w-7xl px-4 pb-20">
      <div className="max-w-4xl mx-auto lg:pt-12">
        <h1 className="text-3xl sm:text-4xl font-bold">Window Artifacts Analysis</h1>
        <div className="h-[1px] bg-gray-300 w-full mb-8 mt-4" />
        <DragDrop
          className="h-48"
          onDropFile={(file) => {
            setFile(file);
          }}
        />
        <div className="flex justify-between mt-4">
          <p>File Name: {file?.name}</p>
          <Button
            onClick={() => {
              if (file) uploadFile(file);
            }}
            disabled={file === null || loading}
          >
            Submit
          </Button>
        </div>
      </div>
      {loading && <Loading />}
      {parseData!==null&&
      <div>
         <p className="text-2xl font-bold mt-8">Artifact Name: {parseData['artifactName']}</p>
              <div className="flex items-center justify-between mt-12">
            <p className="text-2xl font-bold">
              ParseResult는 한 테이블에 최대100개까지 표시)
            </p>
            <CSVLink filename="parse-result.csv" data={Object.entries(parseData).filter((val)=>val[0]!=='artifactName').map((val)=>{
              
              return [...val[1] as any[],[]]
              }).flat(1)}>
              <Button>Get CSV</Button>
            </CSVLink>
          </div>
     {Object.entries(parseData).map((val,idx)=>{
       if(val[0]!=='artifactName') {
         return <div key={`parseResult-${idx}`} className='mt-8'>
                  <div className="shadow overflow-x-scroll border-b border-gray-200 sm:rounded-lg mt-4">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr className="text-center">
                          {((val[1] as any[])[0] as any[]).map((val, idx) => (
                            <th
                              key={`parse-label-${idx}-${val}`}
                              scope="col"
                              className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {val}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {(val[1] as any[]).slice(1,100).map((parseArray, idx) => (
                          <tr key={`parse-result-${idx}`} className="text-center w-40">
                            {(parseArray as any[]).map((data, index) => (
                              <td
                                key={`parse-result-data-${idx}-${index}`}
                                className="py-4 whitespace-nowrap text-sm w-40 font-medium text-gray-900"
                              >
                                {data}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
               }
           })}
        </div>
       }
  
        
    </div>
  );
}

HomePage.Layout = UserLayout;
