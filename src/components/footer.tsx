
const links = [
  "Legal",
  "Accessibility",
  "Cookies",
  "Privacy",
  "Security",
  "Sitemap",
];

const Footer = () => {
  return (
    <div className="w-full h-16 flex flex-row bg-pnc-dark-gray bottom-0 fixed items-center px-3">
      <div className="flex flex-row justify-between">
        {links.map((link) => (
          <span className="text-white ml-6" key={link}>
            {link}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Footer;
