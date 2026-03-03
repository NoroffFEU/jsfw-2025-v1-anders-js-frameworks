export default function SubNav() {
  return (
    <nav className="flex justify-between px-10 py-4 items-center border-b border-gray-400 bg-white shadow-md">
      <div className="flex gap-10">
        <p className="text-lg group relative w-max cursor-pointer hover:text-blue-500">
          <span>Popular</span>
          <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-blue-500 group-hover:w-full"></span>
        </p>

        <p className="text-lg group relative w-max cursor-pointer hover:text-blue-500">
          <span>All products</span>
          <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-blue-500 group-hover:w-full"></span>
        </p>
      </div>

      <div className="flex items-center border-2 border-blue-300 rounded-2xl px-2">
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </p>
        <input
          className="focus:outline-0 py-1 px-2"
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
        />
      </div>
    </nav>
  );
}
