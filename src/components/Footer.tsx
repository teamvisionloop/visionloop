const Footer = () => {
  return (
    <footer className="bg-white border-t border-black/10 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-black">
              GET IN
              <br />
              TOUCH
            </h2>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6 text-sm text-black">
            {/* Email */}
            <div className="flex items-center gap-3">
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M3 6h18v12H3z" />
                <path d="M3 6l9 7 9-7" />
              </svg>
              <span>teamvisionloop@gmail.com</span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.9.3 1.77.54 2.6a2 2 0 0 1-.45 2.11L9 10a16 16 0 0 0 5 5l.57-.09a2 2 0 0 1 2.11-.45c.83.24 1.7.42 2.6.54A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>01277440119</span>
            </div>

            {/* VisionLoop Logo (Desktop Only) */}
            <img
              src="/lg.png"
              alt="VisionLoop Logo"
              className="hidden md:block mt-6 h-10 w-auto"
            />
          </div>
        </div>

        {/* RIGHT SIDE – FORM */}
        <form className="flex flex-col gap-8">
          {[
            { label: "Name", type: "text" },
            { label: "Email Address", type: "email" },
            { label: "Subject", type: "text" },
          ].map((field) => (
            <div key={field.label} className="flex flex-col">
              <label className="text-xs uppercase tracking-wider text-black mb-2">
                {field.label}
              </label>
              <input
                type={field.type}
                required
                className="
                  bg-transparent
                  border-b
                  border-black/40
                  focus:border-black
                  outline-none
                  py-2
                  text-sm
                  transition
                "
              />
            </div>
          ))}

          {/* Message */}
          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-wider text-black mb-2">
              Message
            </label>
            <textarea
              rows={4}
              required
              className="
                bg-transparent
                border-b
                border-black/40
                focus:border-black
                outline-none
                py-2
                text-sm
                resize-none
                transition
              "
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            className="
              self-end
              mt-6
              px-10
              py-2
              border
              border-black
              text-xs
              tracking-widest
              text-black
              hover:bg-black
              hover:text-white
              transition
            "
          >
            SEND
          </button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
