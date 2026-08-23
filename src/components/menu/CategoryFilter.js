function CategoryFilter({
  categories,
  category,
  setCategory
}) {
  return (
    <div className="categories">

      {categories.map(cat => (
        <button
          key={cat}
          className={category === cat ? "active" : ""}
          onClick={() => setCategory(cat)}
        >
          {cat}
        </button>
      ))}

    </div>
  );
}

export default CategoryFilter;