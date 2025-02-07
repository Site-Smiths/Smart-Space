import React from 'react';

const reviews = [
  {
    id: 1,
    name: 'Emily Johnson',
    feedback: 'SMARTSPACE connected me with an amazing mentor who helped me land my dream job!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    name: 'Michael Smith',
    feedback: 'The guidance and advice I received here have been invaluable for my career growth.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 3,
    name: 'Sarah Brown',
    feedback: 'I love how easy it is to find mentors who are genuinely interested in helping students!',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  }
];

const ReviewSection = () => {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
              <img src={review.avatar} alt={review.name} className="w-16 h-16 mx-auto rounded-full mb-4" />
              <h3 className="text-xl font-semibold">{review.name}</h3>
              <p className="text-gray-600 mt-2">{review.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
