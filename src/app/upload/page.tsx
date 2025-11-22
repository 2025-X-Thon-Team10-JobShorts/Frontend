'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  CheckCircle,
  ChevronLeft,
  Film,
  Loader2,
  Music,
  Image as ImageIcon,
} from 'lucide-react';
import { useFunnel } from '@/hooks/useFunnel';

export default function UploadPage() {
  // Funnel 정의 (총 3단계)
  const [Funnel, setStep, step] = useFunnel(['Select', 'Details', 'Uploading'] as const);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('video/')) {
      alert('동영상 파일만 선택해주세요!');
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setFile(selectedFile);
    setPreviewUrl(objectUrl);

    // 파일 선택 즉시 다음 단계(Details)로 이동
    setStep('Details');
  };

  // 업로드 로직
  const handleUpload = async () => {
    if (!file || !title.trim()) return;

    try {
      setStep('Uploading'); // 업로드 화면으로 전환
      setProgress(0);

      // 1. 백엔드에서 Presigned URL 발급 요청 (가상)
      console.log('Getting Presigned URL...');
      const uploadUrl = 'https://fake-s3-url.com/upload';
      await new Promise(r => setTimeout(r, 500));

      // 2. S3/R2로 실제 업로드 시뮬레이션
      console.log(`Uploading to ${uploadUrl}...`);
      for (let i = 0; i <= 100; i += 5) {
        setProgress(i);
        await new Promise(r => setTimeout(r, 50));
      }

      console.log('Upload Complete!');
    } catch (error) {
      console.error(error);
      alert('업로드 실패');
      setStep('Details');
    }
  };

  // 초기화
  const reset = () => {
    setFile(null);
    setPreviewUrl(null);
    setTitle('');
    setDescription('');
    setProgress(0);
    setStep('Select');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-black p-4">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 relative h-[800px] flex flex-col">
        {/* 헤더 */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-gray-100 bg-white z-10">
          {step === 'Select' ? (
            <span className="font-bold text-lg">Shorts 만들기</span>
          ) : step === 'Details' ? (
            <>
              <button onClick={reset} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <span className="font-semibold">세부 정보</span>
              <div className="w-10" />
            </>
          ) : (
            <span className="font-semibold mx-auto">업로드 중</span>
          )}
        </div>

        {/* Funnel 영역 */}
        <div className="flex-1 relative overflow-y-auto">
          <Funnel>
            <Funnel.Step name="Select">
              <div className="h-full flex flex-col">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 flex flex-col items-center justify-center m-4 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-red-400 transition-all cursor-pointer gap-4 group"
                >
                  <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-800">동영상 업로드</p>
                    <p className="text-sm text-gray-500 mt-2">클릭하여 갤러리 열기</p>
                  </div>
                </div>
                <div className="px-6 py-8 bg-white">
                  <h3 className="text-sm font-bold text-gray-900 mb-4">업로드 가이드</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Film size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">세로 영상 권장</p>
                        <p className="text-xs text-gray-500">9:16 비율의 영상이 가장 좋습니다.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                        <Music size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">저작권 주의</p>
                        <p className="text-xs text-gray-500">저작권 음원 사용 시 주의하세요.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                        <ImageIcon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">고화질 지원</p>
                        <p className="text-xs text-gray-500">최대 4K 해상도까지 지원합니다.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Funnel.Step>

            <Funnel.Step name="Details">
              <div className="flex flex-col h-full bg-white">
                <div className="w-full bg-black aspect-9/16 max-h-[400px] relative shrink-0">
                  {previewUrl && (
                    <video
                      src={previewUrl}
                      className="w-full h-full object-contain mx-auto"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  )}
                </div>
                <div className="p-5 space-y-6 flex-1">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">제목 (필수)</label>
                    <input
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="영상을 설명할 멋진 제목을 지어주세요"
                      className="w-full px-0 py-2 border-b border-gray-200 text-lg focus:border-black focus:outline-none bg-transparent placeholder:text-gray-300"
                      autoFocus
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">설명</label>
                    <textarea
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="#해시태그 #숏폼"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm focus:ring-1 focus:ring-black focus:outline-none resize-none"
                    />
                  </div>
                </div>
                <div className="p-4 border-t border-gray-100">
                  <button
                    onClick={handleUpload}
                    disabled={!title.trim()}
                    className="w-full py-3.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-red-200"
                  >
                    게시하기
                  </button>
                </div>
              </div>
            </Funnel.Step>

            <Funnel.Step name="Uploading">
              <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
                {progress < 100 ? (
                  <>
                    <div className="relative w-24 h-24">
                      <Loader2 className="w-full h-full text-red-500 animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">
                        {progress}%
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">영상을 게시 중입니다</h3>
                      <p className="text-gray-500 text-sm">창을 닫지 말고 잠시만 기다려주세요.</p>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden max-w-xs mx-auto">
                      <div
                        className="bg-red-500 h-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-2 animate-bounce">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gray-900">업로드 완료!</h3>
                      <p className="text-gray-500">성공적으로 Shorts가 게시되었습니다.</p>
                    </div>
                    <div className="w-full max-w-xs pt-4 space-y-3">
                      <button
                        onClick={reset}
                        className="w-full py-3 border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                      >
                        다른 영상 올리기
                      </button>
                      <button className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                        내 영상 보러가기
                      </button>
                    </div>
                  </>
                )}
              </div>
            </Funnel.Step>
          </Funnel>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="video/*"
          className="hidden"
        />
      </div>
    </div>
  );
}
