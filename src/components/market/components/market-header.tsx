export function MarketHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
      <div className="flex-1 w-full">
        <div className="join w-full">
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="input input-bordered join-item w-full" 
          />
          <button className="btn join-item">Search</button>
        </div>
      </div>
      <div className="flex gap-2">
        <select className="select select-bordered">
          <option>All Categories</option>
          <option>Albums</option>
          <option>Singles</option>
          <option>Tours</option>
          <option>Music Videos</option>
        </select>
        <select className="select select-bordered">
          <option>Sort by</option>
          <option>Trending</option>
          <option>Most Funded</option>
          <option>Ending Soon</option>
          <option>Newest</option>
        </select>
      </div>
    </div>
  )
}
