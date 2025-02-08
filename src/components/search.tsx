import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
const Search = ({ searchTitle, setSearchTitle }: { searchTitle: string, setSearchTitle: (title: string) => void }) => {
    return (
        <div className='search'>
            <div>
                <MagnifyingGlassIcon className="size-6  text-blue-500" />
                <input type="text" value={searchTitle} placeholder='Search for a movie' onChange={(e) => setSearchTitle(e.target.value)} />
            </div>
        </div>
    )
}

export default Search