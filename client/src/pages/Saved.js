import React, { useState, useEffect } from "react"
import "../App.css"

function Saved() {
  useEffect(() => {
    fetchItems()
  }, [])

  const [books, setBooks] = useState([])

  const fetchItems = async () => {
    const data = await fetch(`${process.env.SERVER_URL || ""}/api/books`)
    const { books } = await data.json()
    console.log(books)

    setBooks(books)
  }

  const removeBookFromDB = async (book) => {
    if (window.confirm("Are you sure you want to remove this book from your list?") === true) {
      console.log("Removing Book from dB")

      await fetch(`${process.env.SERVER_URL || ""}/api/books/${book._id}`, {
        method: "DELETE",
      }).then(() => {
        setBooks(books.filter((b) => b._id !== book._id))
      })
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-5xl">Saved</h1>
      <div className="my-4 text-white font-bold">
        <ul>
          {books.map((book, i) => (
            <li className="bg-gray-600 rounded my-2 py-4 flex justify-around" key={i}>
            <div>
                <a className="hover:text-gray-900 underline" href={book.link}>
                  {book.title}
                </a>
                <p>By: {book.authors[0]}</p>
            </div>
              <button
                className="p-1 bg-red-600 text-white font-bold hover:bg-red-900"
                onClick={() => removeBookFromDB(book)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Saved
