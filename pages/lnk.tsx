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
        <h1 className="text-5xl font-bold">LNK File 이란?</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <p className="pt-8 text-xl text-gray-800 font-medium">
            LNK File은 Shell Link나 Shortcut이라고 불리는 Link File 구조체 라고도 이야기를 하는데
            다른 데이터들의 접근하는데에 필요한 정보를 가지고있는 데이터 입니다. Shell Link Binary
            File Format은 확장자가 .LNK 인 윈도우 파일 포맷 입니다. Shell Link는 보통 응용프로그램을
            실행하거나 OLE 같은 시나리오를 Linking을 제공하기 위해서 사용하는것 뿐만아니라 파일에
            대해 참조를 저장하는 기능을 필요로 하는 애플리케이션에 사용할 수도 있습니다.
          </p>
        </div>
        <h1 className="text-5xl font-bold pt-40">LNK 파일의 포렌식적 의미</h1>
        <div className="pt-8 text-xl font-medium space-y-2">
          <p className="pt-8 text-xl text-gray-800 font-medium">
            LNK 파일이라고 하면 특정 응용프로그램을 설치했을 때 바탕화면에 자동으로 생성되거나,
            사용자가 편의를 위해 바로가기를 생성했을 때 생기는 파일을 떠올릴 수 있다. 하지만,
            바탕화면(Desktop) 외에도 최근 문서 폴더(Recent), 시작프로그램(Start),
            빠른실행(QuickLaunch) 등 다양한 곳에서 수동 혹은 자동으로 생성되어 저장된다. 다음은 LNK
            파일이 존재하는 폴더의 위치를 윈도우 버전별로 살펴본 것이다. 아래 폴더 외에도 각
            운영체제별로 LNK 파일이 생성되는 폴더는 다양하다.
          </p>
          <br />

          <p className="text-gray-800 text-md pl-4">* 바탕화면(Desktop) 폴더</p>
          <p className="text-gray-600 pl-8">
            &middot; Windows XP : C:\Documents and Settings\`user name`\Desktop
          </p>
          <p className="text-gray-600 pl-8">&middot; Windows 7 : C:\Users\`user name`\Desktop</p>
          <br />
          <p className="text-gray-800 text-md pl-4">* 최근문서(Recent) 폴더</p>
          <p className="text-gray-600 pl-8">
            &middot; Windows XP : : C:\Documents and Settings\`user name`\Recent
          </p>
          <p className="text-gray-600 pl-8">
            &middot; Windows 7 : C:\Users`user name`\AppData\Roaming\Microsoft\Windows\Recent
          </p>
          <br />
          <p className="text-gray-800 text-md pl-4">* 시작프로그램(Start) 폴더</p>
          <p className="text-gray-600 pl-8">
            &middot; Windows XP : C:\Documents and Settings\`user name`\Start Menu\Programs
          </p>
          <p className="text-gray-600 pl-8">
            &middot; Windows 7 : C:\Users\`user name`\AppData\Roaming\Microsoft\Windows\Start
          </p>
          <br />
          <p className="text-gray-800 text-md pl-4">* 빠른실행(QuickLaunch) 폴더</p>
          <p className="text-gray-600 pl-8">
            &middot; Windows XP : C:\DocumentsandSettings\`user name`\Application
            Data\Microsoft\Internet Explorer\Quick Launch
          </p>
          <p className="text-gray-600 pl-8">
            &middot; Windows 7 : C:\Users\`user name`\AppData\Roaming\Microsoft\Internet
            Explorer\Quick Launch
          </p>
          <br />
        </div>

        <h1 className="text-5xl font-bold pt-40">LNK File Format</h1>
        <div className="pt-8 text-xl text-gray-800 font-medium space-y-2">
          <p className="pt-8 text-xl text-gray-800 font-medium">
            Shell Link Binary File Format의 구조를 보면 아래와 같습니다. 기본적으로 5개의 구조체로
            이루어져 있는데, 각각의 Link File 마다 다다르게 존재합니다.
          </p>
          <NextImage width={773} height={297} loading="lazy" src="/images/lnk/file-format.png" />
          <br />
        </div>

        <h1 className="text-5xl font-bold pt-40">ShellLinkHeader</h1>
        <div className="pt-8 text-xl text-gray-800 font-medium space-y-2">
          <p className="pt-8 text-xl text-gray-800 font-medium">
            ShellLinkHeader 구조는 앞서 이야기한 ShellTargerlDList, LinkInfo, StringData 를 포함하고
            있는 식별 정보 및 타임스태프 등 여러 데이터가 명시된 데이터를 포함하고 있습니다. 010
            editor 에서도 확인할 수 있지만 ShellLinkHeader의 세부 데이터 설명은 아래와 같습니다.
          </p>
          <NextImage
            width={850}
            height={717}
            loading="lazy"
            src="/images/lnk/shelllinkheader.png"
          />
          <br />
        </div>

        <h1 className="text-5xl font-bold pt-40">LnkTargetIDList</h1>
        <div className="pt-8 text-xl text-gray-800 font-medium space-y-2">
          <p className="pt-8 text-xl text-gray-800 font-medium">
            LnkTargetIDList 구조체는 대상의 링크를 명시하고 있습니다. 이 구조체는
            ShellLinkHeader안에 HasLinkTargetIDList bit에 의해서 지정이 된다.
          </p>
          <NextImage width={848} height={160} loading="lazy" src="/images/lnk/lnktarget1.png" />
          <br />
          <p className="pt-8 text-xl text-gray-800 font-medium">
            또한 지정된 IDList 구조체는 itemID로 구성되어 있으며 아래와 같은 구조로
            구성되어있습니다.
          </p>
          <NextImage width={849} height={154} loading="lazy" src="/images/lnk/lnktarget2.png" />
          <br />
          <p className="text-gray-800 text-md pl-4">* GUID CLSID 값이란?</p>
          <p className="text-gray-600 pl-8">
            &middot; COM 클래스 개체를 식별하기 위해서 사용하는 식별자를 이야기 합니다.
          </p>
          <p className="text-gray-600 pl-8">&middot; CLSID 레지스트리에 저장이 되어 있습니다.</p>
          <br />
          <a
            href="https://www.tabmode.com/windows10/clsid-key-list.html"
            className="text-gray-600 pl-8 mt-4 hover:underline hover:opacity-80"
          >
            CLSID의 단축키 목록
          </a>
          <br />
        </div>

        <h1 className="text-5xl font-bold pt-40">LinkInfo</h1>
        <div className="pt-8 text-xl text-gray-800 font-medium space-y-2">
          <p className="pt-8 text-xl text-gray-800 font-medium">
            LinkInfo 구조체는 링크의 원본 위치를 찾지 못 했을 때 해결하기 위해서 필수적인 정보를
            명시합니다. 링크가 생성 되었을 때 존재하는 원본 파일의 저장된 볼륨과 매핑된 드라이브
            문자 및 UNK(Universal Naming Convention) 형식의 경로가 저장된 볼륨에 대한 정보를
            포함하고 있습니다. 한번 표로 구조를 표시해 보겠습니다.
          </p>
          <NextImage width={765} height={753} loading="lazy" src="/images/lnk/linkinfo.png" />
          <br />
          <p className="pt-8 text-xl text-gray-800 font-medium">
            VolumeID 구조를 한번 확인해 보겠습니다.
          </p>
          <NextImage width={776} height={342} loading="lazy" src="/images/lnk/volumeid.png" />
          <br />
          <p className="pt-8 text-xl text-gray-800 font-medium">
            마지막으로 DriveType에 대해서 알아 보겠습니다.
          </p>
          <NextImage width={765} height={384} loading="lazy" src="/images/lnk/drivetype.png" />
          <br />
        </div>
      </div>

      {h1Element && (
        <div>
          <div className="sticky top-10 pl-8">
            <p className="text-3xl font-semibold text-left w-80">Lnk</p>
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
