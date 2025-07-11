# React Todo App 개발 계획서

## 프로젝트 계획

**목표**: React + shadcn/ui를 사용한 기본적인 Todo List 애플리케이션 개발

**주요 기능**:
- 할 일 추가/삭제
- 완료 상태 토글
- 할 일 목록 표시
- 간단한 필터링 (전체/완료/미완료)

## 개발 순서

### 1단계: 환경 설정 및 기본 구조 ✅
- [x] React 프로젝트 생성 (Vite)
- [x] shadcn/ui 라이브러리 설치
- [x] 기본 컴포넌트 구조 설계
- [x] CSS 스타일링 (Tailwind CSS)

### 2단계: 기본 상태 관리
- [ ] useState로 할 일 목록 상태 관리
- [ ] 할 일 데이터 구조 설계 (id, text, completed)
- [ ] 기본 CRUD 함수들 구현

### 3단계: 할 일 추가 기능
- [ ] 입력 폼 컴포넌트 만들기
- [ ] shadcn/ui의 Input 컴포넌트 사용
- [ ] 할 일 추가 함수 구현
- [ ] 빈 입력 방지 로직

### 4단계: 할 일 목록 표시
- [ ] TodoItem 컴포넌트 생성
- [ ] shadcn/ui의 Checkbox 컴포넌트 사용
- [ ] 할 일 목록 렌더링
- [ ] 완료된 할 일 스타일링

### 5단계: 완료 상태 토글
- [ ] 체크박스 클릭 시 완료 상태 변경
- [ ] 완료된 할 일 시각적 구분 (취소선 등)

### 6단계: 할 일 삭제 기능
- [ ] 삭제 버튼 추가
- [ ] shadcn/ui의 Button 또는 AlertDialog 사용
- [ ] 삭제 확인 모달 (선택사항)

### 7단계: 필터링 기능
- [ ] 전체/완료/미완료 필터 버튼
- [ ] shadcn/ui의 Tabs 또는 ToggleGroup 사용
- [ ] 필터에 따른 할 일 목록 표시

### 8단계: UI 개선 및 완성도 높이기
- [ ] 반응형 디자인 적용
- [ ] 애니메이션 효과 추가
- [ ] 접근성 개선
- [ ] 빈 상태 처리 (할 일이 없을 때)

## 사용할 shadcn/ui 컴포넌트

| 컴포넌트 | 용도 | 설치 명령어 |
|---------|------|------------|
| **Checkbox** | 완료 상태 토글 | `pnpm dlx shadcn@latest add checkbox` |
| **Button** | 추가/삭제 버튼 | `pnpm dlx shadcn@latest add button` |
| **Input** | 할 일 입력 | `pnpm dlx shadcn@latest add input` |
| **Dialog** | 삭제 확인 모달 | `pnpm dlx shadcn@latest add dialog` |
| **Tabs** | 필터링 탭 | `pnpm dlx shadcn@latest add tabs` |
| **Label** | 폼 라벨 | `pnpm dlx shadcn@latest add label` |
| **Separator** | 시각적 구분선 | `pnpm dlx shadcn@latest add separator` |

## 초보자를 위한 팁

1. **한 번에 하나씩**: 각 단계를 완전히 완성한 후 다음 단계로 진행
2. **콘솔 확인**: 개발자 도구를 자주 확인하여 오류 체크
3. **컴포넌트 분리**: 기능별로 컴포넌트를 나누어 관리
4. **상태 관리**: 복잡해지면 useReducer 고려
5. **문서 참고**: shadcn/ui 공식 문서 적극 활용

## 기술 스택

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Library**: shadcn/ui (Radix UI 기반)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 프로젝트 구조 (예상)

```
src/
├── components/
│   ├── ui/              # shadcn/ui 컴포넌트들
│   ├── TodoApp.tsx      # 메인 Todo 앱 컴포넌트
│   ├── TodoItem.tsx     # 개별 할 일 아이템
│   ├── TodoForm.tsx     # 할 일 추가 폼
│   └── TodoFilter.tsx   # 필터링 컴포넌트
├── types/
│   └── todo.ts          # Todo 관련 타입 정의
├── hooks/
│   └── useTodos.ts      # Todo 관련 커스텀 훅 (선택사항)
└── lib/
    └── utils.ts         # 유틸리티 함수들
```

## 다음 단계

**2단계: 기본 상태 관리**부터 시작하여 차근차근 Todo 앱을 완성해보세요!

## 2단계 상세 가이드: 기본 상태 관리

### 🎯 핵심 개념 이해하기

**useState가 뭔가요?**
- React에서 데이터를 저장하고 변경할 수 있게 해주는 도구
- 마치 메모장에 할 일을 적고 지우는 것과 같아요

**데이터 구조 설계**
- 할 일 하나하나를 어떤 정보로 표현할지 생각해보세요
- 예: 할 일 내용, 완료했는지 여부, 구분할 수 있는 번호

### 💡 학습 팁

#### 1. 작은 것부터 시작하세요
- 처음엔 할 일 1개만 저장해보기
- 그 다음에 여러 개 저장하는 방법 생각하기

#### 2. 종이에 먼저 그려보세요
- 할 일이 어떤 모양인지 그려보기
- 추가/삭제/수정할 때 어떻게 변하는지 그려보기

#### 3. 콘솔로 확인하기
- `console.log()`로 데이터가 어떻게 생겼는지 확인
- 버튼 클릭할 때마다 데이터가 어떻게 변하는지 보기

#### 4. 단계별로 천천히
1. 빈 배열로 시작
2. 할 일 1개 추가해보기
3. 여러 개 추가해보기
4. 삭제해보기
5. 수정해보기

### 🔍 스스로 질문해보기

- "할 일을 구분하려면 뭐가 필요할까?"
- "완료 상태를 어떻게 표현할까?"
- "새로운 할 일을 어떻게 추가할까?"
- "기존 할 일을 어떻게 찾을까?"

### 📚 참고하면 좋은 것들

- React 공식 문서의 useState 예제
- 간단한 카운터 예제부터 이해하기
- 배열 다루는 JavaScript 기본 메서드들

### 🎨 Todo 데이터 구조 예시

```typescript
// 할 일 하나의 모양
interface Todo {
  id: number;          // 구분하기 위한 고유 번호
  text: string;        // 할 일 내용
  completed: boolean;  // 완료 여부 (true/false)
}

// 할 일 목록 (배열)
const todos = [
  { id: 1, text: "리액트 공부하기", completed: false },
  { id: 2, text: "운동하기", completed: true },
  { id: 3, text: "저녁 먹기", completed: false }
];
```