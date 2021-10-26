import { useCallback, useState } from 'react';
import { CSVLink } from 'react-csv';

import { useUI } from '@components/context';
import { Loading } from '@components/core';
import { UserLayout } from '@components/layout';
import { Button } from '@components/ui';
import DragDrop from '@components/ui/DragDrop';

import getBuffer from '@lib/getData';
import uploadFileAWS from '@lib/uploadFileAWS';

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [artifactName, setArtifactName] = useState<string | null>(null);
  const [mainParseResult, setMainParseResult] = useState<any[]>([]);
  const [subParseResult, setSubParseResult] = useState<any[]>([]);

  const { showNoti } = useUI();

  const uploadFile = useCallback(
    async (file: File) => {
      try {
        setLoading(true);
        setArtifactName(null);
        setMainParseResult([]);
        setSubParseResult([]);
        const url = await uploadFileAWS(file);

        const {
          Artifact_name: artifactName,
          parseResult_Main: mainParseResult,
          parseResult_Sub: subParseResult,
        } = await getBuffer(url);

        if (artifactName && mainParseResult && subParseResult) {
          setArtifactName(artifactName);
          setMainParseResult(mainParseResult);
          setSubParseResult(subParseResult);
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
      {artifactName && <p className="text-2xl font-bold mt-8">Artifact Name: {artifactName}</p>}
      {mainParseResult.length > 0 && subParseResult.length > 0 && (
        <div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-2xl font-bold">
              ParseResult (총{mainParseResult.length - 1 + (subParseResult.length - 1)}개, 최대
              100개까지 표시)
            </p>
            <CSVLink filename="parse-result.csv" data={[...mainParseResult, [], ...subParseResult]}>
              <Button>Get CSV</Button>
            </CSVLink>
          </div>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-center">
                  {(mainParseResult[0] as any[]).map((val, idx) => (
                    <th
                      key={`main-parse-label-${idx}-${val}`}
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {val}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mainParseResult.slice(1).map((parseArray, idx) => (
                  <tr key={`main-parse-result-${idx}`} className="text-center">
                    {(parseArray as any[]).map((data, index) => (
                      <td
                        key={`main-parse-result-data-${idx}-${index}`}
                        className="py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {data}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-center">
                  {(subParseResult[0] as any[]).map((val, idx) => (
                    <th
                      key={`sub-parse-label-${idx}-${val}`}
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {val}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subParseResult.slice(1, 100).map((parseArray, idx) => (
                  <tr key={`sub-parse-result-${idx}`} className="text-center">
                    {(parseArray as any[]).map((data, index) => (
                      <td
                        key={`sub-parse-result-data-${idx}-${index}`}
                        className="py-4 max-w-[400px] whitespace-nowrap text-sm font-medium text-gray-900 truncate px-4"
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
      )}
    </div>
  );
}

HomePage.Layout = UserLayout;
