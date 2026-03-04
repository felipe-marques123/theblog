import clsx from "clsx";

export function Footer() {
  return (
    <footer>
      <p className={clsx("text-md font-regular text-center pt-32 pb-16")}>
        <span>Copyright &copy; {new Date().getFullYear()} - </span>
        <a href="https://felipemarquesdesign.com" target="_blank">
          Felipe Marques
        </a>
      </p>
    </footer>
  );
}
