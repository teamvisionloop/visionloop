const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-4xl font-bold tracking-tight">
              <span className="text-red-600">GET IN</span>
              <br />
              <span className="text-black">TOUCH</span>
            </h2>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6 text-sm text-gray-700">

            {/* Email */}
            <div className="flex items-center gap-3">
              {/* Mail SVG */}
              <svg
                width="20"
                height="20"
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
              {/* Phone SVG */}
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.9.3 1.77.54 2.6a2 2 0 0 1-.45 2.11L9 10a16 16 0 0 0 5 5l.57-.09a2 2 0 0 1 2.11-.45c.83.24 1.7.42 2.6.54A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>01277440119</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – FORM */}
        <form className="flex flex-col gap-6">

          {[
            { label: "Name", type: "text" },
            { label: "Email Address", type: "email" },
            { label: "Subject", type: "text" },
          ].map((field) => (
            <div key={field.label} className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                className="border-b border-gray-300 focus:border-black outline-none py-2"
                required
              />
            </div>
          ))}

          {/* Message */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              Message
            </label>
            <textarea
              rows={4}
              className="border-b border-gray-300 focus:border-black outline-none py-2 resize-none"
              required
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            className="self-end mt-4 px-8 py-2 border border-black text-sm tracking-widest hover:bg-black hover:text-white transition"
          >
            SEND
          </button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
