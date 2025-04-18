'use client';
import { type NextPage } from 'next';

// export const animals = [
//   { label: 'Cat', key: 'cat', description: 'The second most popular pet in the world' },
//   { label: 'Dog', key: 'dog', description: 'The most popular pet in the world' },
//   { label: 'Elephant', key: 'elephant', description: 'The largest land animal' },
//   { label: 'Lion', key: 'lion', description: 'The king of the jungle' },
//   { label: 'Tiger', key: 'tiger', description: 'The largest cat species' },
//   { label: 'Giraffe', key: 'giraffe', description: 'The tallest land animal' },
//   {
//     label: 'Dolphin',
//     key: 'dolphin',
//     description: 'A widely distributed and diverse group of aquatic mammals',
//   },
//   { label: 'Penguin', key: 'penguin', description: 'A group of aquatic flightless birds' },
//   { label: 'Zebra', key: 'zebra', description: 'A several species of African equids' },
//   {
//     label: 'Shark',
//     key: 'shark',
//     description: 'A group of elasmobranch fish characterized by a cartilaginous skeleton',
//   },
//   {
//     label: 'Whale',
//     key: 'whale',
//     description: 'Diverse group of fully aquatic placental marine mammals',
//   },
//   { label: 'Otter', key: 'otter', description: 'A carnivorous mammal in the subfamily Lutrinae' },
//   { label: 'Crocodile', key: 'crocodile', description: 'A large semiaquatic reptile' },
// ];

const PageFor: NextPage<NextPageProps> = ({}) => {
  return (
    <div className="h-[1000px] pt-56">
      {/* <Select
        id="some_id"
        showScrollIndicators={true}
        className="max-w-xs overflow-y-auto"
        // defaultItems={animals}
        // defaultSelectedKey="cat"
        label="Favorite Animal"
        placeholder="Search an animal"
        scrollShadowProps={{
          isEnabled: true,
        }}
      >
        {animals.map(item => {
          return <SelectItem key={item.key}>{item.label}</SelectItem>;
        })}
      </Select> */}
    </div>
  );
};

export default PageFor;
