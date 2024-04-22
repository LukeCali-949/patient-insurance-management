import React, { useState } from "react";

const faqs = [
  {
    question: "What does MediApp do?",
    answer:
      "The short answer is MediApp matches Doctors with patients with insurers. But we do much more, from personalized recomendations to chatbots, MediApp has you covered for all your needs!",
  },
  {
    question: "How can patients get matched with insurers?",
    answer:
      "You can claim your health insurance as soon as you have a valid medical reason and your policy is active and in force.",
  },
  {
    question: "Does MediApp cost money to use?",
    answer: "Nope, totally free!",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="p-[60px]  tracking-tight leading-none  text-white bg-gray-900">
      <h2 className="text-2xl  mb-4 font-extrabold tracking-tight leading-none  text-white">
        Frequently Asked Questions
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full py-3 text-left"
            >
              <span className="font-medium">{faq.question}</span>
              <span>{activeIndex === index ? "▼" : "►"}</span>
            </button>
            {activeIndex === index && (
              <div className="pb-3  tracking-tight leading-none  text-gray-400">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
