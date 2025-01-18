import emailjs from "@emailjs/browser";

// Fetcher fonksiyonunu ekleyelim
export const fetcher = async (url: string) => {
  if (!url) {
    console.warn("No URL provided to fetcher");
    return null;
  }

  try {
    console.log("GET Request URL:", url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("GET Response:", data);

    // API yanıtının yapısını kontrol edelim
    if (!data || typeof data !== "object") {
      console.warn("Invalid API response format:", data);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Fetcher error:", error);
    throw error;
  }
};

export const DynamicRouter = (path: string, key: string, params?: any) => {
  // Base URL
  let baseUrl = `${process.env.NEXT_PUBLIC_API_URL}${path}/${key}/`;

  // Check if params is provided and is an object
  if (params && typeof params === "object") {
    // Create an instance of URLSearchParams
    const searchParams = new URLSearchParams();

    // Loop through the params object and append each key-value pair
    Object.keys(params).forEach((key) => {
      searchParams.append(key, params[key]);
    });

    // Append the query string to the baseUrl
    baseUrl += `?${searchParams.toString()}`;
  }

  return baseUrl;
};

export const deleteRequest = async (key: string, { arg }: { arg: any }) => {
  return makeRequest("DELETE", key, { arg });
};

export const putRequest = async (key: string, { arg }: { arg: any }) => {
  return makeRequest("PUT", key, { arg });
};

export const postRequest = async (key: string, { arg }: { arg: any }) => {
  console.log("POST Request URL:", key);
  console.log("POST Request Data:", arg);

  const result = await makeRequest("POST", key, { arg });
  console.log("POST Response:", result);
  return result;
};

export const makeRequest = async (
  method: string,
  url: string,
  { arg }: any
) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
      next: { revalidate: 0 },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Request Error:", error);
    throw error;
  }
};

export const sendEmail: any = async (params: any) => {
  const result = emailjs
    .send("service_v6lszsh", "template_p6a14j5", params, "x9zeAUQZ8kjXvljQX")
    .then(
      function (response) {
        return { status: response.status, text: response.text };
      },
      function (error) {
        return error;
      }
    );
  return result;
};
