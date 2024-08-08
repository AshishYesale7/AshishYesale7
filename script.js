"use strict";
const currentDate = new Date();
const formattedDate = currentDate.toDateString().split(" ").slice(0, 3).join(" ") +
    " " +
    currentDate.toTimeString().split(" ")[0].split(":").slice(0, 3).join(":");
document.getElementById("dateTime").innerHTML = formattedDate;
const typingElement = document.querySelector(".typing");
let index = 0;
let currentText = "";
let isDeleting = false;
let currentMenu = "main";
const menus = {
    main: `Select a menu:<br><span onclick="handleMenuClick('1')">[1] Who is Ashish Yesale?</span><br><span onclick="handleMenuClick('2')">[2] Contact me</span><br><span onclick="handleMenuClick('3')">[3] My works</span>`,
    1: `Who is Ashish Yesale?<br><br>Hey there! I'm Ashish Yesale , a passionate B.Tech CSE student who's all about coding, creativity, and coffee. ðŸš€ Currently navigating the exciting world of computer science, I love to delve into the latest technologies, from AI to app development. When I'm not buried in lines of code, you'll find me exploring new software, tinkering with gadgets, and seeking out the best tech meetups. An avid problem solver, I believe that every bug is just an opportunity for me to improve my skills.<br> Check Out More About <a href="https://ashishyesael.dev" > Me.</a><br><br><span onclick="handleMenuClick('B')">[B] Back</span>`,
    2: `Contact:<br>- Email: <a href="mailto:ashishyesale007gmail.com">ashishyesael007@gmail.com</a><br>- Telegram: <a href="https://t.me/ashishyesale">@ashishyesael</a><br><br><span onclick="handleMenuClick('B')">[B] Back</span>`,
    3: `Some of my Projects:<br><br>
- <strong>My Portfolio</strong>: Introducing Myself and Journey Of MY life <a href=" htts://ashihsyesale.dev" target="_blank">[Portfolio]</a><br>
- <strong>TV Shows & Movie Player</strong>: A user-friendly & Ads free Hollywood & Bollywood movie player <a href=" https://play.google.com/store/apps/details?id=com.in.hstreamplayer&hl=en" target="_blank">[WEB]</a><br>
- <strong>Movie Streaming Web</strong>: Check out the Lastest Movies Streaming Website. <a href=" https://play.google.com/store/apps/details?id=com.in.streamhyper&hl=en" target="_blank">[WEB]</a><br><br>
<span onclick="handleMenuClick('B')">[B] Back</span>`
};
function handleMenuClick(menuKey) {
    if (menuKey in menus && currentMenu !== menuKey) {
        isDeleting = true;
        typeDeleteAnimation(() => {
            currentMenu = menuKey;
            currentText = menus[menuKey];
            index = 0;
            typeDeleteAnimation();
        });
    }
    else if ((menuKey === "B" || menuKey === "b") && currentMenu !== "main") {
        isDeleting = true;
        typeDeleteAnimation(() => {
            currentMenu = "main";
            currentText = menus.main;
            index = 0;
            typeDeleteAnimation();
        });
    }
}
function typeDeleteAnimation(callback) {
    let speed = 7; // default typing speed
    let deleteSpeed = 3; // default deletion speed
    if (currentMenu === "1" || currentMenu === "3") {
        speed = 1; // Makes the typing faster for "Who is Ashish Yesale".
        deleteSpeed = 1; // Makes the deletion faster for "Who is Ashish Yesale". Adjust as needed.
    }
    if (isDeleting && typingElement.innerHTML !== "") {
        if (currentText.charAt(index - 1) === ">") {
            const openTagIndex = currentText.lastIndexOf("<", index);
            const tagName = currentText.substring(openTagIndex + 1, currentText.indexOf(" ", openTagIndex));
            const startTagIndex = currentText.lastIndexOf(`</${tagName}>`, index);
            index = startTagIndex;
        }
        else {
            index--;
        }
        currentText = currentText.slice(0, index);
        typingElement.innerHTML = currentText;
        setTimeout(() => typeDeleteAnimation(callback), deleteSpeed);
    }
    else if (isDeleting) {
        isDeleting = false;
        if (callback)
            callback();
    }
    else if (!isDeleting && index < currentText.length) {
        if (currentText.charAt(index) === "<") {
            if (currentText.substr(index, 4) === "<br>") {
                const br = document.createElement("br");
                typingElement.appendChild(br);
                index += 4;
            }
            else {
                const closingTagIndex = currentText.indexOf(">", index);
                const tagName = currentText
                    .substring(index + 1, closingTagIndex)
                    .split(" ")[0];
                const endTagIndex = currentText.indexOf(`</${tagName}>`, index) +
                    `</${tagName}>`.length;
                const outerHTML = currentText.substring(index, endTagIndex);
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = outerHTML;
                const childElement = tempDiv.firstChild;
                if (tagName === "a") {
                    childElement.target = "_blank";
                    speed = 1; // Faster typing for <a> tag
                }
                else if (tagName === "span") {
                    childElement.onclick = function () {
                        const menuKey = childElement
                            .getAttribute("onclick")
                            .replace("handleMenuClick('", "")
                            .replace("')", "");
                        handleMenuClick(menuKey);
                    };
                    speed = 1; // Faster typing for <span> tag
                }
                typingElement.appendChild(childElement);
                index = endTagIndex;
            }
        }
        else {
            typingElement.innerHTML += currentText.charAt(index);
            index++;
        }
        setTimeout(typeDeleteAnimation, speed);
    }
}
function handleUserInput(event) {
    const key = event.key;
    if (key in menus && currentMenu !== key) {
        isDeleting = true;
        typeDeleteAnimation(() => {
            currentMenu = key;
            currentText = menus[key];
            index = 0;
            typeDeleteAnimation();
        });
    }
    else if ((key === "B" || key === "b") && currentMenu !== "main") {
        isDeleting = true;
        typeDeleteAnimation(() => {
            currentMenu = "main";
            currentText = menus.main;
            index = 0;
            typeDeleteAnimation();
        });
    }
}
document.addEventListener("keydown", handleUserInput);
// Initialize the typing animation with the main menu on page load
currentText = menus.main;
typeDeleteAnimation();