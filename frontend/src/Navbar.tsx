type NavbarProps = {
  activePage: string
  setActivePage: (page: string) => void
}

function Navbar({ activePage, setActivePage }: NavbarProps) {

  // All available OMS modules
  const pages = [
    "Dashboard",
    "Customers",
    "Estimation",
    "Proposals",
    "Orders",
    "Projects & Work Orders",
    "Execution & Invoicing",
    "Job Closure",
  ]

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
