import Footer from "@/components/home/Footer"
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa6"
import {
  PiEnvelopeSimpleFill,
  PiGlobeHemisphereWestFill,
  PiMapPinFill,
  PiPhoneFill,
} from "react-icons/pi"
import FAQAccordion from "@/components/ui/FAQAccordion"

const contactItems = [
  {
    title: "Call Us",
    Icon: PiPhoneFill,
    lines: [
      "+971 50 459 8701",
      "Monday to Thursday 7:00 AM - 3:30 PM",
      "Saturday and Sunday 8:00 AM - 1:00 PM",
    ],
  },
  {
    title: "Visit Us",
    Icon: PiMapPinFill,
    lines: [
      "Plot # 2028/A, Street 129,",
      "Al Sabkha, Al Riqa Suburb,",
      "Sharjah, United Arab Emirates",
    ],
  },
  {
    title: "Email Us",
    Icon: PiEnvelopeSimpleFill,
    lines: ["info@nimsapex.com"],
  },
  {
    title: "Connect With Us",
    Icon: PiGlobeHemisphereWestFill,
    social: true,
  },
]

const inputClass =
  "w-full border-0 border-b border-gray-300 bg-transparent px-0 py-4 text-sm text-slate-950 outline-none placeholder:text-gray-500 focus:border-[#081947] focus:ring-0"

export default function ContactPage() {
  return (
    <>
      <style>{`
        @keyframes textSlideUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes imageZoomIn {
          from {
            transform: scale(1.08);
          }
          to {
            transform: scale(1);
          }
        }

        .text-animation {
          color: #081947;
          animation: textSlideUp 0.85s ease-out both;
        }

        .text-animation-light {
          animation: textSlideUp 0.85s ease-out both;
        }

        .image-zoom-animation {
          animation: imageZoomIn 1.4s ease-out both;
        }
      `}</style>

      <section className="w-full bg-white ">

        {/* <div className="relative">
          <div className=" w-full md:h-[420px] absolute top-0 left-0">
            <p className="text-animation-light max-w-7xl px-8 text-white mx-auto font-accent text-7xl mt-32 w-full">Contact us</p>
          </div>
          <img
            src="/contact/contact-banner.webp"
            alt="Apex Vision Model School campus"
            className="image-zoom-animation h-[260px] w-full bg-gray-100 object-cover shadow-[0_18px_50px_rgba(0,0,0,0.08)] md:h-[420px]"
          />
        </div> */}
        <div className="mx-auto w-full max-w-7xl pb-8 md:px-8 px-5 ">
          {/* <div>
            <img
              src="/contact/contact-banner.webp"
              alt="Apex Vision Model School campus"
              className="h-[260px] w-full rounded-[32px] bg-gray-100 object-cover shadow-[0_18px_50px_rgba(0,0,0,0.08)] md:h-[420px]"
            />
          </div> */}

          <div className="text-animation pt-24 grid grid-cols-1 gap-14 lg:grid-cols-[45%_55%] lg:items-start lg:gap-12">
            <div>
              {/* <p className="text-sm font-semibold text-slate-950">Contact</p> */}

              <h1 className="mt-8 max-w-xl font-accent text-5xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-5xl">
                We are always ready to help you and answer your questions
              </h1>

              <p className="mt-8 max-w-lg text-base leading-7 text-slate-700">
                Whether you have questions about admissions, academics, or school
                life, our team is ready to help.
              </p>

              <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
                {contactItems.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#081947] text-sm font-semibold text-white">
                      <item.Icon className="text-xl" />
                    </span>
                    <div>
                      <h2 className="font-semibold text-slate-950">{item.title}</h2>
                      {item.social ? (
                        <div className="mt-5 flex items-center gap-7 text-xl text-slate-950">
                          <FaFacebookF />
                          <FaInstagram />
                          <FaLinkedinIn />
                          <FaYoutube />
                        </div>
                      ) : (
                        <div className="mt-4 space-y-2 text-sm leading-6 text-slate-800">
                          {item.lines.map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}              </div>
            </div>

            <div className="rounded-[32px] bg-gray-100 px-6 py-10 sm:px-10 md:px-16 md:py-16 lg:px-20">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                Get in Touch
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-800">
                We'd love to hear from you. Send us a message and we'll get back to
                you soon.
              </p>

              <form className="mt-10 space-y-4">
                <input className={inputClass} type="text" placeholder="Name of Student" />

                <select className={inputClass} defaultValue="">
                  <option value="" disabled>
                    Inquiry Type
                  </option>
                  <option>Admission Inquiry</option>
                  <option>Academic Information</option>
                  <option>School Visit</option>
                  <option>General Question</option>
                </select>

                <input className={inputClass} type="email" placeholder="Email Address" />
                <input className={inputClass} type="tel" placeholder="Phone Number" />
                <textarea
                  className={`${inputClass} min-h-28 resize-none`}
                  placeholder="Your Message"
                />

                <button
                  type="submit"
                  className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#081947] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#051234]"
                >

                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div id="faqs" className="scroll-mt-28">
            <h1 className="mt-20 max-w-xl font-accent text-5xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-5xl">
              Frequently Asked Questions
            </h1>
            <FAQAccordion className="mx-auto mt-12" />
          </div>


          <div className="mt-24 overflow-hidden rounded-[32px] bg-gray-100 shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
            <iframe
              title="Apex Vision Model School location map"
              src="https://www.google.com/maps?q=Apex%20Vision%20Model%20School%20Al%20Sabkha%20Sharjah&output=embed"
              className="h-[360px] w-full grayscale md:h-[430px]"
              loading="lazy"
            />
          </div>


        </div>
      </section >
      <Footer />
    </>
  )
}
