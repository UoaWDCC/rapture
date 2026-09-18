import { Body, Html, Heading, Text, Img, Container, Section, Row, Column } from "@react-email/components";

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
  purchaserEmail?: string;
};

export default function Purchase({ text, items, totalPrice, purchaserEmail }: PurchaseProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const safeTotalPrice = Number(totalPrice) || 0;

  return (
    <Html>
      <Body style={{ fontFamily: "sans-serif", padding: "20px" }}>
        <Container>
          <Heading>Purchase Confirmation</Heading>
          <Section>
            <Text style={{ whiteSpace: "pre-wrap" }}>
              {text}
            </Text>
          </Section>

          {purchaserEmail && (
            <Section style={{ marginTop: "15px", padding: "12px", backgroundColor: "#f9f9f9", borderRadius: "4px" }}>
              <Text style={{ margin: 0, fontWeight: "bold" }}>
                Purchaser Email: <span style={{ fontWeight: "normal" }}>{purchaserEmail}</span>
              </Text>
            </Section>
          )}
          
          <Section style={{ marginTop: "20px" }}>
            {items?.map((item, index) => {
              const safePrice = Number(item.price) || 0;
              return (
              <Row key={index} style={{ marginBottom: "15px", borderBottom: "1px solid #eaeaea", paddingBottom: "10px" }}>
                {item.imageUrl && (
                  <Column style={{ width: "80px", paddingRight: "15px" }}>
                    <Img src={item.imageUrl.startsWith('http') ? item.imageUrl : `${baseUrl}${item.imageUrl}`} width="80" height="80" style={{ objectFit: "cover", borderRadius: "4px" }} />
                  </Column>
                )}
                <Column>
                  <Text style={{ margin: 0, fontWeight: "bold" }}>{item.productName}</Text>
                  <Text style={{ margin: "5px 0 0 0", color: "#666" }}>
                    Qty: {item.quantity || 1} &nbsp;&bull;&nbsp; ${safePrice.toFixed(2)}
                  </Text>
                </Column>
              </Row>
            )})}
          </Section>

          <Section>
            <Text style={{ fontSize: "18px", fontWeight: "bold", textAlign: "right" }}>
              Total: ${safeTotalPrice.toFixed(2)}
            </Text>
          </Section>

          <Section style={{ marginTop: "40px" }}>
            <Img
              src={`${baseUrl}/LOGO.png`}
              width="200"
              alt="Studio Rapture Logo"
            />
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
