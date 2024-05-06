export function createNavigationBar() {
    let navigationCard = document.createElement("div");
    navigationCard.className = "navigation-card";

    let post = createTab("fa-solid fa-square-plus", "New Post");
    post.addEventListener("click", () => { window.location.href = "../createRuns/createRuns.html"; })

    let feedTab = createTab("fas fa-home", "Home");
    feedTab.addEventListener("click", () => { window.location.href = "../RunningFeed/cardPage.html"; })

    let statsTab = createTab("fa-solid fa-chart-pie", "Statistics");
    statsTab.addEventListener("click", () => { window.location.href = "../statistics/statistics.html"; })

    let logout = createTab("fa-solid fa-right-from-bracket", "Logout");
    logout.addEventListener("click", () => { 
        fetch('/logout', {
            method: 'GET',
            credentials: 'same-origin' //Necessary for cookies/sessions
        })
        .then(response => {
            if (response.ok) {
                window.location.href = "../index.html";
            } else {
                console.error('Logout request failed');
            }
        })
        .catch(error => {
            console.error('Error logging out:', error);
        });
    })

    navigationCard.appendChild(post);
    navigationCard.appendChild(feedTab);
    navigationCard.appendChild(statsTab);
    navigationCard.appendChild(logout);

    return navigationCard;
}

export function createTab(iconClass, customTooltip) {
    let tab = document.createElement("a");
    tab.href = "#";
    tab.className = "tab";
    tab.title = customTooltip; // tooltip

    let icon = document.createElement("i");
    icon.className = iconClass;

    tab.appendChild(icon);

    return tab;
}

