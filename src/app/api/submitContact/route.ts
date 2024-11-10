// app/api/submitContact/route.ts
import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: Request) {
  try {
    const { name, email, phoneNumber, address } = await request.json();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = "Leads!A:M"; // Убедитесь, что указанный лист существует

    // Добавляем данные в таблицу
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            name,
            email,
            phoneNumber,
            address.city,
            address.streetName,
            address.building,
            address.doorNumber,
            address.additionalInfo,
          ],
        ],
      },
    });

    return NextResponse.json({ message: "Данные успешно отправлены" }, { status: 200 });
  } catch (error) {
    console.error("Ошибка при добавлении данных в Google Sheets:", error);
    return NextResponse.json({ error: "Не удалось отправить данные" }, { status: 500 });
  }
}
