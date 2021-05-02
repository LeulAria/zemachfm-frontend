import { FC } from 'react';
import { storyIndex } from './index.d';
import StoryCard from './storyCard';

const OurStory: FC<storyIndex> = ({ story }) => {
  const { storyLine, cards, numberOfCards } = story;
  const { title, description } = storyLine;
  const colors = [
    'text-green-500',
    'text-indigo-500',
    'text-yellow-500',
    'text-red-500',
  ];

  return (
    <div id="our-story">
      <h1 className=" text-6xl font-bold mt-8 mb-4 "> {title} </h1>
      <div
        className="text-gray-400 mb-5 "
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
      <div className={`grid gap-6 grid-cols-${numberOfCards}`}>
        {cards
          ? cards.map((card, index) =>
              card.title ? (
                <StoryCard
                  color={colors[index]}
                  description={card.description}
                  title={card.title}
                />
              ) : null,
            )
          : null}
      </div>
    </div>
  );
};
export default OurStory;