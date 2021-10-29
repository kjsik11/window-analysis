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
          <p className="text-gray-800 text-md pl-4">
            * 마이크로소프트 윈도우 운영체제에서 운영체제와 응용프로그램 운영에 필요한 정보를
            저장하기 위해 고안한 계층형 데이터베이스
          </p>
          <br />
          <p className="text-gray-800 text-md pl-4">
            * 부팅 과정부터 로그인, 서비스 실행, 응용프로그램 실행, 사용자 행위 등 모든 활동에 관여
          </p>
          <br />
          <p className="text-gray-800 text-md pl-4">
            * 윈도우 3.11, 9x, Me, NT, 2000, XP, 2003, Vista, 2008, 7 에서 사용
          </p>
          <br />
        </div>
        <h1 className="text-5xl font-bold pt-40">온라인(On-line) 레지스트리 분석</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <p className="text-gray-800 text-md pl-4">* 활성시스템에서의 레지스트리 분석</p>
          <br />
          <p className="text-gray-800 text-md pl-4">
            * RegEdit(regedit.exe), RegEdt32(regedt32.exe)를 통해 확인 가능
          </p>
          <br />
        </div>
        <h1 className="text-5xl font-bold pt-40">오프라인(Off-line) 레지스트리 분석</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <p className="text-gray-800 text-md pl-4">
            * RegEdit(regedit.exe), RegEdt32(regedt32.exe)를 통해 확인 가능
          </p>
          <br />
          <p className="text-gray-800 text-md pl-4">
            * 비활성시스템(포렌식 복제 드라이브나 이미지)에서의 레지스트리 분석
          </p>
          <br />
          <p className="text-gray-800 text-md pl-4">* 레지스트리 하이브(Hive) 파일의 수집이 필요</p>
          <br />
          <p className="text-gray-800 text-md pl-4">
            * 운영체제 버전별 하이브 파일의 정확한 위치를 사전에 숙지
          </p>
          <br />
          <p className="text-gray-800 text-md pl-4">
            * 포렌식 분석은 대부분 오프라인 레지스트리 분석을 대상으로 한다.
          </p>
          <br />
        </div>
        <h1 className="text-5xl font-bold pt-40">하이브(Hive) 파일</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <p className="pt-8 text-xl text-gray-800 font-medium">하이브 파일</p>
          <p className="text-gray-800 text-md pl-4">
            * 레지스트리 정보를 저장하고 있는 물리적인 파일
          </p>
          <p className="text-gray-800 text-md pl-4">* 키(Key) 값들이 논리적인 구조로 저장</p>
          <p className="text-gray-800 text-md pl-4">* 활성시스템의 커널에서 하이브 파일을 관리</p>
          <p className="text-gray-600 pl-8">&middot; 일반적인 방법으로는 접근 불가</p>
          <br />
          <p className="pt-8 text-xl text-gray-800 font-medium">하이브 셋 (Hive Set)</p>
          <p className="text-gray-800 text-md pl-4">
            * 활성시스템의 레지스트리를 구성하는 하이브 파일 목록
          </p>
          <p className="text-gray-800 text-md pl-4">
            * SAM, SECURITY, SYSTEM, SOFTWARE, Default, NTUSER.DAT, Usrclass.dat, BCD, COMPONENTS 등
          </p>
          <br />
          <p className="pt-8 text-xl text-gray-800 font-medium">하이브 블록 (Hive Block)</p>
          <p className="text-gray-800 text-md pl-4">
            * 파일시스템 클러스터와 같이 하이브에서 사용하는 논리적인 할당 단위
          </p>
          <p className="text-gray-800 text-md pl-4">* 블록 크기 : 4,096 바이트</p>
          <p className="text-gray-800 text-md pl-4">
            * 새로운 데이터가 하이브에 추가되면 항상 블록 단위로 증가
          </p>
          <p className="text-gray-800 text-md pl-4">
            * 하이브의 첫번째 블록은 베이스 블록 (base block)
          </p>
          <p className="text-gray-600 pl-8">&middot; 시그니처 (regf)</p>
          <p className="text-gray-600 pl-8">&middot; 갱신 순서 번호</p>
          <p className="text-gray-600 pl-8">&middot; 마지막 수정 시간</p>
          <p className="text-gray-600 pl-8">&middot; 레지스트리 복원/복구에 관한 정보</p>
          <p className="text-gray-600 pl-8">&middot; 하이브 포맷 버전 번호</p>
          <p className="text-gray-600 pl-8">&middot; 체크섬</p>
          <p className="text-gray-600 pl-8">&middot; 파일명</p>
          <br />
          <p className="pt-8 text-xl text-gray-800 font-medium">하이브 빈 (Hive Bin)</p>
          <p className="text-gray-800 text-md pl-4">
            * 레지스트리의 논리적인 크기는 블록 단위로 증가
          </p>
          <p className="text-gray-800 text-md pl-4">
            * 블록 내부적으로 데이터를 저장하기 위한 4,096 바이트의 구조
          </p>
          <p className="text-gray-800 text-md pl-4">
            * 레지스트리 로드시 하이브 빈 단위를 기준으로 로드
          </p>
          <p className="text-gray-800 text-md pl-4">
            * 모든 하이브 빈은 “hbin”이라는 시그니처 값으로 시작
          </p>
          <br />
        </div>
        <h1 className="text-5xl font-bold pt-40">하이브 구조</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <NextImage width={280} height={415} loading="lazy" src="/images/hive/structure.png" />
          <p className="text-gray-800 text-md pl-4">* 블록크기</p>
          <p className="text-gray-600 pl-8">&middot; 4096 bytes</p>
          <br />
          <p className="text-gray-800 text-md pl-4">* 하이브 헤더 (Hive Header)</p>
          <p className="text-gray-600 pl-8">&middot; 1 블록</p>
          <br />
          <p className="text-gray-800 text-md pl-4">* 하이브 빈 (Hive Bin)</p>
          <p className="text-gray-600 pl-8">&middot; 셀(Cell)을 포함하는 컨테이너</p>
          <p className="text-gray-600 pl-8">&middot; 가변 길이의 블록</p>
          <p className="text-gray-600 pl-8">
            &middot; 모든 하이브 빈은 “hbin”이라는 시그니처 값으로 시작
          </p>
          <p className="text-gray-600 pl-8">&middot; 레지스트리 로드시 하이브 빈 단위를 기준함</p>
          <br />
          <p className="text-gray-800 text-md pl-4">* 셀 (Cell)</p>
          <p className="text-gray-600 pl-8">
            &middot; 실제 데이터를 저장하는 단위 (8 바이트의 배수)
          </p>
          <p className="text-gray-600 pl-8">
            &middot; 키(key), 하위키 목록(subkey-list), 값(value), 값 목록(value list)
          </p>
          <p className="text-gray-600 pl-8">
            &middot; 데이터(data), 보안 기술자(security descriptor) 등의 유형이 있다.
          </p>
          <br />
        </div>
      </div>

      {h1Element && (
        <div>
          <div className="sticky top-10 pl-8">
            <p className="text-3xl font-semibold text-left w-80">Registry</p>
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
