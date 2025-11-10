const API_URL = import.meta.env.VITE_API_BASE_URL;
/* ====== FETCH ========  */
// Activities
export const fetchActivities = async () => {
  try {
    const response = await fetch(`${API_URL}/activities`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
};

export const fetchActivityById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/activity/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching activity ${id}:`, error);
    throw error;
  }
};

// Stays
export const fetchStays = async () => {
  try {
    const response = await fetch(`${API_URL}/stays`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching stays:", error);
    throw error;
  }
};

export const fetchStayById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/stay/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching stay ${id}:`, error);
    throw error;
  }
};

// Reviews
export const fetchReviews = async () => {
  try {
    const response = await fetch(`${API_URL}/reviews`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

// Fetch all contacts (hvis du har brug for det til backoffice)
export const fetchContacts = async (token) => {
  try {
    const response = await fetch(`${API_URL}/contacts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

/* ====== POST ========  */

// Auth
export const signIn = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (data.status === "error") {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

// Save MyList
export const saveMyList = async (email, activityIds, token) => {
  // Create FormData (backend expects this format)
  const formData = new FormData();
  formData.append("email", email);

  // Konverter array til comma-separated string som backend forventer
  const activityIdsString = Array.isArray(activityIds)
    ? activityIds.join(",")
    : activityIds;

  formData.append("activityIds", activityIdsString);

  const response = await fetch(`${API_URL}/mylist/save`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return await response.json();
};

// Create Contact
export const createContact = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
};

// Create Activity (requires auth)
export const createActivity = async (formData, token) => {
  try {
    const response = await fetch(`${API_URL}/activity`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating activity:", error);
    throw error;
  }
};

// Create Stay
export const createStay = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/stay`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating stay:", error);
    throw error;
  }
};

// Create Review
export const createReview = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/review`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

/* ====== PUT ========  */

// Update Activity (requires auth)
export const updateActivity = async (formData, token) => {
  try {
    const response = await fetch(`${API_URL}/activity`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating activity:", error);
    throw error;
  }
};

// Update Stay
export const updateStay = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/stay`, {
      method: "PUT",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating stay:", error);
    throw error;
  }
};

// Update Review
export const updateReview = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/review`, {
      method: "PUT",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

/* ====== DELETE ========  */

// Delete Activity (requires auth)
export const deleteActivity = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/activity/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting activity:", error);
    throw error;
  }
};

// Delete Stay (requires auth)
export const deleteStay = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/stay/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting stay:", error);
    throw error;
  }
};

// Delete Review (requires auth)
export const deleteReview = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/review/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};
