// app/api/sheet/route.ts
import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = "Positions!A1:M10"; // Укажите нужный диапазон

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return NextResponse.json(response.data.values);
  } catch (error) {
    console.error("Ошибка при получении данных из Google Sheets:", error);
    return NextResponse.json({ error: "Не удалось получить данные из Google Sheets" }, { status: 500 });
  }
}
