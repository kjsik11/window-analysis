import NextImage from 'next/image';
import { useEffect, useState } from 'react';

import { UserLayout } from '@components/layout';

export default function PrefetchDocsPage() {
  const [h1Element, setH1Element] = useState<{
    h1Elements: HTMLCollectionOf<HTMLHeadingElement>;
    length: number;
  } | null>(null);

  useEffect(() => {
    const h1Elements = document.getElementsByTagName('h1');

    setH1Element({ h1Elements, length: h1Elements.length });
  }, []);

  return (
    <div className="flex max-w-7xl mx-auto space-x-40 divide-x-2 px-4">
      <div className="py-20">
        <h1 className="text-5xl font-bold">Concept</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <p className="text-gray-800">NTFS 파일 시스템의 가장 핵심적인 부분</p>
          <br />
          <p className="text-gray-800">모든 파일에 대해서 적어도 한 개의 엔트리 보유</p>
          <br />
          <p className="text-gray-800">
            볼륨에 존재하는 모든 파일과 디렉터리에 대한 정보를 가진 테이블
          </p>
          <br />
        </div>
        <h1 className="text-5xl font-bold pt-40">Path</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <p className="text-gray-800 pl-4">* \$MFT</p>
        </div>
        <h1 className="text-5xl font-bold pt-40">$MFT 영역</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <p className="text-gray-800 pl-4">
            * MFT 영역은 MFT 엔트리들의 집합으로서 NTFS내에 존재하는 모든 파일 또는 디렉터리는 파일
            당 하나 이상의 MFT 엔트리가 할당됩니다. MFT 엔트리는 1024 byte 크기로 각 파일 및
            디렉터리의 위치, 시간정보, 파일이름, 크기 등의 속성 정보를 담고 있습니다.
          </p>
          <p className="text-gray-800 pl-4">* MFT 영역은 [그림 1]처럼 VBR 영역 이후에 오게 된다.</p>
          <NextImage width={589} height={132} loading="lazy" src="/images/mft/path.png" />
        </div>
        <h1 className="text-5xl font-bold pt-40">$MFT Entry 구조</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <p className="text-gray-800 pl-4">
            * MFT 엔트리 구조는 [그림 2]와 같이 맨 앞부분에 Entry Header가 존재하고, 이어서 Fixup
            Array 그리고 해당하는 파일의 특성에 따라서 여러 개의 속성(Attributes)들이 순서대로
            따라오며 속성을 끝내는 EndMarker로 이루어져 있는 총 1024 Byte 구조를 가지고 있습니다.
            하지만 속성이 많고 MFT Entry 공간이 부족하다면 다른 MFT Entry를 활용하여 계속 저장이
            됩니다.
          </p>
          <NextImage width={850} height={89} loading="lazy" src="/images/mft/structure.png" />
        </div>
        <h1 className="text-5xl font-bold pt-40">$MFT Entry Header 구조</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <p className="text-gray-800 pl-4">
            * 모든 MFT 엔트리의 맨 앞부분에 위치하며 48 byte의 고정된 크기의 정보
          </p>
          <NextImage width={817} height={197} loading="lazy" src="/images/mft/header1.png" />
          <NextImage width={815} height={335} loading="lazy" src="/images/mft/header2.png" />
        </div>
        <h1 className="text-5xl font-bold pt-40">$MFT Entry Attribute</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <p className="text-gray-800 pl-4">* NTFS는 기본적으로 17개의 속성을 가지고 있다.</p>
          <NextImage width={836} height={565} loading="lazy" src="/images/mft/attribute.png" />
        </div>
        <h1 className="text-5xl font-bold pt-40">$STANDARD_INFORMATION 속성 구조</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <NextImage width={711} height={218} loading="lazy" src="/images/mft/info1.png" />
          <NextImage width={707} height={511} loading="lazy" src="/images/mft/info2.png" />
        </div>
        <h1 className="text-5xl font-bold pt-40">$FILE_NAME 속성 구조</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <NextImage width={831} height={259} loading="lazy" src="/images/mft/file1.png" />
          <NextImage width={836} height={535} loading="lazy" src="/images/mft/file2.png" />
        </div>
      </div>

      {h1Element && (
        <div>
          <div className="sticky top-10 pl-8">
            <p className="text-3xl font-semibold text-left w-80">MFT</p>
            {Array.from({ length: h1Element.length }, (_, idx) => (
              <div key={`h1-element-tag-${idx}`} className="pt-4">
                <button
                  onClick={() => {
                    h1Element.h1Elements[idx].scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                  className="text-lg font-medium hover:opacity-80"
                >
                  {h1Element.h1Elements[idx].innerText}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

PrefetchDocsPage.Layout = UserLayout;
