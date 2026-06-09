"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { PiXBold } from "react-icons/pi"

export default function FacilityCardDrawerTest({ data, open, onClose }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return

    const html = document.documentElement
    const body = document.body
    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyDrawerScrollLock: body.dataset.drawerScrollLock,
    }

    // Freeze the page behind the test drawer.
    window.__lenis?.stop?.()
    html.style.overflow = "hidden"
    body.style.overflow = "hidden"
    body.dataset.drawerScrollLock = "true"

    return () => {
      html.style.overflow = previous.htmlOverflow
      body.style.overflow = previous.bodyOverflow
      if (previous.bodyDrawerScrollLock) {
        body.dataset.drawerScrollLock = previous.bodyDrawerScrollLock
      } else {
        delete body.dataset.drawerScrollLock
      }
      window.__lenis?.start?.()
    }
  }, [open])

  if (!mounted || !open) return null

  return createPortal(
    <div className="fixed inset-0 z-[6000] bg-white/30">
      {/* <div className="h-dvh overflow-y-auto">
        <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 pb-10 pt-5 md:px-8 md:pb-14 md:pt-7">


          <div className="mt-4 rounded-[1.75rem] border border-neutral-200 bg-[#fcfcfc] p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/60">
              Test Drawer
            </p>

            <h2 className="mt-4 font-accent text-[2rem] font-semibold uppercase leading-[1.05] text-black md:text-[3.25rem]">
              {data?.title ?? "Facility Test"}
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#4a5875] md:text-base">
              This is a simple full-screen test drawer. You can replace this content with your own layout and logic.
            </p>
          </div>
        </div>
      </div> */}

      <div
        className="absolute right-0 top-0 h-screen max-w-3xl overflow-y-auto bg-white p-4 shadow-lg"
        data-sequence-native-scroll
      >
        <div className="sticky top-0 z-20 flex justify-end bg-white py-2">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close test drawer"
            className="grid size-11 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-colors duration-200 hover:bg-neutral-50"
          >
            <PiXBold className="text-lg" />
          </button>
        </div>
        <h1 className="text-2xl font-bold">Test Drawer</h1>

        <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora totam unde cum nostrum dolores officia saepe quo rem alias blanditiis exercitationem nam eum eligendi, accusamus impedit facilis ducimus dolorum mollitia!
        Tempore eum asperiores animi modi, quas in quidem quae. Labore non voluptates dolorum, quos quasi rem pariatur eveniet repellendus consequatur odit eos illum provident aliquid repellat, excepturi maxime. Quae, ipsam.
        Explicabo non iste voluptatum? Atque quis earum, similique pariatur soluta deleniti et porro iste maxime mollitia illo sed sunt, expedita consequuntur qui placeat quisquam ad quaerat sint animi delectus tenetur?
        Nemo optio dolor quam! Illum laboriosam odio quis corporis nemo ratione deserunt assumenda odit voluptatum sit doloribus vitae, modi molestiae quo sequi qui alias blanditiis asperiores ducimus? Nisi, quis veniam?
        Iste mollitia modi eum deleniti consectetur, provident at a nulla quaerat repellendus, quam dignissimos minima quae sapiente corporis rerum officia cum. Alias accusantium, et assumenda voluptates omnis sit veritatis ipsam.
        Alias quidem, doloremque consectetur minima accusantium exercitationem doloribus fugiat mollitia possimus itaque ullam delectus asperiores officia architecto repellendus ipsam et? A eum nulla officiis, perferendis deserunt dignissimos sunt illo porro.
        Nemo nesciunt officiis, aliquid ad quibusdam consequatur iusto omnis tempora. Consectetur facilis nihil nisi deserunt repellendus, sapiente esse inventore ut dolore necessitatibus laboriosam atque tenetur at! Temporibus dolorem velit omnis.
        Quos quis itaque reiciendis? Asperiores ullam quas atque enim soluta ex nostrum quae culpa amet perferendis possimus reprehenderit nemo ab cupiditate vero debitis repudiandae cum iste, quidem, incidunt numquam iure?</h1>

        <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora totam unde cum nostrum dolores officia saepe quo rem alias blanditiis exercitationem nam eum eligendi, accusamus impedit facilis ducimus dolorum mollitia!
        Tempore eum asperiores animi modi, quas in quidem quae. Labore non voluptates dolorum, quos quasi rem pariatur eveniet repellendus consequatur odit eos illum provident aliquid repellat, excepturi maxime. Quae, ipsam.
        Explicabo non iste voluptatum? Atque quis earum, similique pariatur soluta deleniti et porro iste maxime mollitia illo sed sunt, expedita consequuntur qui placeat quisquam ad quaerat sint animi delectus tenetur?
        Nemo optio dolor quam! Illum laboriosam odio quis corporis nemo ratione deserunt assumenda odit voluptatum sit doloribus vitae, modi molestiae quo sequi qui alias blanditiis asperiores ducimus? Nisi, quis veniam?
        Iste mollitia modi eum deleniti consectetur, provident at a nulla quaerat repellendus, quam dignissimos minima quae sapiente corporis rerum officia cum. Alias accusantium, et assumenda voluptates omnis sit veritatis ipsam.
        Alias quidem, doloremque consectetur minima accusantium exercitationem doloribus fugiat mollitia possimus itaque ullam delectus asperiores officia architecto repellendus ipsam et? A eum nulla officiis, perferendis deserunt dignissimos sunt illo porro.
        Nemo nesciunt officiis, aliquid ad quibusdam consequatur iusto omnis tempora. Consectetur facilis nihil nisi deserunt repellendus, sapiente esse inventore ut dolore necessitatibus laboriosam atque tenetur at! Temporibus dolorem velit omnis.
        Quos quis itaque reiciendis? Asperiores ullam quas atque enim soluta ex nostrum quae culpa amet perferendis possimus reprehenderit nemo ab cupiditate vero debitis repudiandae cum iste, quidem, incidunt numquam iure?</h1>

        <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora totam unde cum nostrum dolores officia saepe quo rem alias blanditiis exercitationem nam eum eligendi, accusamus impedit facilis ducimus dolorum mollitia!
        Tempore eum asperiores animi modi, quas in quidem quae. Labore non voluptates dolorum, quos quasi rem pariatur eveniet repellendus consequatur odit eos illum provident aliquid repellat, excepturi maxime. Quae, ipsam.
        Explicabo non iste voluptatum? Atque quis earum, similique pariatur soluta deleniti et porro iste maxime mollitia illo sed sunt, expedita consequuntur qui placeat quisquam ad quaerat sint animi delectus tenetur?
        Nemo optio dolor quam! Illum laboriosam odio quis corporis nemo ratione deserunt assumenda odit voluptatum sit doloribus vitae, modi molestiae quo sequi qui alias blanditiis asperiores ducimus? Nisi, quis veniam?
        Iste mollitia modi eum deleniti consectetur, provident at a nulla quaerat repellendus, quam dignissimos minima quae sapiente corporis rerum officia cum. Alias accusantium, et assumenda voluptates omnis sit veritatis ipsam.
        Alias quidem, doloremque consectetur minima accusantium exercitationem doloribus fugiat mollitia possimus itaque ullam delectus asperiores officia architecto repellendus ipsam et? A eum nulla officiis, perferendis deserunt dignissimos sunt illo porro.
        Nemo nesciunt officiis, aliquid ad quibusdam consequatur iusto omnis tempora. Consectetur facilis nihil nisi deserunt repellendus, sapiente esse inventore ut dolore necessitatibus laboriosam atque tenetur at! Temporibus dolorem velit omnis.
        Quos quis itaque reiciendis? Asperiores ullam quas atque enim soluta ex nostrum quae culpa amet perferendis possimus reprehenderit nemo ab cupiditate vero debitis repudiandae cum iste, quidem, incidunt numquam iure?</h1>

        <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora totam unde cum nostrum dolores officia saepe quo rem alias blanditiis exercitationem nam eum eligendi, accusamus impedit facilis ducimus dolorum mollitia!
        Tempore eum asperiores animi modi, quas in quidem quae. Labore non voluptates dolorum, quos quasi rem pariatur eveniet repellendus consequatur odit eos illum provident aliquid repellat, excepturi maxime. Quae, ipsam.
        Explicabo non iste voluptatum? Atque quis earum, similique pariatur soluta deleniti et porro iste maxime mollitia illo sed sunt, expedita consequuntur qui placeat quisquam ad quaerat sint animi delectus tenetur?
        Nemo optio dolor quam! Illum laboriosam odio quis corporis nemo ratione deserunt assumenda odit voluptatum sit doloribus vitae, modi molestiae quo sequi qui alias blanditiis asperiores ducimus? Nisi, quis veniam?
        Iste mollitia modi eum deleniti consectetur, provident at a nulla quaerat repellendus, quam dignissimos minima quae sapiente corporis rerum officia cum. Alias accusantium, et assumenda voluptates omnis sit veritatis ipsam.
        Alias quidem, doloremque consectetur minima accusantium exercitationem doloribus fugiat mollitia possimus itaque ullam delectus asperiores officia architecto repellendus ipsam et? A eum nulla officiis, perferendis deserunt dignissimos sunt illo porro.
        Nemo nesciunt officiis, aliquid ad quibusdam consequatur iusto omnis tempora. Consectetur facilis nihil nisi deserunt repellendus, sapiente esse inventore ut dolore necessitatibus laboriosam atque tenetur at! Temporibus dolorem velit omnis.
        Quos quis itaque reiciendis? Asperiores ullam quas atque enim soluta ex nostrum quae culpa amet perferendis possimus reprehenderit nemo ab cupiditate vero debitis repudiandae cum iste, quidem, incidunt numquam iure?</h1>

      </div>



    </div>,
    document.body,
  )
}
