"use client";

type HamburgerButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  const lineBase: React.CSSProperties = {
    display: "block",
    width: "24px",
    height: "2px",
    backgroundColor: "#ffffff",
    borderRadius: "2px",
    transformOrigin: "center",
  };

  const topLineStyle: React.CSSProperties = {
    ...lineBase,
    transform: isOpen ? "translateY(7px) rotate(45deg)" : "none",
  };

  const midLineStyle: React.CSSProperties = {
    ...lineBase,
    opacity: isOpen ? 0 : 1,
  };

  const botLineStyle: React.CSSProperties = {
    ...lineBase,
    transform: isOpen ? "translateY(-7px) rotate(-45deg)" : "none",
  };

  return (
    <button
      onClick={onClick}
      aria-label="Toggle navigation menu"
      aria-expanded={isOpen}
      style={{
        position: "fixed",
        top: "1rem",
        left: "1rem",
        zIndex: 1100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
        width: "44px",
        height: "44px",
        padding: "8px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        outline: "none",
      }}
    >
      <span style={topLineStyle} />
      <span style={midLineStyle} />
      <span style={botLineStyle} />
    </button>
  );
}
