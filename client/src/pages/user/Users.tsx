import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import userAvatar from "../../assets/user-avatar.jpg"
import LoadingSpinner from '../../components/LoadingSpinner'
import useFetchAllUsers from '../../hooks/userFetch/useFetchAllUsers'
import useSearchUsers from '../../hooks/userFetch/useSearchUser'
import { User } from '../../types/User'

const Users: React.FC = () => {

  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 4

  const { users, totalPages, loading, error } = searchQuery
    ? useSearchUsers(searchQuery, page, limit)
    : useFetchAllUsers(page, limit)

    console.log(users)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    setPage(1)
  }

  return (
    <div className="relative flex flex-col gap-y-6 justify-center items-center bg-blur-ellipse-small bg-[center_top_-1rem] bg-[length:200px] bg-no-repeat">
      <div>
        <h1 className="text-5xl font-bold">Users</h1>
      </div>

      <div className="max-w-2xl w-full flex items-center gap-x-2">
        {/* <div>
          <h2>Search</h2>
        </div> */}
        <div className="flex-1">
          <input type="text" placeholder="Search users by name, surname or username..." className="w-full p-3 bg-[#472DA6] rounded"
            value={searchQuery} onChange={handleSearchChange}
          />
        </div>
        {/* <button className="p-2 bg-[#472DA6] rounded">Find</button> */}
      </div>

      {
        loading && <LoadingSpinner />
      }
      {
        !loading &&
        <div className="max-w-6xl w-full mx-auto min-h-72 grid grid-cols-4 gap-4">
          {
            users && users.map((user:User, index: number) =>
              <div key={index} className="w-full h-auto pt-6 pb-7 px-2 rounded-sm bg-gradient-to-t from-[#0D0D0D] to-[#472DA6] shadow shadow-[#472DA6]">
                <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden p-2 border border-[#cccccc]">
                  <Link to={`/user/${user.username}`}>
                    <img src={user.profilePhoto ? `${process.env.API_URL}/${user.profilePhoto}` : userAvatar} width="100%" height="auto" className="scale-125" />
                  </Link>
                  <div className="absolute bottom-0 left-0 right-0 text-center bg-[#0D0D0D] border-t border-[#000000] bg-opacity-80 h-8">
                    <span className="font-semibold">{user.username}</span>
                  </div>
                </div>
                <div className="mt-3 mb-0.5">
                  <p className="text-center">
                    {
                      !user.name && !user.surname
                        ? <span className="text-[#acacac]">No Information</span>
                        :
                        `${user.name && user.name} ${user.surname && user.surname}`
                    }
                  </p>
                </div>
                <div className="w-4/5 mx-auto">
                  <Link to={`/user/${user.username}`} className="block w-full py-0.5 text-center text-xl font-bold border border-[#0D0D0D] bg-[#F2D541] rounded-xl [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-[#0D0D0D] relative">
                    View
                    <img src={""} className="absolute w-20 h-auto -top-5 -right-8" />
                  </Link>
                </div>
              </div>
            )
          }
        </div>
      }

      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          className={`px-4 py-2 rounded ${page <= 1 ? 'bg-[#1f124d] text-gray-500 cursor-not-allowed' : 'bg-[#472DA6] text-white hover:bg-[#382288]'}`}
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="text-lg px-1">
          Page {page} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 rounded ${page >= totalPages ? 'bg-[#1f124d] text-gray-500 cursor-not-allowed' : 'bg-[#472DA6] text-white hover:bg-[#382288]'}`}
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Users