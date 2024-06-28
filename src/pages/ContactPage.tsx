
import ContactForm from '../components/contactForm'

function ContactPage() {
  return (
    <section className=" px-4 py-16 mb-2">
      <div className="container m-auto py-10 px-6">
        <h2 className="text-3xl font-bold text-customBlue mb-14 text-center">Send us a message</h2>

<ContactForm/>
</div>
    </section>

  )
}

export default ContactPage;