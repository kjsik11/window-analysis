// icons
import Git from '@components/icons/Git';
import Insta from '@components/icons/Insta';
import { UserLayout } from '@components/layout';
import { Link } from '@components/ui';

const teamItems = [
  {
    name: '지창환',
    description: '개발 총괄',
    url: '/',
    insta: 'https://www.instagram.com/hwan.j95',
    git: 'https://github.com/hwans95',
  },
  {
    name: '김종식',
    description: '웹 개발',
    url: '/',
    insta: 'https://www.instagram.com/kjjjongsk',
    git: 'https://github.com/kjsik11',
  },
  {
    name: '최예지',
    description: 'Artifacts 분석 및 개발',
    url: '/',
    insta: 'https://www.instagram.com/kongji_s',
    git: 'https://github.com/choikongji',
  },
  {
    name: '염정현',
    description: 'Artifacts 분석 및 개발',
    url: '/',
    insta: '',
    git: 'https://github.com/yeom0331',
  },
];

export default function TeamPage() {
  return (
    <div className="pt-4 sm:pt-8 md:pt-12 pb-32 px-6 md:px-8 lg:px-12 max-w-screen-xl mx-auto ">
      <h2 className="text-3xl font-extrabold  tracking-tight sm:text-4xl">Meet our team</h2>

      <div className="pt-8">
        <div className="max-w-md mx-auto space-y-20 grid gap-5 lg:space-y-0 lg:grid-cols-2 lg:max-w-screen-md xl:gap-16">
          {teamItems.map((person) => (
            <div key={person.name}>
              <div className="space-y-4">
                <div className="aspect-w-3 aspect-h-2">
                  {/*eslint-disable-next-line */}
                  <img
                    className="object-cover shadow-lg rounded-lg"
                    src="/images/profile.webp"
                    alt=""
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-lg leading-6 font-medium space-y-1">
                    <h3>{person.name}</h3>
                    <p className="text-lightBlue-400">{person.description}</p>
                  </div>
                  <div className="flex space-x-5">
                    <div>
                      <Link href={person.git} className="text-gray-400 hover:text-gray-500">
                        <Git className="w-5 h-5 text-gray-800" />
                      </Link>
                    </div>
                    <div>
                      <Link href={person.insta} className="text-gray-400 hover:text-gray-500">
                        <Insta className="w-5 h-5 text-gray-800" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

TeamPage.Layout = UserLayout;
