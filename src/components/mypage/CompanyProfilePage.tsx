import { ChevronLeft, Settings, Share2, MapPin, Mail, Bookmark } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { Applicant } from '@/types/company';

export function CompanyProfilePage() {
  const mockApplicants: Applicant[] = [
    {
      id: '1',
      name: '김민수',
      position: '프론트엔드 개발자',
      avatar: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=200&h=200&fit=crop',
      skills: ['React', 'TypeScript', 'Next.js'],
      experience: '3년',
      location: '서울',
    },
    {
      id: '2',
      name: '이서연',
      position: 'UI/UX 디자이너',
      avatar: 'https://images.unsplash.com/photo-1762341120638-b5b9358ef571?w=200&h=200&fit=crop',
      skills: ['Figma', 'Sketch', 'Prototyping'],
      experience: '5년',
      location: '서울',
    },
    {
      id: '3',
      name: '박준호',
      position: '백엔드 개발자',
      avatar: 'https://images.unsplash.com/photo-1718179804654-7c3720b78e67?w=200&h=200&fit=crop',
      skills: ['Node.js', 'Python', 'AWS'],
      experience: '4년',
      location: '경기',
    },
    {
      id: '4',
      name: '최지우',
      position: '풀스택 개발자',
      avatar: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=200&h=200&fit=crop',
      skills: ['React', 'Node.js', 'MongoDB'],
      experience: '2년',
      location: '서울',
    },
    {
      id: '5',
      name: '정수진',
      position: '프로덕트 매니저',
      avatar: 'https://images.unsplash.com/photo-1762341120638-b5b9358ef571?w=200&h=200&fit=crop',
      skills: ['Agile', 'Jira', 'Product Strategy'],
      experience: '6년',
      location: '서울',
    },
  ];

  return (
    <>
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button className="p-1 -ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-extrabold text-gray-900">프로필</h1>
        <button className="p-1 -mr-2">
          <Settings className="w-6 h-6 text-gray-800" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* 프로필 정보 영역 */}
        <section className="px-4 pt-6 pb-4">
          {/* Company Info */}
          <div className="flex items-center justify-between mb-4">
            {/* 아바타 */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-gray-200">
              <Avatar className="h-full w-full rounded-full">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop"
                  alt="테크 스타트업"
                />
                <AvatarFallback className="rounded-full bg-primary text-primary-foreground">
                  TS
                </AvatarFallback>
              </Avatar>
            </div>

            {/* 스탯 (채용공고, 팔로워, 북마크) */}
            <div className="flex flex-1 justify-around ml-4 text-center">
              <div className="flex flex-col">
                <span className="font-bold text-lg text-gray-900">42</span>
                <span className="text-xs text-gray-500">채용공고</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-gray-900">1.2K</span>
                <span className="text-xs text-gray-500">팔로워</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-gray-900">{mockApplicants.length}</span>
                <span className="text-xs text-gray-500">북마크</span>
              </div>
            </div>
          </div>

          {/* 회사 이름 및 소개 */}
          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-900">테크 스타트업</h2>
            <p className="text-sm text-gray-500 mb-2">@techstartup_kr</p>
            <div className="text-sm text-gray-800 space-y-0.5">
              <p>혁신적인 기술로 더 나은 세상을 만듭니다</p>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-3 h-3 text-red-500" />
                <span>서울시 강남구 테헤란로</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Mail className="w-3 h-3 text-red-400" />
                <span>비즈니스 문의: recruit@techstartup.com</span>
              </div>
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex items-center gap-2">
            <button className="flex-1 bg-gray-50 border border-gray-200 rounded-lg py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
              프로필 편집
            </button>
            <button className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
              <Share2 className="w-5 h-5 text-gray-800" />
            </button>
            <button className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        </section>

        {/* 북마크한 지원자 섹션 */}
        <section className="px-4 pb-4">
          <div className="flex items-center gap-2 mb-4">
            <Bookmark className="h-5 w-5 text-gray-900" />
            <h2 className="text-lg font-bold text-gray-900">북마크한 지원자</h2>
          </div>

          <div className="space-y-3">
            {mockApplicants.map(applicant => (
              <div
                key={applicant.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-gray-200">
                    <Avatar className="h-full w-full rounded-full">
                      <AvatarImage src={applicant.avatar} alt={applicant.name} />
                      <AvatarFallback className="rounded-full">
                        {applicant.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{applicant.name}</h3>
                        <p className="text-sm text-gray-500">{applicant.position}</p>
                      </div>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0">
                        <Bookmark className="h-4 w-4 text-gray-800 fill-gray-800" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {applicant.skills.map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>경력 {applicant.experience}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {applicant.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <button className="flex-1 bg-gray-50 border border-gray-200 rounded-lg py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
                    프로필 보기
                  </button>
                  <button className="flex-1 bg-gray-50 border border-gray-200 rounded-lg py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
                    메시지 보내기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
