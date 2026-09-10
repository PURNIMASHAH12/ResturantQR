function MenuSearch({ search, setSearch }) {
  return (
    <input
      className="menu-search"
      placeholder="Search food..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  );
}

export default MenuSearch;