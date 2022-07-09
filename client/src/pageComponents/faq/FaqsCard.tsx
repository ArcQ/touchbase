import { useRef, useState } from 'react';
import tw from 'tailwind-styled-components';

export type Faq = {
  q: string;
  a: string;
};

export type Props = {
  idx: number;
  faq: Faq;
};

const FaqHeader = tw.h4`
  flex items-center justify-between pb-5 text-lg font-medium text-gray-700 cursor-pointer
`;

export default function FaqsCard(props: Props) {
  const answerElRef = useRef<HTMLDivElement>();
  const [state, setState] = useState(false);
  const [answerH, setAnswerH] = useState('0px');
  const { faq, idx } = props;

  const handleOpenAnswer = () => {
    if (answerElRef?.current) {
      const answerElH = answerElRef.current.offsetHeight;
      setState(!state);
      setAnswerH(`${answerElH + 20}px`);
    }
  };

  return (
    <div
      role="button"
      className="mt-5 overflow-hidden border-b space-y-3"
      key={idx}
      tabIndex={idx}
      onClick={handleOpenAnswer}
    >
      <FaqHeader>
        {faq.q}
        {state ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )}
      </FaqHeader>
      <div className="duration-300" style={state ? { height: answerH } : { height: '0px' }}>
        <div ref={answerElRef}>
          <p className="text-gray-500">{faq.a}</p>
        </div>
      </div>
    </div>
  );
}
