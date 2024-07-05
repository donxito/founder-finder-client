/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, FormEvent, ChangeEvent } from "react"
import subscriptionService from "../services/subscription.service";
import { toast } from "react-toastify";

const Newsletter: React.FC = () => {

    const [email, setEmail] = useState<string>("");
    const [subscribed, setSubscribed] = useState<boolean>(false);
    const [error] = useState<string>("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await subscriptionService.subscribe(email);
            toast.success("Subscription successfully");
            console.log(email)
            setSubscribed(true)
            setEmail("")
          } catch (error) {
            toast.error("Subscription failed. Please try again later.");
          }
        };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)

    }




    return (
        <div className="w-full py-16 text-customBlue bg-zinc-100 px-10">
          <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3">
            <div className="lg:col-span-2 my-4">
              <h2 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
                Stay updated with our latest posts!
              </h2>
              <p>Subscribe to our newsletter now and stay up to date.</p>
            </div>
            <div className="my-4">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center justify-between w-full"
              >
                <input
                  className="p-3 flex w-full rounded-md text-slate-700"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleChange}
                />
                <button
                  className="p-3 flex w-full rounded-md font-semibold text-customBlue hover:text-customCyan mt-2 sm:mt-0 sm:ml-2"
                  type="submit"
                >
                  Subscribe
                </button>
              </form>
              {subscribed && (
                <p className="text-green-600 mt-2">Subscribed successfully!</p>
              )}
              {error && <p className="text-red-600 mt-2">{error}</p>}
            </div>
          </div>
        </div>
      );
    };

export default Newsletter
