function showSignup() {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("signupBox").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("signupBox").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("hidden");
}

// SIGN UP
async function signup() {
    const username = document.getElementById("su-username").value;
    const email = document.getElementById("su-email").value;
    const password = document.getElementById("su-password").value;

    if (!username || !email || !password) {
        alert("Fill all fields");
        return;
    }

    const res = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) showLogin();
}

// LOGIN
async function login() {
    const email = document.getElementById("li-email").value;
    const password = document.getElementById("li-password").value;

    if (!email || !password) {
        alert("Fill all fields");
        return;
    }

    const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    alert(data.message);
}