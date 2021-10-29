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
          <p className="text-gray-800 text-md pl-4">* NTFS 트랙잭션 로그 파일</p>
          <p className="text-gray-600 pl-8">
            &middot; 시스템 오류나 갑작스런 전원 차단 발생시, 작업 중이던 파일 복구를 위해 사용
          </p>
          <p className="text-gray-600 pl-8">&middot; 모든 트랜젝션 작업을 레코드 단위로 기록</p>
          <p className="text-gray-600 pl-8">
            &middot; 각 작업 레코드는 고유의 LSN($LogFile Sequence Number)을 가진다.
          </p>
          <p className="text-gray-600 pl-8">&middot; MFT 엔트리 번호 2에 위치</p>
          <br />
          <NextImage width={630} height={195} loading="lazy" src="/images/logfile/concept.png" />
        </div>
        <h1 className="text-5xl font-bold pt-40">Overall Structure</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <NextImage width={766} height={314} loading="lazy" src="/images/logfile/concept.png" />
          <p className="text-gray-800 text-md pl-4">* NTFS 트랙잭션 로그 파일</p>
          <p className="text-gray-600 pl-8">
            &middot; 시스템 오류나 갑작스런 전원 차단 발생시, 작업 중이던 파일 복구를 위해 사용
          </p>
          <p className="text-gray-600 pl-8">&middot; 모든 트랜젝션 작업을 레코드 단위로 기록</p>
          <p className="text-gray-600 pl-8">
            &middot; 각 작업 레코드는 고유의 LSN($LogFile Sequence Number)을 가진다.
          </p>
          <p className="text-gray-600 pl-8">&middot; MFT 엔트리 번호 2에 위치</p>
          <br />
          <NextImage width={630} height={195} loading="lazy" src="/images/logfile/concept.png" />
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
          <p className="pt-8 text-xl text-gray-800 font-medium">
            재시작 영역(Restart Area)와 로깅 영역(Logging Area)로 나누어진다.
          </p>
          <p className="text-gray-800 text-md pl-4">* Restart Area</p>
          <p className="text-gray-600 pl-8">
            &middot; 가장 마지막(현재 작업 중인) 작업 레코드를 가리킨다.
          </p>
          <p className="text-gray-600 pl-8">&middot; 파일의 첫 두 페이지 영역(0x0000~0x2000)</p>
          <br />
          <p className="text-gray-800 text-md pl-4">* Logging Area</p>
          <p className="text-gray-600 pl-8">&middot; 실제 작업 레코드들이 기록된다.</p>
          <p className="text-gray-600 pl-8">&middot; 재시작 영역 바로 다음부터 시작(0x2000~)</p>
          <p className="text-gray-600 pl-8">
            &middot; 버퍼 페이지 영역과 일반 페이지 영역으로 나누어진다.
          </p>
          <br />
        </div>
        <h1 className="text-5xl font-bold pt-40">Restart Area Structure</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <NextImage width={773} height={285} loading="lazy" src="/images/logfile/area.png" />
          <p className="text-gray-800 text-md pl-4">
            * 가장 마지막(현재 작업 중인) 작업 레코드를 가리킨다.
          </p>
          <p className="text-gray-600 pl-8">
            &middot; Current LSN 정보를 통해 가장 마지막 작업 레코드의 LSN 번호를 알 수 있다.
          </p>
          <br />
          <p className="text-gray-800 text-md pl-4">
            * 연속된 두 페이지로 구성, 두 번째 페이지는 백업용이다.
          </p>
          <p className="text-gray-600 pl-8">&middot; 각 페이지는 매직넘버(RSTR)로 시작된다.</p>
          <br />
          <p className="text-gray-800 text-md pl-4">* 재시작 영역 헤더 포멧</p>
          <br />
        </div>
        <h1 className="text-5xl font-bold pt-40">Logging Area Structure</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <NextImage width={772} height={267} loading="lazy" src="/images/logfile/logging.png" />
          <p className="pt-8 text-xl text-gray-800 font-medium">실제 작업 레코드들이 기록된다.</p>
          <br />
          <p className="pt-8 text-xl text-gray-800 font-medium">
            버퍼 페이지 영역과 일반 페이지 영역으로 나누어진다.
          </p>
          <p className="text-gray-800 text-md pl-4">* 버퍼페이지 영역</p>
          <p className="text-gray-600 pl-8">&middot; 첫 두 페이지(0x2000~0x4000)</p>
          <p className="text-gray-600 pl-8">&middot; 순차적으로 레코드가 기록된다.</p>
          <p className="text-gray-600 pl-8">
            &middot; 페이지가 레코드로 꽉 차면 페이지 내용을 일반 페이지 영역에 기록된다.
          </p>
          <p className="text-gray-600 pl-8">
            &middot; 최근 작업 레코드들은 버퍼 페이지 영역에 존재한다.
          </p>
          <p className="text-gray-800 text-md pl-4">* 일반페이지 영역</p>
          <p className="text-gray-600 pl-8">
            &middot; 버퍼 페이지 영역을 제외한 나머지 영역(0x4000~)
          </p>
          <p className="text-gray-600 pl-8">&middot; 순차적으로 레코드가 기록된다. </p>
          <p className="text-gray-600 pl-8">
            &middot; 파일 끝까지 기록되면 다시 영역 앞에서부터 덮어쓴다.
          </p>
          <br />
        </div>
        <h1 className="text-5xl font-bold pt-40">Page Structure</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <NextImage width={772} height={249} loading="lazy" src="/images/logfile/page.png" />

          <p className="text-gray-800 text-md pl-4">* 페이지 구성</p>
          <p className="text-gray-600 pl-8">
            &middot; 하나의 헤더와 다수의 작업 레코드들로 구성된다.
          </p>
          <p className="text-gray-600 pl-8">
            &middot; 마지막 레코드가 페이지를 넘어가면 다음 페이지에 이어서 기록된다.
          </p>
          <br />
          <p className="text-gray-800 text-md pl-4">
            * 페이지 헤더 : 페이지의 메타 데이터가 저장된다.
          </p>
          <p className="text-gray-600 pl-8">&middot; Magic Number : “RCRD” </p>
          <p className="text-gray-600 pl-8">
            &middot; Last LSN : 페이지를 넘어가는 레코드를 포함해서 가장 큰 LSN
          </p>
          <p className="text-gray-600 pl-8">
            &middot; Next Record Offset : Last LSN에 해당하는 레코드의 페이지 내 Offset
          </p>
          <p className="text-gray-600 pl-8">
            &middot; Last End LSN : 페이지를 넘어가지 않는 레코드들 중에 가장 큰 LSN
          </p>
          <br />
        </div>
        <h1 className="text-5xl font-bold pt-40">작업 레코드 구조</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <NextImage width={779} height={186} loading="lazy" src="/images/logfile/record.png" />

          <p className="text-gray-800 text-md pl-4">* 실제 트랜젝션 작업의 내용이 기록된다.</p>
          <br />
          <p className="text-gray-800 text-md pl-4">
            * 여러 작업 레코드가 순차적으로 모여서 하나의 트랜젝션 작업을 이룬다.
          </p>
          <p className="text-gray-600 pl-8">&middot; Check Point Record : 트랜젝션 시작 레코드 </p>
          <p className="text-gray-600 pl-8">&middot; Update Record : 중간 작업 레코드 </p>
          <p className="text-gray-600 pl-8">&middot; Commit Record : 트랜젝션 마지막 레코드</p>
          <br />
          <p className="text-gray-800 text-md pl-4">
            * Check Point Record 외 레코드들은 자신의 이전 작업 레코드의 LSN을 가지고 있다.
          </p>
        </div>
        <h1 className="text-5xl font-bold pt-40">작업 레코드 헤더 포멧</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <NextImage width={777} height={249} loading="lazy" src="/images/logfile/header.png" />

          <p className="text-gray-800 text-md pl-4">
            * Check Point Record 외 레코드들은 자신의 이전 작업 레코드의 LSN을 가지고 있다.
          </p>
          <br />
          <p className="text-gray-800 text-md pl-4">
            * LCNs to Follows : 0x01(이어지는 레코드가 있음), 0x00(이어지는 레코드가 없다.)
          </p>
          <br />
          <p className="text-gray-800 text-md pl-4">* Record Offset </p>
          <p className="text-gray-600 pl-8">
            &middot; MFT 레코드에 대한 작업일 경우, Redo/Undo 데이터가 적용되는 속성의 MFT 레코드 내
            Offset
          </p>
          <p className="text-gray-600 pl-8">
            &middot; MFT 레코드에 대한 작업이 아닌 경우, 값은 0x00
          </p>
          <br />
          <p className="text-gray-800 text-md pl-4">* Attr Offset </p>
          <p className="text-gray-600 pl-8">
            &middot; MFT 레코드에 대한 작업일 경우, Redo/Undo 데이터가 적용되는 속성 내 Offset
          </p>
          <p className="text-gray-600 pl-8">
            &middot; MFT 레코드에 대한 작업이 아닌 경우, Redo/Undo 데이터가 적용되는 클러스터 내
            Offset
          </p>
          <br />
          <p className="text-gray-800 text-md pl-4">
            * Taret LCN : Redo/Undo 데이터가 적용되는 디스크 상의 LCN(Logical Cluster Number)
          </p>
          <br />
          <p className="text-gray-800 text-md pl-4">
            * MFT Cluster Index : MFT 엔트리가 있는 하나의 클러스터 내에서 몇 번째 엔트리에
            해당하는지에 대한 값
          </p>
          <p className="text-gray-600 pl-8">
            &middot; 1번째(0x0000), 2번째(0x0002), 3번째(0x0003), 4번째(0x0006)
          </p>
          <br />
        </div>
      </div>

      {h1Element && (
        <div>
          <div className="sticky top-10 pl-8">
            <p className="text-3xl font-semibold text-left w-80">LogFile</p>
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
