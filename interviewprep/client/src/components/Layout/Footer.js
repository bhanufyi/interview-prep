import React from 'react'

export default function Footer() {
    return (
      <footer className="bg-dark text-white mt-5 p-4 text-center">
        <strike className="mr-2">
          Copyrights &copy; {new Date().getFullYear()} InterviewPrep
        </strike>
         Just kidding &#x1F61C;
      </footer>
    ); 
}
