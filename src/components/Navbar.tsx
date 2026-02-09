const Navbar = () => {
  return (
    <header className="
      sticky top-0 z-50
      bg-white
      border-b border-gray-200
    ">
      <div className="
        max-w-7xl mx-auto
        flex items-center justify-between
        px-6 md:px-12 py-4
      ">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-brand-red">
            UNBOUND
          </span>
          <span className="text-2xl font-extrabold text-brand-dark">
            SPORTS
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-10 text-brand-dark font-medium">
          <a className="hover:text-brand-red transition" href="#">Home</a>
          <a className="hover:text-brand-red transition" href="#">Sports</a>
          <a className="hover:text-brand-red transition" href="#">About</a>
          <a className="hover:text-brand-red transition" href="#">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
