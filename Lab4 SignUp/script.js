window.addEventListener("DOMContentLoaded", () => {
    loadStates();
    document.querySelector("#zip").addEventListener("change", displayCity);
    document.querySelector("#state").addEventListener("change", displayCounties);
    document.querySelector("#username").addEventListener("change", checkUsername);
    document.querySelector("#signupForm").addEventListener("submit", validateForm);
});

// Load all US states from API
async function loadStates() {
    const stateSelect = document.querySelector("#state");
    const url = "https://csumb.space/api/allStatesAPI.php";

    try {
        const response = await fetch(url);
        const states = await response.json();

        if (!Array.isArray(states) || states.length === 0) {
            throw new Error("Invalid state data");
        }

        states.forEach(state => {
            if (state.state && state.usps) {
                const option = document.createElement("option");
                option.value = state.usps.toLowerCase();
                option.textContent = state.state;
                stateSelect.appendChild(option);
            }
        });
    } catch (error) {
        console.error("Error loading states:", error);
        stateSelect.innerHTML = '<option value="">Unable to load states</option>';
    }
}

// Display city, latitude, longitude from zip
async function displayCity() {
    const zipCode = document.querySelector("#zip").value;
    const url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.city || !data.latitude || !data.longitude) {
            document.querySelector("#zipError").textContent = "Zip code not found.";
            document.querySelector("#city").textContent = "";
            document.querySelector("#latitude").textContent = "";
            document.querySelector("#longitude").textContent = "";
        } else {
            document.querySelector("#zipError").textContent = "";
            document.querySelector("#city").textContent = data.city;
            document.querySelector("#latitude").textContent = data.latitude;
            document.querySelector("#longitude").textContent = data.longitude;
        }
    } catch (error) {
        console.error("Error fetching city info:", error);
        document.querySelector("#zipError").textContent = "Zip code not found.";
    }
}

// Display counties based on selected state
async function displayCounties() {
    const state = document.querySelector("#state").value;
    const countySelect = document.querySelector("#county");

    countySelect.innerHTML = '<option value="">Select a county</option>';
    if (!state) return;

    const url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        data.forEach(county => {
            const option = document.createElement("option");
            option.value = county.toLowerCase().replace(/\s+/g, "_");
            option.textContent = county;
            countySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching counties:", error);
        countySelect.innerHTML = '<option value="">Unable to load counties</option>';
    }
}

// Check username availability
async function checkUsername() {
    const username = document.querySelector("#username").value.trim();
    const statusSpan = document.querySelector("#usernameStatus");

    if (!username) {
        statusSpan.textContent = "";
        return;
    }

    const url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.available === "true") {
            statusSpan.textContent = "Username is available";
            statusSpan.style.color = "green";
        } else {
            statusSpan.textContent = "Username is unavailable";
            statusSpan.style.color = "red";
        }
    } catch (error) {
        console.error("Error checking username:", error);
        statusSpan.textContent = "Error checking username";
        statusSpan.style.color = "red";
    }
}

// Get suggested password
async function getSuggestedPassword() {
    const length = 8;
    const url = `https://csumb.space/api/suggestedPassword.php?length=${length}`;
    const pwdSpan = document.querySelector("#suggestedPwd");

    try {
        const response = await fetch(url);
        const data = await response.json();
        pwdSpan.textContent = `Suggested: ${data.password}`;
    } catch (error) {
        console.error("Error fetching password:", error);
        pwdSpan.textContent = "Unable to generate password.";
        pwdSpan.style.color = "red";
    }
}

// Validate form before submission
function validateForm(e) {
    let isValid = true;

    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;

    const usernameStatus = document.querySelector("#usernameStatus");
    const passwordError = document.querySelector("#passwordError");

    // Clear previous errors
    usernameStatus.textContent = "";
    passwordError.textContent = "";

    // Username validation
    if (username.length < 3) {
        usernameStatus.textContent = "Username must be at least 3 characters.";
        usernameStatus.style.color = "red";
        isValid = false;
    }

    // Password validation
    if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters.";
        isValid = false;
    } else if (password !== confirmPassword) {
        passwordError.textContent = "Passwords do not match.";
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
    }
}
