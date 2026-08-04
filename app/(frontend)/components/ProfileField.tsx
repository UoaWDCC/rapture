import { colorToRgba } from "@/lib/colour";

export function ProfileField({ label }: { label: string }) {
  return (
    <div className="mb-4">
      <label
        className="block text-xs uppercase tracking-wide mb-1"
        style={{ color: "#8fe3bd" }}
      >
        {label}
      </label>
      <div
        className="w-full h-10 rounded border"
        style={{
          borderColor: colorToRgba("#146543", 0.5),
          backgroundColor: colorToRgba("#146543", 0.1),
        }}
      />
    </div>
  );
}
