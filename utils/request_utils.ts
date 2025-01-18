import { ApiResponse } from "@/types/general_types";

export const DynamicRouter = (
  app: string,
  endpoint: string,
  params?: { [key: string]: any }
): string => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/${app}/${endpoint}/`;

  if (params) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });
    const queryString = queryParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  return url;
};

export const postRequest = async (url: string, params?: { arg?: any }) => {
  return makeRequest("POST", url, params?.arg);
};

export const putRequest = async (url: string, params?: { arg?: any }) => {
  return makeRequest("PUT", url, params?.arg);
};

export const deleteRequest = async (url: string) => {
  try {
    console.log("Delete Request URL:", url);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    console.log("Delete Response Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Delete Error Response:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    try {
      const jsonResponse = await response.json();
      console.log("Delete Response:", jsonResponse);
      return jsonResponse;
    } catch (e) {
      return {
        statusCode: 200,
        status: "success",
        message: "Record deleted successfully",
      };
    }
  } catch (error: any) {
    console.error("Delete Request Error:", error);
    return {
      statusCode: 500,
      status: "error",
      message: error?.message || "An error occurred while deleting",
    };
  }
};

export const makeRequest = async (method: string, url: string, data?: any) => {
  try {
    console.log(`${method} Request URL:`, url);
    console.log(`${method} Request Data:`, data);

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`${method} Error Response:`, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const jsonResponse = await response.json();
      console.log(`${method} Response:`, jsonResponse);
      return jsonResponse;
    } else if (method === "DELETE") {
      return {
        statusCode: 200,
        status: "success",
        message: "Record deleted successfully",
      };
    }

    throw new Error("Invalid response format");
  } catch (error: any) {
    console.error(`${method} Request Error:`, error);
    throw error;
  }
};

export const fetcher = async (url: string): Promise<ApiResponse<any>> => {
  if (!url) {
    return {
      statusCode: "404",
      status: "error",
      data: [],
      message: "URL not provided",
    };
  }
  const response = await fetch(url);
  return response.json();
};
