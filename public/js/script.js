(async () => {
  const popupPositions = {
    top_right: 1,
    top_left: 1,
    bottom_right: 1,
    bottom_left: 1,
  };

  // Change it in localhost
  const host = "https://meeterpop.vercel.app/";

  const firePopups = (popups, { startingTime, intervalTime, endTime }) => {
    setTimeout(() => {
      let index = 0; // Index to track which popup to show next
      const popupElements = []; // Array to store references to the popup elements

      const interval = setInterval(() => {
        if (index >= popups.length) {
          clearInterval(interval); // Stop interval when all popups are shown
          return;
        }

        const currentPopup = popups[index];
        if (currentPopup.isDisabled) {
          index++; // Move to the next popup
          return; // Skip disabled popups
        }

        let { place } = currentPopup;

        if (window.innerWidth < 900) {
          place = "top_right";
        }

        const isOnBottom = place.startsWith("bottom");

        document
          .querySelectorAll(`.popup_container.${place}`)
          .forEach((popup) => {
            // Get the current translateY value and parse it to a number
            const currentTranslateY = parseFloat(
              popup.style.transform.match(/-?\d+(\.\d+)?/)[0]
            );
            // Calculate the new translateY value based on the current position
            const newTranslateY = isOnBottom
              ? currentTranslateY - 8
              : currentTranslateY + 8;
            popup.style.transform = `translateY(${newTranslateY}rem)`;
          });

        popupPositions[place] += 1;
        const popupElement = document.createElement("div");
        popupElement.className = `popup_container ${place}`;
        popupElement.style = `
                padding-top: 0.5rem; 
                padding-bottom: 0.5rem; 
                padding-left: 1rem; 
                padding-right: 1rem; 
                border-width: 2px; 
                width: 22rem; 
                background-color: ${getBackgroundColor(currentPopup.status)}; 
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); 
                position: fixed; 
                border-radius: 0.375rem; 
                z-index: 999999;
                transform: translateY(0rem);
                ${
                  place === "top_right"
                    ? "top: 1rem; right: 1rem;"
                    : place === "top_left"
                      ? "top: 1rem; left: 1rem;"
                      : place === "bottom_right"
                        ? "bottom: 1rem; right: 1rem;"
                        : "bottom: 1rem; left: 1rem;"
                }
                transition: transform 0.5s, opacity 0.5s;
              `;

        popupElement.innerHTML = `
                <div style="
                  display: flex; 
                  align-items: center; 
                  gap: 0.5rem;
                ">
                  <img
                    src="${host}/assets/${currentPopup.icon}"
                    width="40"
                    height="40"
                    alt="Popup Icon"
                  />
                  <span>${currentPopup.sender}</span>
                  <span style="
                    font-size: 0.875rem; 
                    margin-left: auto;
                  ">${currentPopup.time}</span>
                </div>
                <p style="
                  font-size: 0.875rem; 
                  font-weight: 600;
                ">${currentPopup.title}</p>
                <p style="
                  font-size: 0.875rem;
                ">${currentPopup.message}</p>
              `;

        document.body.insertBefore(popupElement, document.body.firstChild);
        popupElements.push(popupElement);

        setTimeout(() => {
          popupElements.shift()?.remove(); // Remove the oldest popup
        }, endTime);

        index++; // Move to the next popup
      }, intervalTime); // Interval to show new popup
    }, startingTime); // Starting time
  };

  const getBackgroundColor = (status) => {
    switch (status) {
      case "worrying":
        return "#ffedd5";
      case "dangerous":
        return "#fee2e2";
      default:
        return "rgba(229, 231, 235, 0.95)";
    }
  };

  let domain = location.host;
  if (
    ["http://localhost:3000", "https://meeterpop.vercel.app/"].includes(
      location.origin
    )
  ) {
    const params = new URL(location.href).searchParams;
    domain = params.get("value");
  }
  let popupsUrl = `${host}/api/popups?type=domain&value=${domain}`;
  const popupsResponse = await fetch(popupsUrl);
  const popupsData = await popupsResponse.json();

  let domainUrl = `${host}/api/domains/${domain}`;
  const domainsResponse = await fetch(domainUrl);
  const domainsData = await domainsResponse.json();

  let popups = [];
  let options = {
    startingTime: 2000,
    intervalTime: 1000,
    endTime: 6000,
  };

  if (popupsData.popups) {
    popups = popupsData.popups;
  }
  if (domainsData.domains.length > 0) {
    const { startingTime, intervalTime, endTime } = domainsData.domains[0];
    options = {
      startingTime,
      intervalTime,
      endTime,
    };
  }

  firePopups(popupsData.popups, options);
})();
