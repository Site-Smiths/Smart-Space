
import React from 'react'
import LogedIn from './LogedIn';

export default function Nav() {
  return (
    <nav className="flex justify-between items-center bg-transparent px-16 py-5 text-white">
      <div>
        <h1 className='font-bold text-2xl font-sans'>SMARTSPACE</h1>
      </div>
      <LogedIn />
    </nav>
  );
}
