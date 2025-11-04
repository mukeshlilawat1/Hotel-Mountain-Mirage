import axios from "axios";

export default class ApiService {
    static BASE_URL = "http://localhost:8080";

    // ✅ Helper: Safely get headers (with token validation)
    static getHeader(requireAuth = true) {
        const token = localStorage.getItem("token");

        if (requireAuth && (!token || token === "null" || token === "undefined")) {
            console.warn("⚠️ Missing or invalid token. User may not be logged in.");
            return { "Content-Type": "application/json" };
        }

        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
    }

    // 🧠 Interceptor for handling 403 globally
    static initInterceptor() {
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 403) {
                    console.warn("🚫 Forbidden (403): Token expired or invalid. Logging out...");
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    // Optionally redirect user to login page if using React Router
                    // window.location.href = "/login";
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

            if (data?.token) {
                localStorage.setItem("token", data.token);
            }
            if (data?.role) {
                localStorage.setItem("role", data.role);
            }

            return data;
        } catch (error) {
            console.error("❌ Login failed:", error);
            throw error;
        }
    }

    /** 👤 USERS SECTION */

    static async getAllUsers() {
        const response = await axios.get(`${this.BASE_URL}/users/all`, {
            headers: this.getHeader(),
        });
        return response.data;
    }

    static async getUserProfile() {
        const headers = this.getHeader();
        if (!headers.Authorization) {
            throw new Error("User not logged in or token missing.");
        }

        const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
            headers,
        });
        return response.data;
    }

    static async getUser(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`, {
            headers: this.getHeader(),
        });
        return response.data;
    }

    static async getUserBookings(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-user-bookings/${userId}`, {
            headers: this.getHeader(),
        });
        return response.data;
    }

    static async deleteUser(userId) {
        const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
            headers: this.getHeader(),
        });
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
        const result = await axios.get(`${this.BASE_URL}/rooms/all-available-rooms`);
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

    static async deleteRoom(roomId) {
        const result = await axios.delete(`${this.BASE_URL}/rooms/delete/${roomId}`, {
            headers: this.getHeader(),
        });
        return result.data;
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
        if (!token) {
            throw new Error("User not logged in. Please login first.");
        }

        const response = await axios.post(
            `${this.BASE_URL}/bookings/book-room/${roomId}/${userId}`,
            booking,
            {
                headers: this.getHeader(),
            }
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
    }

    static isAuthenticated() {
        const token = localStorage.getItem("token");
        return !!token && token !== "null" && token !== "undefined";
    }

    static isAdmin() {
        const role = localStorage.getItem("role");
        return role === "ADMIN";
    }

    static isUser() {
        const role = localStorage.getItem("role");
        return role === "USER";
    }
}
