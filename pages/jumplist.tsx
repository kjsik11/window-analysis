import NextImage from 'next/image';
import { useEffect, useState } from 'react';

import { UserLayout } from '@components/layout';

export default function LnkDocsPage() {
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
          <p className="text-gray-800 text-md pl-4">* 윈도우 7 부터 새롭게 추가된 기능</p>
          <br />
          <p className="text-gray-800 text-md pl-4">
            * 응용프로그램을 사용할때 사용한 로그를 표현해준다.
          </p>
          <br />
          <p className="text-gray-800 text-md pl-4">
            * 작업 표시줄에서 마우스 우클릭 시에 확인 가능
          </p>
          <br />
          <p className="text-gray-800 text-md pl-4">* 다음 항목으로 분류하여 저장</p>
          <p className="text-gray-600 pl-8">
            &middot; Recent (최근 항목) : 사용자가 최근 접근한 파일이나 폴더
          </p>
          <p className="text-gray-600 pl-8">
            &middot; Frequent (자주 사용하는 항목) : 사용자가 빈번히 접근한 파일이나 폴더
          </p>
          <p className="text-gray-600 pl-8">
            &middot; Tasks (작업) : 응용프로그램에서 지원하는 작업 목록
          </p>
          <p className="text-gray-600 pl-8">
            &middot; Pinned (사용자 고정) : 사용자가 고정 시킨 작업 목록
          </p>
          <br />
        </div>
        <h1 className="text-5xl font-bold pt-40">Path</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <p className="text-gray-800 text-md pl-4">
            * %UserProfile%\AppData\Roaming\Microsoft\Windows\Recent\
          </p>
          <p className="text-gray-600 pl-8">&middot; AutomaticDestinations\* (Recent, Pinned)</p>
          <p className="text-gray-600 pl-8">&middot; CustomDestinations\* (Requent, Tasks)</p>
          <br />
        </div>
        <h1 className="text-5xl font-bold pt-40">Jump file structure</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <NextImage width={353} height={655} loading="lazy" src="/images/jumplist/structure.png" />
          <p className="text-gray-800 text-md pl-4">* LINK File Structure 여러 개 존재</p>
          <br />
          <p className="text-gray-800 text-md pl-4">
            * File Structure DestList File Structure 1개 존재
          </p>
          <br />
        </div>
        <h1 className="text-5xl font-bold pt-40">DestList Stream</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <NextImage width={770} height={334} loading="lazy" src="/images/jumplist/dest.png" />
          <p className="text-gray-800 text-md pl-4">
            * Check Sum : 가리키고 있는 Stream의 Check Sum 값이 저장되어 있다.
          </p>

          <p className="text-gray-800 text-md pl-4">
            * New Volume : Birth Volume ID 값이 아닌 Volume에서 해당 파일이 수정되면 파일이 수정 될
            때의 Volume GUID 값이 저장된다.
          </p>
          <p className="text-gray-800 text-md pl-4">
            * Object ID 1 : 어떤 ID 값이 저장되는지 밝혀지지 않았지만, 다음에 존재하는 Object ID 2와
            동일한 값을 저장한다.
          </p>
          <p className="text-gray-800 text-md pl-4">
            * Birth Volume ID : 가리키고 있는 Stream이 생성 된 Volume GUID 값이 저장된다.
          </p>
          <p className="text-gray-800 text-md pl-4">
            * Object ID 2 : 어떤 ID 값이 저장되는지 밝혀지지 않았지만, 이전에 존재하는 Object ID 1과
            동일한 값을 저장한다.
          </p>
          <p className="text-gray-800 text-md pl-4">
            * Machine ID : 해당 Stream이 생성 된 시스템의 이름 값이 저장된다.
          </p>
          <p className="text-gray-800 text-md pl-4">
            * Entry ID : 가리키고 있는 Stream의 이름이 저장된다.
          </p>
          <p className="text-gray-800 text-md pl-4">
            * File Access Count : Stream의 접근 횟수를 부동소수점으로 표현한 값을 저장하고 있다.
          </p>
          <p className="text-gray-800 text-md pl-4">
            * Last Record Time : Stream의 마지막 수정 시간을 저장하고 있다.
          </p>
          <p className="text-gray-800 text-md pl-4">
            * pin : 메타데이터 구조의 끝을 알리는 값으로 항상 0xFFFFFFFF 값을 가지고 있다.
          </p>
          <p className="text-gray-800 text-md pl-4">
            * Unicode String Length : 뒷 부분에 위치하는 Unicode 문자열의 길이를 저장하고 있다. 실제
            길이는 Unicode의 2byte 특성 때문에 해당 값에 2를 곱해야 한다.
          </p>
          <p className="text-gray-800 text-md pl-4">
            * Unicode String : Stream에서 가지고 있는 문자열을 Unicode 형태로 저장하고 있다.
          </p>
        </div>
        <h1 className="text-5xl font-bold pt-40">CustomDestination</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <NextImage width={302} height={511} loading="lazy" src="/images/jumplist/custom.png" />
          <p className="text-gray-800 text-md pl-4">
            * CustomDestination의 구조는 표준으로 정해져 있지 않다.
          </p>
          <p className="text-gray-800 text-md pl-4">* 불규칙적으로 lnk 구조가 여러 개 존재한다.</p>
          <p className="text-gray-800 text-md pl-4">* Lnk 구조는 헤더의 크기는 76byte</p>
          <p className="text-gray-800 text-md pl-4">* 필드의 값은 0x4C000000</p>
          <p className="text-gray-800 text-md pl-4">
            * 파일의 GUID 값이 항상 00021401-0000-0000-C000-000000000046
          </p>
        </div>
      </div>

      {h1Element && (
        <div>
          <div className="sticky top-10 pl-8">
            <p className="text-3xl font-semibold text-left w-80">JumpList</p>
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

LnkDocsPage.Layout = UserLayout;
