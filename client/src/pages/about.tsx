import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as Tabs from '@radix-ui/react-tabs';

const faqsList = [
  {
    question: 'What are some random questions to ask?',
    answer:
      "That's exactly the reason we created this random question generator. There are hundreds of random questions to choose from so you're able to find the perfect random question.",
  },
  {
    question: 'Do you include common questions?',
    answer:
      "This generator doesn't include most common questions. The thought is that you can come up with common questions on your own so most of the questions in this generator.",
  },
  {
    question: 'Can I use this for 21 questions?',
    answer:
      "Yes! there are two ways that you can use this question generator depending on what you're after. You can indicate that you want 21 questions generated.",
  },
  {
    question: 'Are these questions for girls or for boys?',
    answer:
      'The questions in this generator are gender neutral and can be used to ask either male of females (or any other gender the person identifies with).',
  },
  {
    question: 'What do you wish you had more talent doing?',
    answer:
      "If you've been searching for a way to get random questions, you've landed on the correct webpage. We created the Random Question Generator to ask you as many random questions as your heart desires.",
  },
];

export default function About() {
  return (
    <div>
      <Tabs.Root>
        <Tabs.List>
          <Tabs.Trigger>The Park</Tabs.Trigger>
          <Tabs.Trigger>The Company</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content />
      </Tabs.Root>
      <section className="px-4 mx-auto mt-12 leading-relaxed max-w-screen-xl lg:px-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-semibold text-gray-200">Frequently Asked Questions</h1>
          <p className="max-w-lg mx-auto text-lg text-gray-400">
            Answered all frequently asked questions, Still confused? feel free to contact us.
          </p>
        </div>
        <div className="max-w-2xl mx-auto mt-14">
          <Accordion.Root type="single" defaultValue="item-0" collapsible>
            {faqsList.map(({ question, answer }, idx) => (
              <Accordion.Item
                value={`item-${idx}`}
                className="pb-5 mt-5 overflow-hidden border-b border-gray-700 space-y-3"
              >
                <Accordion.Header className="flex items-center justify-between text-lg font-medium text-gray-300 cursor-pointer">
                  <Accordion.Trigger className="group">
                    {question}
                    <ChevronDownIcon
                      aria-hidden
                      className="inline duration-300 group-radix-state-open:rotate-180"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="text-gray-400 duration-300">
                  {answer}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>
    </div>
  );
}
