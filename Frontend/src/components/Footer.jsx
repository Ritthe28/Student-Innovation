import { useNavigate } from "react-router-dom";


const Footer = () => {
  const navigate = useNavigate();

    return (
      <footer className="bg-gray-800 text-white text-center p-6 mt-auto mb-[0px] w-[100vw]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-semibold">Contact Us</h3>
              
              <p className="text-sm">loharshubham31@gmail.com</p>
              <p className="text-sm">rohitritthe11@gmail.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="text-sm">
                {/* <li><a href="/home" className="hover:underline">Home</a></li>
                <li><a href="/services" className="hover:underline">Services</a></li>
                <li><a href="/contact" className="hover:underline">Contact</a></li> */}
                <li className="cursor-pointer text-lg hover:underline  text-white decoration-amber-800n"><button className="cursor-pointer hover:underline underline-offset-auto hover:text-gray-300" onClick={()=>navigate("/feedback")}>Give Feedback</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="flex justify-center space-x-4">
                <a href="#" className="hover:text-gray-400">Facebook</a>
                <a href="#" className="hover:text-gray-400">Twitter</a>
                <a href="#" className="hover:text-gray-400">Instagram</a>
              </div>
            </div>
          </div>
          {/* <hr className="my-4 border-gray-600" />
          <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p> */}
        </div>
      </footer>
    );
  };
  
  export default Footer;
  