import React from "react";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { Button } from "semantic-ui-react";

function ContactForm() {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitting(true);

    if (form.current instanceof HTMLFormElement) {
      emailjs
        .sendForm(
          `${import.meta.env.VITE_SERVICE_ID}`,
          `${import.meta.env.VITE_TEMPLATE_ID}`,
          form.current,
          `${import.meta.env.VITE_PUBLIC_KEY}`
        )
        .then(
          (result) => {
            console.log("SUCCESS!");
            console.log(result);
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        )
        .finally(() => {
          setSubmitting(false);
          form.current?.reset();
        });
    }
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="mt-5 flex flex-col h-auto">
      <input
        className="my-2 bg-zinc-100 p-2 font-medium text-gray-600 border border-opacity-20 border-customBlue rounded-sm"
        type="text"
        placeholder="Your Name"
        name="user_name"
        required
      />
      <input
        className="my-2 bg-zinc-100 p-2 font-medium text-gray-600 border border-opacity-20 border-customBlue rounded-sm"
        type="email"
        placeholder="Your Email"
        name="user_email"
        required
      />
      <textarea
        className="bg-zinc-100 p-2  text-gray-700 mb-4 border border-opacity-20 border-customBlue rounded-sm"
        name="message"
        rows={5}
        placeholder="Write your message here"
        required
      ></textarea>

      {submitting ? (
        <Button basic color="blue" type="button" disabled>
          Submitting...
        </Button>
      ) : (
        <Button basic color="blue" type="submit" value="Send" style={{ fontFamily: 'Wotfard, sans-serif' }}  >
          Submit
        </Button>
      )}
    </form>
  );
}

export default ContactForm;
