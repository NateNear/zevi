import Products from './product';
import Filter from './filter';
import useCommonStore from '../store';

const Main = () => {
  const searchTerm = useCommonStore((state) => state.searchTerm);

  // Use optional chaining to safely access `length`
  return (
    searchTerm?.length !== 0 && (
      <div className="h-full bg-white p-4">
        <h3 className="text-2xl font-bold">Search results</h3>
        <div className="grid grid-cols-12 py-4 ">
          <div className=" md:col-span-3 sm:col-span-12 ">
            <Filter />
          </div>
          <div className="md:col-span-9 sm:col-span-12">
            <Products />
          </div>
        </div>
      </div>
    )
  );
};

export default Main;
