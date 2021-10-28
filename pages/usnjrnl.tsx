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
          <p className="text-gray-800">
            응용 프로그램이 특정 파일의 변경 여부를 파악하기 위해 사용
          </p>
          <br />
          <p className="text-gray-800">기본적으로 Windows 7부터 활성화</p>
          <br />
          <p className="text-gray-800">$MAX 속성과 $J 속성으로 구분</p>
          <p className="text-gray-800 pl-4">* $MAT : 변경 로그의 기본 메타 데이터 저장</p>
          <p className="text-gray-800 pl-4">* $J : 실제 변경 로그 레코드 저장</p>
          <p className="text-gray-600 pl-8">
            &middot; 각 레코드 들은 USN(Update Sequence Number) 정보를 가짐
          </p>
          <p className="text-gray-600 pl-8">&middot; USN 정보를 통해 각 레코드들의 순서 구분</p>
          <p className="text-gray-600 pl-8">
            &middot; 실제 USN 값은 $J 속성 내에서 레코드의 Offset 값
          </p>
          <p className="text-gray-600 pl-8">
            &middot; USN 값은 MFT Entry의 $STANDARD_INFORMATION 속성에도 저장됨
          </p>
          <br />
        </div>
        <h1 className="text-5xl font-bold pt-40">Path</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <p className="text-gray-800 pl-4">* \$Extend\$UsnJrnl\$J</p>
          <p className="text-gray-800 pl-4">* \$Extend\$UsnJrnl\$MAX</p>
          <NextImage width={716} height={231} loading="lazy" src="/images/usnjrnl/path.png" />
        </div>
        <h1 className="text-5xl font-bold pt-40">$J Structure</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <p className="text-gray-800 pl-4">* 가변 크기의 로그 레코드들이 연속적으로 나열</p>
          <p className="text-gray-800 pl-4">* 속성 앞 부분은 0으로 채워진 SParse Area를 가짐</p>
          <NextImage width={672} height={191} loading="lazy" src="/images/usnjrnl/structure.png" />
          <p className="pt-8 text-xl text-gray-800 font-medium">
            이러한 구조를 가지는 이유는 운영체제가 $J 속성에 저장되는 로그 데이터의 크기를 일정하게
            유지하려고 하기 때문이다.
          </p>
          <p className="text-gray-800 pl-4">* $J 속성의 로그 레코드 구조</p>
          <NextImage width={717} height={374} loading="lazy" src="/images/usnjrnl/structure2.png" />
          <br />
          <p className="text-gray-800 pl-4">* Reason Flag 정보</p>
          <NextImage width={715} height={557} loading="lazy" src="/images/usnjrnl/structure3.png" />
          <br />
          <p className="text-gray-800 pl-4">* Source Information 정보</p>
          <NextImage width={713} height={154} loading="lazy" src="/images/usnjrnl/structure4.png" />
          <br />
          <p className="text-gray-800 pl-4">* File Attribute 정보</p>
          <NextImage width={717} height={601} loading="lazy" src="/images/usnjrnl/structure5.png" />
          <br />
        </div>
      </div>

      {h1Element && (
        <div>
          <div className="sticky top-10 pl-8">
            <p className="text-3xl font-semibold text-left w-80">Usnjrnl</p>
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
