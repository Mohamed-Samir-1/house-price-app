import type {
  PredictionRequest,
  PredictionResponse,
} from "../types/prediction";


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8000";


export async function predictPrice(
  payload: PredictionRequest
): Promise<PredictionResponse> {

  const response = await fetch(
    `${API_BASE_URL}/predict`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    }
  );


  if (!response.ok) {

    let message = "Prediction request failed.";

    try {
      const data = await response.json();

      if (data?.detail) {
        message = Array.isArray(data.detail)
          ? data.detail
              .map((item: { msg: string }) => item.msg)
              .join(", ")
          : String(data.detail);
      }

    } catch {
      // Keep the default error message.
    }

    throw new Error(message);
  }


  return response.json();
}