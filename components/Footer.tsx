import Container from "./Container";

const Footer = () => {
  return (
    <div className="bg-lightBg text-sm">
      <Container className="py-5">
        <footer className="flex items-center justify-between sm:flex-col">
          <p className="text-gray-500">
            Copyright © {new Date().getFullYear()} All Rights reserved.
          </p>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
