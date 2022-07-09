import { useRef, useState } from 'react';
import FaqsCard, {Faq} from './FaqsCard';
import * as Accordion from '@radix-ui/react-accordion';

export type Props = {
  idx: number;
  faqsList: Faq;
};

const faqsList = [
  {
    q: "What are some random questions to ask?",
    a: "That's exactly the reason we created this random question generator. There are hundreds of random questions to choose from so you're able to find the perfect random question."
  },
  {
    q: "Do you include common questions?",
    a: "This generator doesn't include most common questions. The thought is that you can come up with common questions on your own so most of the questions in this generator."
  },
  {
    q: "Can I use this for 21 questions?",
    a: "Yes! there are two ways that you can use this question generator depending on what you're after. You can indicate that you want 21 questions generated."
  },
  {
    q: "Are these questions for girls or for boys?",
    a: "The questions in this generator are gender neutral and can be used to ask either male of females (or any other gender the person identifies with)."
  },
  {
    q: "What do you wish you had more talent doing?",
    a: "If you've been searching for a way to get random questions, you've landed on the correct webpage. We created the Random Question Generator to ask you as many random questions as your heart desires."
  }
]

export default function FaqsList(props: Props) {

  return (
    <section className="px-4 mx-auto mt-12 leading-relaxed max-w-screen-xl lg:px-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-semibold text-gray-800">
          Frequently Asked Questions
        </h1>
        <p className="max-w-lg mx-auto text-lg text-gray-600">
          Answered all frequently asked questions, Still confused? feel free to contact us.
        </p>
      </div>
      <div className="max-w-2xl mx-auto mt-14">
        <Accordion.Root>
          <Accordion.Item>
            <Accordion.Header>
              <Accordion.Trigger />
            </Accordion.Header>
            <Accordion.Content />
          </Accordion.Item>
        </Accordion.Root>
        {
          faqsList.map((item, idx) => (
            <FaqsCard
              idx={idx}
              faq={item}
            />
          ))
        }
      </div>
    </section>
}
