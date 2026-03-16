import "./Header.css";

interface HeaderProps {
  onNew: () => void;
}

export default function Header({ onNew }: HeaderProps) {
  return (
    <header className="header">
      <span className="header-logo">WorkItems</span>
      <button className="btn-primary" onClick={onNew}>+ New</button>
    </header>
  );
}
