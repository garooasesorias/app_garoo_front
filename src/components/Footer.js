import pkg from "../../package.json";
const { version } = pkg;

function Footer() {
  return <p className="text-end me-2">Versión: {version} </p>;
}
export default Footer;
