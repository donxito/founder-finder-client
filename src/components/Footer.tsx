import logo from "../assets/img/symbol.png"
import { Link } from "react-router-dom"


const Footer = () => {
  return (
    <footer className="px-4 py-3 bg-customBlue text-customCyan">
	<div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
		
        <div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
            
            <img className="h-8 w-auto" src={logo} alt="logo" />
	
			<ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
				<li>
					<Link 
                    to={"/"}
                    rel="noopener noreferrer"
                    className="text-customCyan rounded-md px-3 py-2"
                    >Terms of Use
                    </Link>
				</li>
				<li>
				<Link 
                    to={"/"}
                    rel="noopener noreferrer"
                    className="text-customCyan rounded-md px-3 py-2"
                    >Privacy
                    </Link>
				</li>
                <li>
                <Link 
                    to={"/"}
                    rel="noopener noreferrer"
                    className="text-customCyan rounded-md px-3 py-2"
                    >About
                    </Link>
				</li>
                <li>
                <Link 
                    to={"/"}
                    rel="noopener noreferrer"
                    className="text-customCyan rounded-md px-3 py-2"
                    >Contact
                    </Link>
				</li>
			</ul>
		</div>
		
	</div>
</footer>
  )
}

export default Footer
