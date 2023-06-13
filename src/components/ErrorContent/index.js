import React from "react";
import { Result, Icon, Typography } from 'antd';
import Container from "components/Container";
const { Paragraph, Text } = Typography;

export default function ErrorContent({message}) {
  return (
    <Container hideContentHeader={true}>
      <Result
        status="error"
        title="Gagal memuat halaman"
        subTitle="Silahkan periksa jaringan anda atau coba beberapa saat lagi"
      >
        <div className="desc">
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 16,
              }}
            >
              Konten yang Anda minta mengalami kesalahan berikut:
            </Text>
          </Paragraph>
          <Paragraph>
            <Icon style={{ color: 'red' }} type="close-circle" />  {message}
          </Paragraph>
        </div>
      </Result>
    </Container>
  )
}
