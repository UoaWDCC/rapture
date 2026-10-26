import { Column, Img, Row, Section, Text } from "@react-email/components";
import type { CSSProperties } from "react";
import { EmailLayout, baseUrl, boxStyle, detailStyle, mutedGold, textStyle } from "@/lib/email/components/EmailLayout";

type OrderItem = {
  productName: string;
  price: number;
  quantity?: number;
  imageUrl?: string;
};

type PurchaseProps = {
  text: string;
  items: OrderItem[];
  totalPrice: number;
  // Only set on the copy sent to admins
  purchaserEmail?: string;
  orderId?: string;
  orderDate?: string | Date;
  // Orders don't store a currency; products default to NZD
  currency?: string;
};

const rowStyle: CSSProperties = { borderTop: `1px solid ${mutedGold}` };
const cellStyle: CSSProperties = { padding: "10px 0", verticalAlign: "middle" };
const smallStyle: CSSProperties = { ...detailStyle, fontSize: "12px", lineHeight: "16px", opacity: 0.8 };

export default function Purchase({
  text,
  items,
  totalPrice,
  purchaserEmail,
  orderId,
  orderDate,
  currency = "NZD",
}: PurchaseProps) {
  const isAdminCopy = Boolean(purchaserEmail);
  const money = (value: number) =>
    new Intl.NumberFormat("en-NZ", { style: "currency", currency }).format(Number(value) || 0);

  const details = [
    orderId && `Order #${orderId.slice(-8).toUpperCase()}`,
    orderDate &&
      new Date(orderDate).toLocaleDateString("en-NZ", { day: "numeric", month: "long", year: "numeric" }),
  ].filter(Boolean);

  return (
    <EmailLayout
      title={isAdminCopy ? "Studio Rapture" : undefined}
      preview={isAdminCopy ? `New order from ${purchaserEmail}` : "Your Studio Rapture order is confirmed"}
      heading={isAdminCopy ? "New order received" : "Thank you for your order!"}
    >
      <Text style={textStyle}>{text}</Text>

      {(details.length > 0 || isAdminCopy) && (
        <Text style={{ ...textStyle, fontSize: "13px" }}>
          {details.join("  ·  ")}
          {isAdminCopy && `${details.length ? "\n" : ""}Customer: ${purchaserEmail}`}
        </Text>
      )}

      <Section className="rp-box" style={{ ...boxStyle, padding: "4px 16px" }}>
        {items?.map((item, index) => {
          const quantity = item.quantity || 1;
          const imageSrc = item.imageUrl && (item.imageUrl.startsWith("http") ? item.imageUrl : `${baseUrl}${item.imageUrl}`);
          return (
            <Row key={index} style={index > 0 ? rowStyle : undefined}>
              {imageSrc && (
                <Column style={{ ...cellStyle, width: "60px" }}>
                  <Img
                    src={imageSrc}
                    width="48"
                    height="48"
                    alt=""
                    style={{ objectFit: "cover", borderRadius: "3px", display: "block" }}
                  />
                </Column>
              )}
              <Column style={cellStyle}>
                <Text style={detailStyle}>{item.productName}</Text>
                <Text style={smallStyle}>
                  Qty {quantity} × {money(item.price)}
                </Text>
              </Column>
              <Column style={{ ...cellStyle, textAlign: "right", whiteSpace: "nowrap" }}>
                <Text style={{ ...detailStyle, textAlign: "right" }}>{money(item.price * quantity)}</Text>
              </Column>
            </Row>
          );
        })}
        <Row style={rowStyle}>
          <Column style={cellStyle}>
            <Text style={{ ...detailStyle, fontWeight: "bold" }}>Total</Text>
          </Column>
          <Column style={{ ...cellStyle, textAlign: "right", whiteSpace: "nowrap" }}>
            <Text style={{ ...detailStyle, fontWeight: "bold", textAlign: "right" }}>
              {money(totalPrice)} {currency}
            </Text>
          </Column>
        </Row>
      </Section>
    </EmailLayout>
  );
}
