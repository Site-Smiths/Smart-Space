import React from 'react'
import { TopMentorsData } from '../data/TopMentorsData'
import MentorCard from '../components/MentorCard'

const TopMentors = () => {
  return (
    <div className="flex justify-center items-center flex-row flex-wrap gap-4 px-4 mb-6">
      {TopMentorsData.map((mentor, idx) => (
        <MentorCard
          key={idx}
          name={mentor.name}
          university={mentor.university}
          image={mentor.image}
          bio={mentor.bio}
          expertise={mentor.expertise}
          location={mentor.location}
          hourlyRate={mentor. hourlyRate}
        />
      ))}
    </div>
  )
}

export default TopMentors;