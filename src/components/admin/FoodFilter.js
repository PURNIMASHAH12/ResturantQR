function FoodFilters({
  search,
  setSearch,
  filter,
  setFilter,
  categories
}) {
  return (
    <div className="food-tools">

      <input
        placeholder="🔍 Search food..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <select
        value={filter}
        onChange={e => setFilter(e.target.value)}
      >
        <option value="all">All Categories</option>

        {categories.map(c => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

    </div>
  );
}

export default FoodFilters;