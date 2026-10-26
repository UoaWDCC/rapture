"use client";

type HamburgerButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  const lineBase: React.CSSProperties = {
    display: "block",
    width: "34px",
    height: "4px",
    backgroundColor: "#ffffff",
    borderRadius: "2px",
    transformOrigin: "center",
  };

  const topLineStyle: React.CSSProperties = {
    ...lineBase,
    transform: isOpen ? "translateY(9px) rotate(45deg)" : "none",
  };

  const midLineStyle: React.CSSProperties = {
    ...lineBase,
    opacity: isOpen ? 0 : 1,
  };

  const botLineStyle: React.CSSProperties = {
    ...lineBase,
    transform: isOpen ? "translateY(-9px) rotate(-45deg)" : "none",
  };

  return (
    <button
      onClick={onClick}
      aria-label="Toggle navigation menu"
      aria-expanded={isOpen}
      style={{
        position: "absolute",
        top: "0.5rem",
        right: "0.5rem",
        zIndex: 1200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "6px",
        width: "54px",
        height: "54px",
        padding: "8px",
        background: "transparent",
        border: "none",
        borderRadius: 0,
        boxShadow: "none",
        cursor: "pointer",
        outline: "none",
        opacity: 1,
        visibility: "visible",
      }}
    >
      <span style={topLineStyle} />
      <span style={midLineStyle} />
      <span style={botLineStyle} />
    </button>
  );
}
