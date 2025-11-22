'use client';

import React, { useState } from 'react';

// Step 컴포넌트가 받을 Props 타입 정의
interface StepProps<T> {
  name: T;
  children: React.ReactNode;
}

// Funnel 컴포넌트가 받을 Props 타입 정의
interface FunnelProps {
  children: React.ReactNode;
}

export const useFunnel = <T extends string>(steps: readonly T[]) => {
  // steps[0]을 초기값으로 사용
  const [step, setStep] = useState<T>(steps[0]);

  // 1. Step 컴포넌트
  // 제네릭 T를 사용하여 name이 steps 배열에 있는 문자열인지 체크합니다.
  const Step = (props: StepProps<T>) => {
    return React.createElement(React.Fragment, null, props.children);
  };

  // 2. Funnel 컴포넌트
  const FunnelComponent = ({ children }: FunnelProps) => {
    const targetStep = React.Children.toArray(children).find(child => {
      // React 엘리먼트인지 확인
      if (!React.isValidElement(child)) return false;

      // 여기가 핵심: child를 특정 Props를 가진 엘리먼트로 간주합니다.
      // any 대신 구체적인 타입을 지정합니다.
      const element = child as React.ReactElement<StepProps<T>>;

      return element.props.name === step;
    });

    return targetStep || null;
  };

  // Object.assign으로 합치기
  const Funnel = Object.assign(FunnelComponent, { Step });

  // step 상태까지 반환하여 외부에서 현재 단계를 알 수 있게 함
  return [Funnel, setStep, step] as const;
};
