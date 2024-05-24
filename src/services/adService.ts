/* eslint-disable @typescript-eslint/no-unused-vars */


// Add new ad
const addAd =  async (newAd: object) => {
    console.log("Form submitted with ad data:", newAd);
    const res = await fetch("/api/ads", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newAd),
    });
    return
}

// Delete Ad

const deleteAd = async (id: string) => {
    console.log("Ad deleted", id );
    const res = await fetch(`/api/ads/${id}`, {
        method: "DELETE",
    });
}

// Fetch ad data by ID
const getAdData = async (id: string) => {
    const res = await fetch(`/api/ads/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch ad data");
    }
    return res.json();
  }
  
  // Edit ad by ID
  const editAd = async (id: string, updatedAd: object) => {
    const res = await fetch(`/api/ads/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAd),
    });
    if (!res.ok) {
      throw new Error("Failed to update ad");
    }
  }
  

export {addAd, deleteAd, getAdData, editAd};