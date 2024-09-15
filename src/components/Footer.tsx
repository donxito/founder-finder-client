import logo from "../assets/img/symbol.png"
import { Link } from "react-router-dom"


const Footer = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Added a flex container with min-height */}
      <div className="flex-grow"> {/* This allows the content to grow and push the footer down */}
        </div>
    <footer className="px-4 py-3 bg-customBlue text-customCyan ">
	<div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
		
        <div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
            
            <img className=" h-6 w-auto sm:h-8 sm:w-auto" src={logo} alt="logo" />
	
			<ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
				<li>
					<Link 
                    to={"/"}
                    rel="noopener noreferrer"
                    className="text-customCyan rounded-md px-1 py-1 sm:py-2 text-xs sm:text-sm sm:px-3"
                    >Terms of Use
                    </Link>
				</li>
				<li>
				<Link 
                    to={"/"}
                    rel="noopener noreferrer"
                    className="text-customCyan rounded-md px-1 py-1 sm:py-2 text-xs sm:text-sm sm:px-3"
                    >Privacy
                    </Link>
				</li>
                <li>
                <Link 
                    to={"/"}
                    rel="noopener noreferrer"
                    className="text-customCyan rounded-md px-1 py-1 sm:py-2 text-xs sm:text-sm sm:px-3"
                    >About
                    </Link>
				</li>
                <li>
                <Link 
                    to={"/contact"}
                    rel="noopener noreferrer"
                   className="text-customCyan rounded-md px-1 py-1 sm:py-2 text-xs sm:text-sm sm:px-3"
                    >Contact
                    </Link>
				</li>
			</ul>
		</div>
		
	</div>
</footer>
</div>
  )
}

export default Footer
