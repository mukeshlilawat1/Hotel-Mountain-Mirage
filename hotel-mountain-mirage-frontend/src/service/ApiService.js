import axios from "axios";
const API = import.meta.env.VITE_API_BASE_URL;

export default class ApiService {
    static BASE_URL = import.meta.env.VITE_API_BASE_URL;


    // ============================
    // 🔐 HEADER HANDLING (FIXED)
    // ============================
    static getHeader(requireAuth = true) {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        // Debug info (UNCHANGED)
        console.log("🧠 Attaching Headers:", {
            Authorization: token ? `Bearer ${token.substring(0, 20)}...` : "❌ No Token",
            Role: role || "❌ No Role",
        });

        if (requireAuth && (!token || token === "null" || token === "undefined")) {
            console.warn("⚠️ Missing or invalid token. User may not be logged in.");
        }

        // ✅ FIX:
        // ❌ Empty Authorization header removed
        // ✅ Header only attached when token exists
        return {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            "Content-Type": "application/json",
        };
    }

    // 🧠 Global interceptor to handle 401 / 403 token issues globally
    static initInterceptor() {
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    const { status } = error.response;
                    if (status === 401 || status === 403) {
                        console.warn(
                            `🚫 Token Invalid (${status}): Logging out user automatically...`
                        );
                        localStorage.removeItem("token");
                        localStorage.removeItem("role");
                        window.location.href = "/login";
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    /** 🔐 AUTH SECTION */

    static async registerUser(register) {
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/register`, register);
            return response.data;
        } catch (error) {
            console.error("❌ Error registering user:", error);
            throw error;
        }
    }

    static async loginUser(loginDetails) {
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
            const data = response.data;

            // ✅ Store token & role safely
            if (data?.token) localStorage.setItem("token", data.token);
            if (data?.role) localStorage.setItem("role", data.role);

            console.log("✅ Login Success:", data);
            return data;
        } catch (error) {
            console.error("❌ Login failed:", error);
            throw error;
        }
    }

    /** 👤 USERS SECTION */

    // ============================
    // 👤 USERS SECTION
    // ============================
    static async getAllUsers() {
        const response = await axios.get(
            `${this.BASE_URL}/users/all`,
            { headers: this.getHeader() }
        );
        return response.data;
    }

    static async getUserProfile() {
        const headers = this.getHeader();
        if (!headers.Authorization) {
            throw new Error("User not logged in or token missing.");
        }

        const response = await axios.get(
            `${this.BASE_URL}/users/get-logged-in-profile-info`,
            { headers }
        );
        return response.data;
    }

    static async getUser(userId) {
        const response = await axios.get(
            `${this.BASE_URL}/users/get-by-id/${userId}`,
            { headers: this.getHeader() }
        );
        return response.data;
    }

    static async getUserBookings(userId) {
        const response = await axios.get(
            `${this.BASE_URL}/users/get-user-bookings/${userId}`,
            { headers: this.getHeader() }
        );
        return response.data;
    }

    static async deleteUser(userId) {
        const response = await axios.delete(
            `${this.BASE_URL}/users/delete/${userId}`,
            { headers: this.getHeader() }
        );
        return response.data;
    }
    /** 🏨 ROOMS SECTION */

    static async addRoom(formData) {
        const result = await axios.post(`${this.BASE_URL}/rooms/add`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data",
            },
        });
        return result.data;
    }

    static async getAllAvailableRooms() {
        const result = await axios.get(`${this.BASE_URL}/rooms/all-available-room`);
        return result.data;
    }

    static async getAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType) {
        const result = await axios.get(
            `${this.BASE_URL}/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
        );
        return result.data;
    }

    static async getRoomTypes() {
        const response = await axios.get(`${this.BASE_URL}/rooms/types`);
        return response.data;
    }

    static async getAllRooms() {
        const result = await axios.get(`${this.BASE_URL}/rooms/all`);
        return result.data;
    }

    static async getRoomById(roomId) {
        const result = await axios.get(`${this.BASE_URL}/rooms/room-by-id/${roomId}`);
        return result.data;
    }

    /** ✅ Fixed DELETE Room (handles 403 + missing headers safely) */
    static async deleteRoom(roomId) {
        try {
            console.log(`🧨 Attempting to delete room ID: ${roomId}`);
            const headers = this.getHeader();

            const result = await axios.delete(`${this.BASE_URL}/rooms/delete/${roomId}`, {
                headers,
            });
            console.log("✅ Room deleted successfully:", result.data);
            return result.data;
        } catch (error) {
            if (error.response) {
                console.error(`❌ Delete Room failed [${error.response.status}]:`, error.response.data);
            } else {
                console.error("❌ Network or server error while deleting room:", error);
            }
            throw error;
        }
    }

    static async updateRoom(roomId, formData) {
        const result = await axios.put(`${this.BASE_URL}/rooms/update/${roomId}`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data",
            },
        });
        return result.data;
    }

    /** 🧾 BOOKINGS SECTION */

    static async bookRoom(roomId, userId, booking) {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not logged in. Please login first.");

        const response = await axios.post(
            `${this.BASE_URL}/bookings/book-room/${roomId}/${userId}`,
            booking,
            { headers: this.getHeader() }
        );

        return response.data;
    }

    static async getAllBookings() {
        const result = await axios.get(`${this.BASE_URL}/bookings/all`, {
            headers: this.getHeader(),
        });
        return result.data;
    }

    static async getBookingByConfirmationCode(bookingCode) {
        const result = await axios.get(
            `${this.BASE_URL}/bookings/get-by-confirmation-code/${bookingCode}`
        );
        return result.data;
    }

    static async cancelBooking(bookingId) {
        const result = await axios.delete(`${this.BASE_URL}/bookings/cancel/${bookingId}`, {
            headers: this.getHeader(),
        });
        return result.data;
    }

    /** 🚪 AUTH HELPERS */

    static logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login";
        console.log("👋 Logged out successfully.");
    }

    static isAuthenticated() {
        const token = localStorage.getItem("token");
        return !!token && token !== "null" && token !== "undefined";
    }

    // ✅ Fixed: supports both ADMIN and ROLE_ADMIN
    static isAdmin() {
        const role = localStorage.getItem("role");
        return role === "ADMIN" || role === "ROLE_ADMIN";
    }

    static isUser() {
        const role = localStorage.getItem("role");
        return role === "USER" || role === "ROLE_USER";
    }
}
