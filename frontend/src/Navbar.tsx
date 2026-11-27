
 // --------------------------------
 // NAVBAR COMPONENT PROPS
 // --------------------------------
type NavbarProps = {
  activePage: string
  setActivePage: (page: string) => void
}

// --------------------------------
// NAVBAR COMPONENT
// --------------------------------
function Navbar({
  activePage,
  setActivePage
}: NavbarProps) {

  // --------------------------------
  // NAVIGATION BUTTONS
  // --------------------------------
  const pages = [
    "Dashboard",
    "Customers",
    "Estimation",
    "Proposals",
    "Orders",
    "Projects & Work Orders"
  ]

  // --------------------------------
  // DISPLAY NAVIGATION
  // --------------------------------
  return (
    <div>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setActivePage(page)}
          disabled={activePage === page}
        >
          {page}
        </button>
      ))}
    </div>
  )
}

export default Navbar