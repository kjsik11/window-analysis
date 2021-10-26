import { useCallback, useState } from 'react';

import { useUI } from '@components/context';
import { UserLayout } from '@components/layout';
import { Button } from '@components/ui';
import Input from '@components/ui/Input';
import TextArea from '@components/ui/TextArea';

import { initialFeedbackInput, FeedbackInput } from 'types/feedback';

export default function FeedbackPage() {
  const [feedbackInputs, setFeedbackInputs] = useState<FeedbackInput>(initialFeedbackInput);
  const [loading, setLoading] = useState(false);

  const { showNoti } = useUI();

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      showNoti({ title: '전송 성공', content: '피드백이 성공적으로 전달되었습니다.' });

      setFeedbackInputs(initialFeedbackInput);
    } catch (err) {
      showNoti({ title: 'Submit Error', variant: 'alert', content: err.message });
    } finally {
      setLoading(false);
    }
  }, [showNoti]);

  return (
    <div className="py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-12">
      <div className="relative max-w-xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Feedback
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Window Artifacts Analysis 사용에 있어
            <br className="hidden sm:block" />
            불편한 사항 혹은 건의사항이 있다면 피드백 부탁드립니다.
          </p>
        </div>
        <div className="mt-12 space-y-4">
          <div>
            <div className="mt-1">
              <Input
                label="이름"
                placeholder="홍길등"
                value={feedbackInputs.name}
                onChange={(e) => {
                  setFeedbackInputs((prev) => ({ ...prev, name: e.target.value }));
                }}
                className="py-3 px-4 block w-full shadow-sm focus:ring-lightBlue-400 focus:border-lightBlue-400 border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <div className="mt-1">
              <Input
                label="소속"
                placeholder="중부대학교 정보보호학과"
                value={feedbackInputs.organization}
                onChange={(e) => {
                  setFeedbackInputs((prev) => ({ ...prev, organization: e.target.value }));
                }}
                autoComplete="organization"
                className="py-3 px-4 block w-full shadow-sm focus:ring-lightBlue-400 focus:border-lightBlue-400 border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <div className="mt-1">
              <Input
                label="이메일"
                placeholder="example@naver.com"
                value={feedbackInputs.email}
                onChange={(e) => {
                  setFeedbackInputs((prev) => ({ ...prev, email: e.target.value }));
                }}
                autoComplete="email"
                className="py-3 px-4 block w-full shadow-sm focus:ring-lightBlue-500 focus:border-lightBlue-500 border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <div className="mt-1">
              <TextArea
                label="Message (*)은 필수 입력사항"
                id="message"
                rows={4}
                value={feedbackInputs.message}
                onChange={(e) => {
                  setFeedbackInputs((prev) => ({ ...prev, message: e.target.value }));
                }}
                className="py-3 px-4 block w-full shadow-sm focus:ring-lightBlue-400 focus:border-lightBlue-400 border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="mt-4">
            <Button
              onClick={() => {
                handleSubmit();
              }}
              disabled={
                loading ||
                !feedbackInputs.email ||
                !feedbackInputs.name ||
                !feedbackInputs.organization ||
                !feedbackInputs.message
              }
              full
            >
              전송하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

FeedbackPage.Layout = UserLayout;
