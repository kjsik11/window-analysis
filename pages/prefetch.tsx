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
          <p className="pt-8 text-xl text-gray-800 font-medium">
            시스템에서 실행된 응용프로그램을 분석할 때 유용한 파일로 Windows에서만 존재하는 파일로
            응용프로그램이 처음 사용되는 곳을 기준으로 Prefetch 파일을 만들고, 응용프로그램을 실행할
            때 속도를 향상시키기 위해서 Prefetching 기법을 사용한다.
          </p>
          <h1 className="text-5xl font-bold pt-40">Introduction</h1>
          <div className="pt-8 text-xl font-medium space-y-2">
            <p className="text-4xl text-gray-800 font-semibold"> Usage </p>
            <p className="text-gray-800">
              Windows 운영체제에서 부팅 및 응용 실행 시 프로세스의 메모리 적재 가속화를 생성
            </p>
            <p className="text-gray-800 text-md pl-4">* Windows XP 버전에서 처음 도입</p>
            <p className="text-gray-800 text-md pl-4">
              * 동일한 실행 파일이라도 특정 위치에서 처음 실행 시 Prefetching 수행
            </p>
            <br />
            <p className="text-4xl text-gray-800 font-semibold"> Function </p>
            <p className="text-gray-800">프로세스 가속화</p>
            <p className="text-gray-800 pl-4">* Windows 부팅 프로세스(Boot Prefetching)</p>
            <p className="text-gray-600 pl-8">
              &middot; 부팅 과정에서 로드되는 악성 코드 확인 가능
            </p>
            <p className="text-gray-600 pl-8">&middot; 윈도우는 부팅 중 다양한 파일을 사용</p>
            <p className="text-gray-600 pl-8">
              &middot; 부팅과 관련된 파일을 디스크내에 퍼져 있거나 단편화 되어 부팅속도를 저하시킴
            </p>
            <p className="text-gray-600 pl-8">
              &middot; 부팅 시 사용되는 코드와 데이터를 모니터링 한 후 결과를 파일에 저장
            </p>
            <p className="text-gray-600 pl-8">
              &middot; 부트 프리패칭된 파일을 이용해서 부팅시에 부팅 속도를 향상
            </p>
            <br />
            <p className="text-gray-800 text-md pl-4">
              Windows 응용 프로세스(Application Prefetching)
            </p>
            <p className="text-gray-600 pl-8">&middot; 악성코드가 활용하는 리소스 목록 확인 가능</p>
            <p className="text-gray-600 pl-8">&middot; Process Hollowing 기법 탐지 가능</p>
            <p className="text-gray-600 pl-8">
              &middot; 응용프로그램을 처음 실행시키면 캐시 관리자가 처음 10초 동안 모니터링 진행
            </p>
            <p className="text-gray-600 pl-8">
              &middot; 모니터링 하는 10초동안 메모리에 로드한 코드와 데이터 일부 혹은 전체를 파일로
              생성하는 이 파일을 프리패치 파일이라고 한다.
            </p>
            <p className="text-gray-600 pl-8">
              &middot; 프리패칭된 응용프로그램을 다시 실행 시 프리패치 파일을 이용해서 초기 실행
              속도 향상
            </p>
            <br />
            <p className="text-4xl text-gray-800 font-semibold">Limit</p>
            <p className="text-gray-800">Prefetch 최대개수</p>
            <p className="text-gray-800 text-md pl-4">* Windows XP, Vista, 7 &gt; 128개로 제한</p>
            <p className="text-gray-800 text-md pl-4">* Windows 8 &gt; 1024개로 제한</p>
            <p className="text-gray-800 text-md pl-4">* 오래된 Prefetch 파일부터 순서대로 삭제</p>
          </div>
        </div>
        <h1 className="text-5xl font-bold pt-40">Setting Prefetch function activate</h1>
        <div className="pt-8 text-xl text-gray-800 font-medium space-y-2">
          <p className="text-4xl text-gray-800 font-semibold"> Path </p>
          <p className="text-gray-600 pl-8">
            &middot; HKLM\System\ControlSet001\Control\SessionManager\Memory
            Management\PrefetchParameters
          </p>
          <br />
          <p className="text-4xl text-gray-800 font-semibold"> Level </p>
          <p className="text-gray-600 pl-8">&middot; Level 0: 비활성화</p>
          <p className="text-gray-600 pl-8">&middot; Level 1: 응용 프로그램 프리패칭만 사용</p>
          <p className="text-gray-600 pl-8">&middot; Level 2: 부트 프리패칭만 사용</p>
          <p className="text-gray-600 pl-8">
            &middot;Level 3: 응용/부트 프리패칭 모두 사용(Default)
          </p>
          <br />
          <p className="text-4xl text-gray-800 font-semibold"> CF </p>
          <p className="text-gray-600 pl-8">
            &middot; Window 10에서는 Boot Prefetch 파일이 없기 때문에 위의 레지스트리 값이 큰 의미가
            없다
          </p>
          <p className="text-gray-600 pl-8">
            &middot; Windows 운영체제 번호에 따라서 프리패치의 구조가 달라진다.
          </p>
          <br />
        </div>
        <h1 className="text-5xl font-bold pt-40">Reason for Prefetch analysis</h1>
        <div className="pt-8 text-xl text-gray-800 font-medium space-y-2">
          <p className="text-gray-800 pl-4">
            * 프리패치 파일은 다양한 정보를 가지고 있다 &gt; 분석 했을 때 얻을 수 있는 정보가 많고
            활용이 가능하다.
          </p>
          <br />
          <p className="text-gray-800 pl-4">* MetaData</p>
          <p className="text-gray-600 pl-8">&middot; 응용프로그램 이름</p>
          <p className="text-gray-600 pl-8">&middot; 응용프로그램 실행 횟수</p>
          <p className="text-gray-600 pl-8">&middot; 응용프로그램 마지막 실행 시간</p>
          <p className="text-gray-600 pl-8">&middot; 참조목록(ex. DLL, SBD, NLS, INI등의 경로)</p>
          <p className="text-gray-600 pl-8">
            &middot; 파일 시스템 시간 정보를 이용한 통합 타임라인 분석
          </p>
          <br />
        </div>
        <h1 className="text-5xl font-bold pt-40">Path</h1>
        <div className="pt-8 text-xl text-gray-800 font-medium space-y-2">
          <p className="text-gray-800 pl-4">* SystemRoot%\Prefetch\*</p>
        </div>
        <h1 className="text-5xl font-bold pt-40">Compressed Prefetch File Structure </h1>
        <div className="pt-8 text-xl text-gray-800 font-medium space-y-2">
          <p className="text-gray-800 pl-4">* Consist</p>
          <p className="text-gray-600 pl-8">&middot; File header</p>
          <p className="text-gray-600 pl-8">&middot; Compressed Blocks</p>
          <p className="text-gray-600 pl-8">&middot; Block terminator</p>
          <br />
          <p className="text-gray-800 pl-4">* Compressed Method</p>
          <p className="text-gray-600 pl-8">&middot; Microsoft XPRESS Huffman(or LZXPRESS)</p>
          <p className="text-gray-600 pl-8">&middot; Microsoft XPRESS (LZ77 + DIRECT2)</p>
          <br />
          <p className="text-gray-800 pl-4">* FileHeader</p>
          <NextImage
            width={835}
            height={163}
            loading="lazy"
            src="/images/prefetch/fileheader.png"
          />
          <br />
        </div>

        <h1 className="text-5xl font-bold pt-40">Uncompressed Prefetch File </h1>
        <div className="pt-8 text-xl text-gray-800 font-medium space-y-2">
          <p className="text-gray-800 pl-4">* Windows XP Windows 2003</p>
          <NextImage width={950} height={631} loading="lazy" src="/images/prefetch/windowxp.png" />
          <br />
          <p className="text-gray-800 pl-4">* Windows Vista, Windows 7</p>
          <NextImage
            width={928}
            height={662}
            loading="lazy"
            src="/images/prefetch/windowvista.png"
          />
          <br />
          <p className="text-gray-800 pl-4">* Windows 10</p>
          <NextImage width={786} height={662} loading="lazy" src="/images/prefetch/window10.png" />
          <br />
        </div>

        <h1 className="text-5xl font-bold pt-40">Uncompressed Prefetch File Structure </h1>
        <div className="pt-8 text-xl text-gray-800 font-medium space-y-2">
          <p className="text-gray-800 pl-4">* File Header(Windows 10)</p>
          <NextImage
            width={781}
            height={496}
            loading="lazy"
            src="/images/prefetch/fileheader-window10.png"
          />
          <br />
          <p className="text-gray-800 pl-4">* File Information(Windows 10)</p>
          <NextImage
            width={778}
            height={473}
            loading="lazy"
            src="/images/prefetch/fileinformation-window10.png"
          />
          <br />
        </div>
      </div>

      {h1Element && (
        <div>
          <div className="sticky top-10 pl-8">
            <p className="text-3xl font-semibold text-left w-80">Prefetch</p>
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
