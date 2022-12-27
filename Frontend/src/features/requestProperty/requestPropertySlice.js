import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient/apiClient";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialState = {
  loading: true,
  meta: {},
  requestProperties: null,
  requestProperty: null,
};

export const fetchRequestProperties = createAsyncThunk(
  "fetchRequestProperties",
  async () => {
    const response = await apiClient.get(
      "/api/v1/request_management/request_properties",
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const showRequestProperty = createAsyncThunk(
  "showRequestProperty",
  async (id) => {
    const response = await apiClient.get(
      `/api/v1/request_management/request_properties/${id}`,
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const newRequestProperty = createAsyncThunk(
  "newRequestProperty",
  async (data) => {
    const response = await apiClient.post(
      "api/v1/request_management/request_properties",
      { group_property: data },
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response.data;
  }
);

export const responseProperty = createAsyncThunk(
  "responseProperty",
  async (data) => {
    const response = await apiClient.post(
      `/api/v1/request_management/request_properties/${data.id}/response_request`,
      { response_type: data.type },
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    console.log(response);
    return response.data;
  }
);

export const editRequestProperty = createAsyncThunk(
  "editRequestProperty",
  async (data) => {
    const response = await apiClient.put(
      `/api/v1/request_management/request_properties/${data.id}`,
      { group_property: { name: data.name, description: data.description } },
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );

    return response.data;
  }
);

export const destroyRequestProperty = createAsyncThunk(
  "destroyRequestProperty",
  async (id) => {
    const response = await apiClient.delete(
      `/api/v1/request_management/request_properties/${id}`,
      {
        headers: {
          Authorization: Cookies.get("authorization"),
        },
      }
    );
    return response.data;
  }
);

export const requestPropertySlice = createSlice({
  name: "RequestProperties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ================== All propertiesGroup =================
    builder
      .addCase(fetchRequestProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRequestProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.requestProperties = action.payload.data;
      })
      .addCase(fetchRequestProperties.rejected, (state, action) => {});
    // ================== show propertiesGroup =================
    builder
      .addCase(showRequestProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(showRequestProperty.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data);
        state.requestProperty = action.payload.data;
      })
      .addCase(showRequestProperty.rejected, (state) => {});
    // ================== New propertiesGroup =================
    builder
      .addCase(newRequestProperty.pending, (state) => {})
      .addCase(newRequestProperty.fulfilled, (state, action) => {
        state.requestProperty.push(action.payload.data);
        toast.success("Create propertiesGroup Successfully!");
      })
      .addCase(newRequestProperty.rejected, (state) => {
        toast.error("Create propertiesGroup failed!");
      });
    // ================== edit propertiesGroup =================
    builder
      .addCase(editRequestProperty.pending, (state) => {})
      .addCase(editRequestProperty.fulfilled, (state, action) => {
        toast.success("Update propertiesGroup Successfully!");
      })
      .addCase(editRequestProperty.rejected, (state) => {});
    // ================== Destroy propertiesGroup =================
    builder
      .addCase(destroyRequestProperty.pending, (state) => {})
      .addCase(destroyRequestProperty.fulfilled, (state, action) => {
        toast.success("Destroy Successfully!");
      })
      .addCase(destroyRequestProperty.rejected, (state) => {
        toast.error("Destroy Failed!");
      });
  },
});

export const requestPropertiesSelector = (state) =>
  state.requestProperty.requestProperties;
export const requestPropertySelector = (state) =>
  state.requestProperty.requestProperty;

export default requestPropertySlice.reducer;
